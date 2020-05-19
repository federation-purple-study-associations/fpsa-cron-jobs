FROM node:lts
WORKDIR /cron

COPY package.json .
COPY ./src ./src

RUN npm i --production
CMD npm start