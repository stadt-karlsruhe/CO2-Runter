FROM node:alpine
WORKDIR /app
RUN npm install -g nodemon 
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm ci
CMD ["npm", "run", "watch"]