import createInitCommand from '@edmi/init';
import { log, isDebug } from '@edmi/utils';
import edmiCLI from './cli';

process.on('uncaughtException', (e) => {
  if (isDebug()) {
    // eslint-disable-next-line no-console
    console.log(e);
  } else {
    log.error('', e.message);
  }
});

function main(args: string[]) {
  const cli = edmiCLI();

  createInitCommand(cli);

  cli.parse(process.argv);
}

export default main;
