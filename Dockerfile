FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get -y upgrade

COPY tw-app ./

RUN npm install && npm run build

ENTRYPOINT ["node", "build"]
