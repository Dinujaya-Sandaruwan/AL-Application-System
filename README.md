# Mayurapada Central College A/L Admission Portal

## Overview

The **Mayurapada Central College A/L Admission Portal** is an online application platform designed to streamline the admission process for A/L students, effectively managing over 900+ applicants. This project is optimized for Choreo, which enhances deployment and management capabilities.

## Tech Stack

- **Frontend:** Next.js <img src="https://github.com/user-attachments/assets/c5d02f69-f158-4e1d-8c91-eb35442919d6" width="20" height="20">   
- **Backend:** MongoDB <img src="https://github.com/user-attachments/assets/a36d8022-be4e-467c-a95d-4222e3ffd218" width="20" height="20">
- **Containerization:** Docker <img src="https://github.com/user-attachments/assets/e238bb6c-a790-45d8-a015-1a3001c665d4" width="35" height="25">
- **Deployment:** Choreo (WSO2) <img src="https://github.com/user-attachments/assets/dc73d96e-f0bb-4909-91e8-d9ff08c23e1b" width="33" height="25">


## Features

- User-friendly interface for applicants.
- Efficient data handling with MongoDB.
- Containerized application for easy deployment and scalability.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dinethsiriwardana/AL-Application-System.git
   cd AL-Application-System
   ```

2. Build and run the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Access the application at `http://localhost:3000`.

### Dockerfile

The provided Dockerfile sets up the Next.js application with the necessary dependencies. Here’s a brief overview of its contents:

```dockerfile
FROM node:20

# Update package lists and install necessary packages
RUN apt-get update && \
    apt-get install -y \
    git=1:2.39.5-0+deb12u1 \
    libexpat1=2.5.0-1+deb12u1 \
    libexpat1-dev=2.5.0-1+deb12u1 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm cache clean --force && \
    npm install -g npm@latest && \
    npm install

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

ENV NODE_ENV production

USER 10014
EXPOSE 3000

ENV HOSTNAME 0.0.0.0
ENV PORT 3000

CMD ["./node_modules/.bin/next", "start"]
```

### Docker Compose Configuration

The Docker Compose file defines the application and MongoDB service:

```yaml
version: "3.8"
services:
  app:
    build: .
    container_name: app-container
    restart: always
    ports:
      - "3000:3000"
    environment:
      - HOSTNAME=0.0.0.0
      - PORT=3000
      - MONGO_URL=mongodb://mongo:27017/mydb
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    container_name: mongo-container
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

## API Documentation

The API for the Mayurapada Central College A/L Admission Portal is documented using Postman. You can access the collection through the following link:

- [Postman Collection](https://documenter.getpostman.com/view/26460626/2sAXxTdBKQ)

This collection includes all the endpoints used in the application, along with detailed descriptions, request parameters, and example responses. It serves as a useful resource for developers who want to interact with the API or integrate it into other applications.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
