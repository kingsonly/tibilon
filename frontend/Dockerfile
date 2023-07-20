#Creates a layer from node:18 image.
FROM node:19.3.0

#Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD commands
WORKDIR /usr/src/app

#Sets an environment variable
ENV PORT 4000

#Copy new files or directories into the filesystem of the container
COPY package.json /usr/src/app


#Execute commands in a new layer on top of the current image and commit the results
RUN npm install

##Copy new files or directories into the filesystem of the container
COPY . /usr/src/app

#Informs container runtime that the container listens on the specified network ports at runtime
EXPOSE 4000

#Allows you to configure a container that will run as an executable
ENTRYPOINT ["yarn", "run", "start"]
