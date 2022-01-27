FROM node:17

WORKDIR /app

RUN npm install redis

COPY ./server/index.js ./
COPY ./client/index.html ./

CMD ["node","index.js"]
