# ---------- build Angular ----------
# FROM node:20-bookworm-slim AS build
# WORKDIR /app

# COPY package*.json ./
# RUN npm ci

# COPY . .
# # build prod (usa la config por defecto que ya es "production")
# RUN npm run build -- --configuration production

# # ---------- nginx runtime ----------
# FROM nginx:stable
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx","-g","daemon off;"]

FROM node:20-bookworm-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]


