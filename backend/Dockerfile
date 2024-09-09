# Backend Dockerfile
# Use the official Node.js image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Set environment variables (can be overridden in docker-compose)
ENV JWT_SECRET_KEY=dfjghndkdjhfdkjfdsiufhwedfjhcnounjhnhc
ENV SESSION_KEY=uytwiurywbhgdskjhh892nlflskdf
ENV PORT=8080
ENV MONGODB_URL=mongodb+srv://Francis:Rl6Isimup6wNsIKW@cluster0.164giam.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
ENV MAIL_PASSWORD=rkyfnxxplapvnunh

# Command to start the app
CMD ["npm", "start"]
