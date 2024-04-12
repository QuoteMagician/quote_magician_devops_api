FROM node:21-alpine as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run dev:build


FROM node:21-alpine as deploy

WORKDIR /app

COPY --from=build /app .

ARG MONGODB_ATLAS_USERNAME=-1
ARG MONGODB_ATLAS_PASSWORD=-1

CMD ["npm", "run", "dev:serve"]

EXPOSE 4000