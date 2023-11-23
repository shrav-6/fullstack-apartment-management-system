FROM node:latest

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 600000
COPY . .
EXPOSE 3000
ENTRYPOINT ["yarn", "dev"]
