import createInitCommand from '@edmi/init';
import edmiCLI from './cli';
import './errorListener';

function main(args: string[]) {
  const cli = edmiCLI();

  createInitCommand(cli);

  cli.parse(process.argv);
}

export default main;
