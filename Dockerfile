# syntax=docker/dockerfile:1

FROM node:18-alpine as base
WORKDIR /app
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]
EXPOSE 5000

FROM base as test
ENV NODE_ENV=test
RUN npm ci
COPY . .
RUN npm run test

FROM base as dev
COPY [".env.development", "./"]
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 9229
RUN npx prisma generate
CMD ["npm", "run", "dev:migrate"]

FROM base as prod
RUN npm ci --production
COPY . .
RUN npx prisma generate
CMD ["npm", "run", "prod:migrate"]