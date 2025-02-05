# Stage 1: Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./

RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 80
EXPOSE 5173

# Start Nginx server
CMD ["npm", "run", "dev"]
