# ---- Build Stage ----
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

# Setting environment variable to development to install all dependencies
ENV NODE_ENV=development

# Install exactly as described in package-lock.json without any additional modifications - ensure predictable and stable environment
RUN npm ci 

COPY . .

RUN npm run build

# ---- Production Stage ----
FROM node:18-alpine

WORKDIR /app

# Setting environment variable to production
ENV NODE_ENV=production

# Copy only the built code and package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev

EXPOSE 8080

CMD ["npm", "start"]
