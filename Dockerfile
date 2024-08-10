# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the Node.js dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the app will run
EXPOSE 8080

# Set environment variables (optional, if you want to define defaults)
ENV NODE_ENV=production

# Start the Node.js application
CMD ["npm", "start"]