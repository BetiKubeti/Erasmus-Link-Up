# Use an official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use a lighter web server to serve the build
RUN npm install -g serve

# Default port to expose (optional)
EXPOSE ${PORT}

# Command to run the application
CMD ["sh", "-c", "serve -s build -l ${PORT}"]
