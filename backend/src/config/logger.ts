import pino, { Logger as PinoLogger } from 'pino';
import { env } from './env';
export class Logger {
  private static instance: PinoLogger | null = null;
  private constructor() {}

  private static get() {
    if (Logger.instance) {
      return Logger.instance;
    }

    let logger: PinoLogger;

    logger = pino({
      level: env.NODE_ENV === 'development' ? 'debug' : 'info',
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
      timestamp: pino.stdTimeFunctions.isoTime,
    });
    Logger.instance = logger;
    return logger;
  }
  public static debug(message: string, args: { [key: string]: any } = {}) {
    Logger.get().debug(args, `[DEBUG] ${message}`);
  }
  public static info(message: string, args: { [key: string]: any } = {}) {
    Logger.get().info(args, `[INFO] ${message}`);
  }
  public static warn(message: string, args: { [key: string]: any } = {}) {
    Logger.get().warn(args, `[WARN] ${message}`);
  }
  public static error(message: string, args: { [key: string]: any } = {}) {
    Logger.get().error(args, `[ERROR] ${message}`);
  }
  public static fatal(message: string, args: { [key: string]: any } = {}) {
    Logger.get().fatal(args, `[FATAL] ${message}`);
  }
}
