# Use the official image as a parent image.
FROM node:current-slim

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 3000

# start app
CMD ["npm", "start"]