FROM node:14-alpine

# Create app directory 
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy rest of app code
COPY . .

# Expose port
EXPOSE 3001

# Default command to run app
ENTRYPOINT [ "npm", "start" ]
