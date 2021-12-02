# Chat App

This is a simple chat app prototype. Its main functionality is direct messaging. In addition to that it also supports group messaging. It doesn't use any DB for data persistance, it only uses local storage to store the data.

## Tech used

### Frontend

- React
- Material UI

### Backend

- Node.js, Express
- Socket.io

### Other

- Docker
- Nginx

## How to launch

The only prerequisite to launch the app and play with it is to have `Docker` installed. Once it's installed just run the following script from the root directory.

```
./demo.sh
```

It'll take some time to build the images, once the images are built and containers running you can access the app in your browser at `http://localhost:3000`.

## How to use
Please, check out the short video below.

https://user-images.githubusercontent.com/13277636/144499199-f39083e7-1177-4c55-bd2f-734dfcfaa103.mp4


## Things to improve

- add DB for data persistance
- make the app scalable using a message broker such Redis, Kafka, etc.

