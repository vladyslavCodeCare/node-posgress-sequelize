const WebSocket = require("ws");
const db = require("../models");
const { Op } = require("sequelize");
const wsServer = new WebSocket.Server({ port: 9000 });

wsServer.on("connection", onConnect);

const clients = new Map(); // {key: userId, value: wsClient}
const subscribersToClients = new Map(); // {key: userId, value: []<interested in updates online users>}

const sender = (data, wsClient) => {
  wsClient.send(JSON.stringify(data));
};

const dataChecker = (dataToCheck, requiredValues, event, wsClient) => {
  const absenceData = [];

  requiredValues.forEach((key) => {
    if (!(key in dataToCheck)) {
      absenceData.push(key);
    }
  });

  if (absenceData.length) {
    const stringOnAbsence = `Data required: ${absenceData.join()}`;
    sender(
      { event, status: "error", error: { general: stringOnAbsence } },
      wsClient
    );
    return false;
  }
  return true;
};

const createMessage = async ({ data, event }, wsClient) => {
  if (!dataChecker(data, ["userId", "partnerId", "message"], event, wsClient)) {
    return;
  }
  const { userId, message, partnerId } = data;
  const t = await db.sequelize.transaction();

  try {
    const newMessage = await db.message.create(
      { userId, message },
      { transaction: t }
    );

    sender({ event, status: "ok", data: newMessage }, wsClient);

    if (clients.has(partnerId)) {
      sender({ event, status: "ok", data: newMessage }, clients.get(partnerId));
    }
    await t.commit();
  } catch (error) {
    await t.rollback();
    sender({ event, status: "error", error: { general: error } }, wsClient);
  }
};

const getMessages = async ({ data, event }, wsClient) => {
  const { userId, userIdPartner } = data;
  if (!dataChecker(data, ["userId", "userIdPartner"], event, wsClient)) {
    return;
  }
  try {
    const messagesList = await db.message.findAll({
      where: {
        [Op.or]: [{ userId: userId }, { userId: userIdPartner }],
      },
    });
    sender({ event, status: "ok", data: messagesList }, wsClient);
  } catch (error) {
    sender(
      { event, status: "error", error: { general: error }, wsClient },
      wsClient
    );
  }
};

function onConnect(wsClient) {
  console.log("new user");
  sender({ event: "connection", status: "ok" }, wsClient);

  wsClient.on("message", async function (message) {
    const parsedMessage = JSON.parse(message);

    const { event, data } = parsedMessage;

    if (!event || !data) {
      sender(
        {
          event: "message",
          status: "error",
          error: { general: "Event and data are required" },
        },
        wsClient
      );
    }
    console.log(`parsedMessage:`, parsedMessage);

    switch (parsedMessage.event) {
      case "create-message":
        createMessage({ ...parsedMessage }, wsClient);

        break;
      case "get-messages":
        getMessages({ ...parsedMessage }, wsClient);

        break;
      case "subscribe":
        if (!dataChecker(data, ["userId"], event, wsClient)) {
          return;
        }

        clients.set(data.userId, wsClient);

        const interestedFriends = await db.friends.findAll({
          where: { userIdOne: data.userId },
        });
        const interested = interestedFriends.map((item) => item.userIdTwo);
        const interestedSubscribed = [];

        for (const [userId, client] of clients.entries()) {
          if (interested.includes(userId)) {
            interestedSubscribed.push(userId);
            sender(
              {
                event: "online-status",
                status: "ok",
                data: { userId: data.userId, onlineStatus: true },
              },
              clients.get(userId)
            );
          }
        }
        subscribersToClients.set(data.userId, interestedSubscribed);

        console.log(`User ${data.userId} connected`, interested);

        break;

      default:
        break;
    }
  });

  wsClient.on("close", function (data) {
    console.log("closed");
    for (const [userId, client] of clients.entries()) {
      if (client === wsClient) {
        const listToUpdatedStatuseOnline = subscribersToClients.get(userId);
        listToUpdatedStatuseOnline.forEach((userSubscribedTo) => {
          sender(
            {
              event: "online-status",
              status: "ok",
              data: { userId: userId, onlineStatus: false },
            },
            clients.get(userSubscribedTo)
          );
        });
        clients.delete(userId);
        subscribersToClients.delete(userId);
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
}
module.exports = { wsServer, clients };
