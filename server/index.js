const { createServer } = require('http');
const express = require('express');
const helmet = require('helmet');
const { Server } = require('socket.io');
const httpStatus = require('http-status');

const config = require('./src/config/config');
const forwardError = require('./src/error/forwardError');
const morganMiddleware = require('./src/logger/morgan');
const errorMiddleware = require('./src/error/errorMiddleware');
const APIError = require('./src/error/apiError');
const logger = require('./src/logger/winston');

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer);

// logs HTTP requests
app.use(morganMiddleware);

// secures app by setting various HTTP headers
app.use(helmet());

// guard against clickjacking
app.use(helmet.frameguard({ action: 'deny' }));

app.get(
  '/api/test',
  forwardError((req, res) => {
    logger.info('just a test endpoint');
    res.sendStatus(httpStatus.OK);
  })
);

app.use((req, res, next) => {
  const notFoundError = new APIError(
    'API not found',
    httpStatus.NOT_FOUND
  );
  next(notFoundError);
});

app.use(errorMiddleware);

io.on('connection', socket => {
  const { id } = socket.handshake.query;
  socket.join(id);

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(
        r => r !== recipient
      );

      newRecipients.push(id);

      socket.to(recipient).emit('receive-message', {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});

httpServer.listen(
  config.port,
  logger.info(`Server is running on port ${config.port}`)
);
