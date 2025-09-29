# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built app and server
COPY --from=build /app/build ./build
COPY --from=build /app/server.js ./
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose port
EXPOSE $PORT

# Start the server
CMD ["npm", "run", "serve"]
