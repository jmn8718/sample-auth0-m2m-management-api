FROM node:8.9-alpine
ENV NODE_ENV production
RUN npm install -g nodemon

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3003
CMD npm run dev