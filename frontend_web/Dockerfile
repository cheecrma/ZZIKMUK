FROM node:16.17.0 as build-stage
WORKDIR /var/jenkins_home/workspace/AIProjectDeploy/frontend_web
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/AIProjectDeploy/frontend_web/dist /usr/share/nginx/html
COPY --from=build-stage /var/jenkins_home/workspace/AIProjectDeploy/frontend_web/nginx/nginx.conf
COPY --from=build-stage /var/jenkins_home/workspace/AIProjectDeploy/frontend_web/nginx/private.pem
COPY --from=build-stage /var/jenkins_home/workspace/AIProjectDeploy/frontend_web/nginx/public.pem
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]