# Build stage
FROM node:14-alpine AS build
WORKDIR /home/node/
COPY package*.json ./
RUN npm install --prefer-offline --no-audit
COPY . .
RUN npm run build:prod

# Run stage
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /home/node/dist/tourguide /usr/share/nginx/html