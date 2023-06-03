FROM node:20-alpine as builder

WORKDIR /var/www
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:latest
COPY --from=builder /var/www/dist /var/www
