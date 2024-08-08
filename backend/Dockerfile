# Use the Node.js 21 base image
FROM node:21

# Set the working directory inside the container
WORKDIR /app/server

# Install global dependencies if needed
RUN npm install -g @nestjs/cli

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY prisma ./prisma/
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 5000

# Run the application
CMD ["npm", "run", "start:dev"]
