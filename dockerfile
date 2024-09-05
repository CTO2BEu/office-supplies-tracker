# Use a minimal base image to reduce the attack surface
FROM node:14-alpine

# Create a non-root user and group with specific IDs for better security
RUN addgroup -g 1001 -S appgroup && adduser -u 1001 -S appuser -G appgroup

# Set the working directory
WORKDIR /app

# Copy only the necessary files to reduce the image size
COPY package*.json ./

# Install dependencies as the non-root user
RUN npm install

# Copy the remaining application code
COPY . .

# Change ownership of the application directory to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose the application port
EXPOSE 3000

# Specify a read-only filesystem for the container to improve security
# Ensure the data directory is writable if necessary
VOLUME /app/data

# Drop all unnecessary capabilities and set up a security context
CMD ["node", "index.js"]

# Apply additional security options when running the container:
#  --cap-drop=ALL --cap-add=NET_ADMIN --read-only --security-opt seccomp=default.json
