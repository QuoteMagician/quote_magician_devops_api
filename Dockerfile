FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ARG MONGODB_ATLAS_USERNAME=-1
ARG MONGODB_ATLAS_PASSWORD=-1

CMD ["npm", "run", "dev:start"]

EXPOSE 4000