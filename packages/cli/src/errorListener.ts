import { log, isDebug } from '@edmi/utils';

function printError(e: Error, type: string) {
  if (isDebug()) {
    log.error(type, e.stack ?? e.message);
  } else {
    log.error(type, e.message);
  }
}

process.on('uncaughtException', (e) => printError(e, 'error'));
process.on('unhandledRejection', (e: Error) => printError(e, 'promise'));
