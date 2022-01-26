FROM node:16

WORKDIR /app

COPY ./server/index.js ./
COPY ./client/index.html ./

CMD ["node","index.js"]
