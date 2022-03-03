FROM postgres

WORKDIR /game-library

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]