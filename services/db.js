// const { Sequelize } = require("sequelize");
// // const sequelize = new Sequelize(
// //   "db_node_sequelize_test",
// //   "postgres",
// //   "postgres",
// //   {
// //     host: "localhost",
// //     dialect: "postgres",
// //   }
// // );

// const sequelize = new Sequelize(
//   // "postgres://postgres:postgres@localhost:5432/db_node_sequelize_test"
//   "postgres://postgres:postgres@db-seq:5432/db_node_sequelize_test2"
// );

// // const Pool = require("pg").Pool;
// // const pool = new Pool({
// //   user: "postgres",
// //   //
// //   host: "127.0.0.1",
// //   database: "db_node_sequelize_test2",
// //   password: "postgres",
// //   port: 5432,
// // });

// const connectToDB = async () => {
//   try {
//     // await pool.connect();
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error(
//       "db_node_sequelize_test2 Unable to connect to the database:",
//       error
//     );
//   }
// };

// // connectToDB();

// module.exports = {
//   // sequelize,
//   connectToDB,
// };
