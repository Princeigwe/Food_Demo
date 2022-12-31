# Building the Docker image from the base image Node:18-apline
FROM node:18-alpine

# creating the working directory of the Docker image
WORKDIR /usr/src/app 

# copy package.json and package-lock.json to the image working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# COPY the Nest application into the image
COPY . .

ARG RDS_HOSTNAME
ARG RDS_PORT
ARG RDS_DB_NAME
ARG RDS_USERNAME
ARG RDS_PASSWORD
ARG NODE_ENV=production

ENV RDS_HOSTNAME=$RDS_HOSTNAME 
ENV RDS_PORT=$RDS_PORT 
ENV RDS_DB_NAME=$RDS_DB_NAME 
ENV RDS_USERNAME=$RDS_USERNAME 
ENV RDS_PASSWORD=$RDS_PASSWORD
ENV NODE_ENV=$NODE_ENV

EXPOSE 3000

#  build the application
RUN npm run build

CMD ["node", "dist/main"]
