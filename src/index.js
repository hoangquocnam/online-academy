import app from './app.js';
import configs from './configs/index.js';
import logger from './utils/logger.js';

const server = app.listen(configs.port, () => {
  logger.info(`Listening to port ${configs.port}`);
});

const unexpectedErrorHandler = (err) => {
  logger.error(err);

  if (server) {
    server.close(() => {
      logger.info('Server is closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');

  if (server) {
    server.close();
  }
});
