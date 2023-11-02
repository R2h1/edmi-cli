// eslint-disable-next-line import/no-extraneous-dependencies
import npmlog from 'npmlog';
import { bgGray } from 'kolorist';
import { isDebug } from './env';

if (isDebug()) {
  npmlog.level = 'verbose';
} else {
  npmlog.level = 'info';
}

npmlog.heading = bgGray('edmi');
npmlog.addLevel('success', 2000, { fg: 'green', bold: true });

export function printError(e: Error, type: 'error' | 'promise' = 'error') {
  if (isDebug()) {
    npmlog.error(type, e.stack ?? e.message);
  } else {
    npmlog.error(type, e.message);
  }
}

export default npmlog;
