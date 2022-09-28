# Sets the base image of the application to the node’s official image.
FROM --platform=linux/amd64 node:lts-alpine as build-stage

# Sets the Working Directory as "/server"
WORKDIR /app
# Copies the package.json file into "/server" and runs npm i
COPY package.json .
RUN npm i
# Copies the entire source code into "/server"
COPY . .

# Specifies the port the node app will be running on
EXPOSE 5000

# Runs "node server.js" after the above step is completed
CMD ["npm", "run", "dev"]