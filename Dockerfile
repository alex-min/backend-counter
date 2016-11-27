FROM node


RUN npm install -g nodemon
RUN apt-get update
RUN apt-get install lsof apache2-utils -y

RUN mkdir -p /app
WORKDIR /app
CMD ["nodemon"]
EXPOSE 80
