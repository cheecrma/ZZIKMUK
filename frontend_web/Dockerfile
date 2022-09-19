FROM node:16.17.0 as build-stage
WORKDIR /var/jenkins_home/workspace/AiDeploy/frontend_web
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build-stage /var/jenkins_home/workspace/AiDeploy/frontend_web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]