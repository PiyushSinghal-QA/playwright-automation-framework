/**
 * Logger utility for consistent, formatted console output
 *
 * Usage:
 *   logger.info('Starting test suite');
 *   logger.error('Login failed', error);
 */

enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

class Logger {
  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  info(message: string): void {
    console.log(this.formatMessage(LogLevel.INFO, message));
  }

  warn(message: string): void {
    console.warn(this.formatMessage(LogLevel.WARN, message));
  }

  error(message: string, error?: Error): void {
    console.error(this.formatMessage(LogLevel.ERROR, message));
    if (error) {
      console.error(error.stack);
    }
  }

  debug(message: string): void {
    if (process.env.DEBUG === 'true') {
      console.log(this.formatMessage(LogLevel.DEBUG, message));
    }
  }

  step(stepName: string): void {
    console.log(`\n▶ ${stepName}`);
  }
}

export const logger = new Logger();
