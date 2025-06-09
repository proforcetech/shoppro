# Use a standard Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the port Vite will run on
EXPOSE 5173

# The command to run the app will be provided by docker-compose