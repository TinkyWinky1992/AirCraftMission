FROM node:21

# Set the working directory
WORKDIR /app/server

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g @nestjs/cli

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Run the application
CMD ["npm", "run", "start:dev"]
