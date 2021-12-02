FROM node:16.13.0-alpine

# set /app directory as default working directory
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile && \
    yarn cache clean

# copy all files from current dir to /app in container
COPY . .

# cmd to start service
CMD [ "yarn", "start" ]
