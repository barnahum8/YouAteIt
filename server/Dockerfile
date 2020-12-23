# Use the official image as a parent image.
FROM node:current-slim

# Set the working directory.
WORKDIR /usr/src/server
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 4000

# Run the specified command within the container.
CMD ["npm", "start"]

##