# STAGE 1 -> BUILDING IMAGE
# SIZE 222MB
FROM node:18-alpine as BUILD_IMAGE
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build 

# STAGE 2 -> COPY COMPILATED CODE TO NEW ALPINE IMAGE 
# LESS SIZE
# DONT EXPOSE OUR CODE
# SIZE 132MB

# FROM node:18-alpine as PRODUCTION_IMAGE
# WORKDIR /app
# COPY --from=BUILD_IMAGE /app/dist/ /app/dist/
# COPY package.json .
# COPY vite.config.js .
# EXPOSE 8080
# CMD [ "npm", "run", "preview" ]

# STAGE 2.2 -> USING NGINX AS HOST
# MUCHE LESS SIZE
# ABLE TO ADD ENV VAR CONFIG FILE
# SIZE 50MB

FROM nginx:alpine as PRODUCTION_STAGE
COPY --from=BUILD_IMAGE /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]