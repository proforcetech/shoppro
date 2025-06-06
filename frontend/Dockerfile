# 🛠 Build Stage
FROM node:20 as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# 🚀 Production Stage
FROM nginx:alpine
WORKDIR /etc/nginx

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy SSL certs
COPY ssl/selfsigned.crt /etc/ssl/certs/selfsigned.crt
COPY ssl/selfsigned.key /etc/ssl/private/selfsigned.key

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
