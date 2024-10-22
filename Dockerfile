FROM node:20-alpine3.17
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
EXPOSE 9000
CMD  ["npm", "run", "dev"]