import {
  EntityType,
  ErrorCodes,
  Exception,
  StandardError,
} from './error-definitions';
import { errorsDictionary } from './error-dictionaries';

function throwException<T extends EntityType>(
  entity: T,
  errorCode: ErrorCodes<T>,
  params: Record<string, any> = {},
  silent: boolean = false
): never {
  const data = (errorsDictionary?.[entity]?.[errorCode] ||
    errorsDictionary.default.default!) as StandardError;
  // Throwing exception
  throw new Exception({ data, silent, params });
}

function exception<T extends EntityType>(
  entity: T,
  errorCode: ErrorCodes<T>,
  params: Record<string, any> = {}
): never {
  throwException<T>(entity, errorCode, params, false);
}

function silentException<T extends EntityType>(
  entity: T,
  errorCode: ErrorCodes<T>,
  params: Record<string, any> = {}
): never {
  throwException<T>(entity, errorCode, params, true);
}

export const thrower = Object.freeze({ exception, silentException });
