FROM node:lts-alpine

RUN mkdir /app
RUN mkdir /tmp/files
WORKDIR /app
COPY *.json ./
COPY .env.dist .env
COPY src src
COPY crontab crontab

RUN npm install

CMD npm start