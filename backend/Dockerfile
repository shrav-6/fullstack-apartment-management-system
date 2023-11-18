FROM node:latest

# Update and install Git
RUN apt-get update && apt-get install -y git

# Set the working directory
WORKDIR /app

# RUN the app
RUN npm install

# Copy your application code into the container
COPY . .

# Expose the port where application will run
EXPOSE 3001

# Set the entry point command for the container
ENTRYPOINT ["npm", "run", "serve"]
