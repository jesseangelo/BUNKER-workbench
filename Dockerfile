FROM node:latest as node
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prodFROM nginx:alpine
COPY --from=node /app/dist/angular-docker usr/share/nginx/html