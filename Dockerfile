FROM node:6-slim

RUN echo Europe/Paris >/etc/timezone && dpkg-reconfigure -f noninteractive tzdata

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install npm deps
COPY package.json /usr/src/app/
RUN npm install --no-optional

#COPY process.yml /usr/src/app/
#RUN npm install pm2 -g
#RUN pm2 install pm2-logrotate

# copying dockerfile so force rebuild that might be unnecessary
COPY src/ /usr/src/app/src/

EXPOSE 7102
CMD ["npm", "start"]
#CMD ["pm2", "start", "--no-daemon", "process.yml", "--env", "production"]
