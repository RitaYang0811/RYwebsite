# Docker for Frontend Developers

Docker solves the "works on my machine" problem by packaging your app and its environment together. Even if you're not deploying containers to production, Docker is valuable for consistent local development.

## A Minimal Dockerfile for a Vite App

```dockerfile
# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

The multi-stage build keeps the final image small — the Node.js toolchain is discarded after building.

## `nginx.conf` for SPAs

```nginx
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;

  # Route all requests to index.html for client-side routing
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache static assets aggressively
  location ~* \.(js|css|png|jpg|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

## Docker Compose for Development

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev -- --host
    environment:
      - VITE_API_URL=http://api:3000

  api:
    image: my-api:latest
    ports:
      - "3000:3000"
```

Run everything with:

```bash
docker compose up
```

## Summary

- Use multi-stage builds to keep production images small
- Configure nginx to serve SPAs correctly (`try_files` → `index.html`)
- Use `docker compose` to orchestrate frontend + backend in development
- Add a `.dockerignore` to exclude `node_modules` and `.git` from build context
