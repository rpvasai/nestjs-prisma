# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Install the Nest CLI globally
RUN npm install -g @nestjs/cli
RUN apk add --no-cache bash

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
