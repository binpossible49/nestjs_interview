import type { Request } from 'express';
import { nanoid } from 'nanoid';
import type { Params } from 'nestjs-pino';
import { multistream } from 'pino';
import type { ReqId } from 'pino-http';
import 'pino-pretty';

const passUrl = new Set([]);

export const loggerOptions: Params = {
  pinoHttp: [
    {
      quietReqLogger: false,
      transport: {
        target: 'pino-pretty',
        options: { sync: true, singleLine: true },
      },
      genReqId: (req): ReqId =>
        (<Request>req).header('X-Request-Id') ?? nanoid(),
      ...(process.env.NODE_ENV === 'production'
        ? {}
        : {
            level: 'debug',
            // https://github.com/pinojs/pino-pretty
            transport: {
              target: 'pino-pretty',
              options: { sync: true, singleLine: true },
            },
          }),
      autoLogging: {
        ignore: (req) => passUrl.has((<Request>req).originalUrl),
      },
    },
    multistream(
      [
        // https://getpino.io/#/docs/help?id=log-to-different-streams
        { level: 'debug', stream: process.stdout },
        { level: 'error', stream: process.stderr },
        { level: 'fatal', stream: process.stderr },
      ],
      { dedupe: true },
    ),
  ],
};
