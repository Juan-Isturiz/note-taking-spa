import { errorsDictionary } from './error-dictionaries';

export const EntitiesObject = Object.freeze({
  auth: 'auth',
  note: 'note',
  default: 'default',
});

export type EntityType = keyof typeof EntitiesObject;

export type ErrorCodes<T extends keyof typeof errorsDictionary> =
  keyof (typeof errorsDictionary)[T];

export interface StandardError {
  type: string;
  code: string;
  title: string;
  message: string;
  status: number;
  details: Record<string, any>;
  stack?: string;
}

export interface ExceptionInput {
  data: StandardError;
  silent?: boolean;
  params?: Record<string, any>;
}

export class Exception extends Error {
  data: StandardError;
  silent: boolean;
  params: Record<string, any>;
  constructor({ data, silent = false, params = {} }: ExceptionInput) {
    super(data.title);
    this.data = data;
    this.silent = silent;
    this.params = params;
  }
}
