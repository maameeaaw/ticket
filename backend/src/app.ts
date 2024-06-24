import dotenv from 'dotenv';
/* eslint-disable import/first */
const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.default' });
}

import bodyParser from 'body-parser';
import compression from 'compression';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import ApplicationError from './errors/application-error';
import routes from './routes';
import logger from './logger';

const app = express();
const CORS_ALLOW = process.env?.CORS_ALLOW || '';
const CORS_LIST = CORS_ALLOW.split(',');

const allowedOrigins = CORS_LIST;

const options: cors.CorsOptions = {
  allowedHeaders: [
    // 'Origin'
    // 'X-Requested-With',
    'Content-Type'
    // 'Accept',
    // 'X-Access-Token'
  ],
  // credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  // preflightContinue: false,
  origin: allowedOrigins
};

function logResponseTime(req: Request, res: Response, next: NextFunction) {
  const startHrTime = process.hrtime();

  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    const message = `${req.method} ${res.statusCode} ${elapsedTimeInMs}ms\t${req.path}`;
    logger.log({
      level: 'debug',
      message,
      consoleLoggerOptions: { label: 'API' }
    });
  });

  next();
}

app.use(logResponseTime);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(options));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

app.use(routes);

app.use((err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.status || 500).json({
    error: err.message
  });
});

export default app;
