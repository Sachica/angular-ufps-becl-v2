### STAGE 1:BUILD ###
FROM node:latest as build
WORKDIR /app
RUN npm cache clean --force
COPY ./ /app/
RUN npm install
ARG configuration=production
RUN npm run build -- --prod --configuration=$configuration

### STAGE 2:RUN ###
FROM nginx:latest as nginx
COPY --from=build /app/dist/ufps-becl-app /usr/share/nginx/html
COPY --from=build /nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
EXPOSE 80