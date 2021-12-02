FROM node:16.13.0-alpine as builder

# set /app directory as default working directory
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

######

FROM nginx:1.21.4-alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY proxy/nginx.conf /etc/nginx/conf.d/default.conf
