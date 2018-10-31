FROM keymetrics/pm2:8-alpine

# Bundle APP files

WORKDIR /mnt/app/express-example
# COPY ./express-example /mnt/app/express-example

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# RUN npm run build

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]