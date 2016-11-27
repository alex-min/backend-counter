FROM node

RUN mkdir -p /app
RUN npm install -g nodemon
WORKDIR /app
CMD ["nodemon"]
EXPOSE 80
