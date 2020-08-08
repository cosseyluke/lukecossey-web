FROM node:10-alpine as build
WORKDIR /app
COPY client/package.json /app/package.json
COPY client/yarn.lock /app/yarn.lock
# RUN npm install --only=prod
RUN yarn --pure-lockfile
COPY client/ /app
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
