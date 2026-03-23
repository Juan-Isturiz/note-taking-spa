import type { FastifyReply, FastifyRequest } from 'fastify';
import { env } from '@/config/env';
import { Logger } from '@/config/logger';
import { Exception } from './error-definitions';
import { errorsDictionary } from './error-dictionaries';

function injectParams(detail: string, params: Record<string, any>) {
  return Object.entries(params).reduce((acc, [key, value]) => {
    return acc.replace(`<${key}>`, value);
  }, detail);
}

const productionEnv = env.NODE_ENV === 'production';

export function handleError(
  error: Error | Exception,
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const stack = error.stack || String(error);

  let title = 'Unhandled server error';
  let status = 500;
  let message = 'An unexpected error appeared';
  let silent = false;

  if (error instanceof Exception) {
    const data = error.data;
    const response = {
      silent: error.silent && productionEnv,
      data,
      title: error.data.title,
      status: error.data.status,
      type: error.data.type,
      message: injectParams(data.message, error.params),
    };

    // Send error response
    reply.status(error.data.status).send(response);
    return reply;
  }
  Logger.warn(error.message, { stack });
  console.log(error);
  const genericError = errorsDictionary.default.default;
  const response = {
    title: silent ? genericError.title : title,
    message: silent ? genericError.message : message,
    status: silent ? genericError.status : status,
    stack: !productionEnv && status === 500 ? stack : undefined,
  };

  // Send error response
  reply.status(status).send(response);
  return reply;
}
