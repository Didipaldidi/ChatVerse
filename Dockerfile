# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the frontend package.json and package-lock.json files
COPY frontend/package*.json ./frontend/

# Change the working directory to the frontend directory
WORKDIR /app/frontend

# Install frontend dependencies
RUN npm install

# Change the working directory back to the app directory
WORKDIR /app

# Copy the backend package.json and package-lock.json files
COPY backend/package*.json ./backend/

# Change the working directory to the backend directory
WORKDIR /app/backend

# Install backend dependencies
RUN npm install

# Expose the ports the app will run on
EXPOSE 3000 5000

# Change the working directory back to the app directory
WORKDIR /app

# Copy the rest of the app files
COPY . .

# Specify the command to run when the container starts
CMD ["npm", "start"]
