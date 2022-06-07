FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY *.json ./
COPY .env.dist .env

RUN npm install
COPY src src

CMD npm start