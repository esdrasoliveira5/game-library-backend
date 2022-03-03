FROM node:14.8.0-alpine

WORKDIR /game-library

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]