FROM node:17

WORKDIR /app

COPY ./server/index.js ./
COPY ./client/index.html ./

CMD ["node","index.js"]
