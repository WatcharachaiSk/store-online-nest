#build stage
FROM node:16.16.0 as build-stage
# ENV NODE_ENV=staging
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
# RUN npm run build
EXPOSE 5173
# CMD npm run dev
CMD [ "npm","run","dev" ]