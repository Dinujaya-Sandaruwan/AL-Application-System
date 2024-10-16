# Stage 1: Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . . 
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine AS production

WORKDIR /app

ENV NODE_ENV=development
ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

# Set user to root temporarily
USER root

# Change permissions
RUN chown -R 10014:10014 /app

# Switch back to non-root user
USER 10014

EXPOSE 3000

CMD ["npm", "start"]
