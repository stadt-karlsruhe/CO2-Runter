# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only the package.json and package-lock.json files to leverage Docker cache
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project files to the container
COPY ./ ./

# Expose the port that the Vue app will run on (change this if your app uses a different port)
EXPOSE 3000

# Build the Vue project
RUN npm run build

# Command to start the Vue app
CMD ["npm", "run", "start"]
