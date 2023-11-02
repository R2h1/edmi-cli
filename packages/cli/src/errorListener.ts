import { printError } from '@edmi/utils';

process.on('uncaughtException', (e) => printError(e, 'error'));
process.on('unhandledRejection', (e: Error) => printError(e, 'promise'));
