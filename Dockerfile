# ---- Build Stage ----
FROM node:alpine AS builder

WORKDIR /app

COPY package.json ./

# Setting environment variable to development to install all dependencies
ENV NODE_ENV=development

RUN npm install

COPY . .

RUN npm run build

# ---- Production Stage ----
FROM node:alpine

WORKDIR /app

# Setting environment variable to production
ENV NODE_ENV=production

# Copy only the built code and package.json
COPY --from=builder /app/dist ./dist
COPY package.json ./

# Install only production dependencies
RUN npm install --omit=dev

EXPOSE 8080

CMD ["npm", "start"]
