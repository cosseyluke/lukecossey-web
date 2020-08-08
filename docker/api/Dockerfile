FROM node:10

# Specify the "working directory" for the rest of the Dockerfile
RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

# Install packages using NPM
COPY api/package*.json ./
RUN npm install --silent

# Add application code
COPY api/bin ./bin
COPY api/src ./src
COPY api/routes ./routes

EXPOSE 9000
EXPOSE 9001

CMD ["npm", "run", "dev"]
