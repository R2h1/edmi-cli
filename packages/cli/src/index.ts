import createCreateCommand from '@edmi/create';
import edmiCLI from './cli';
import './errorListener';

function main(args: string[]) {
  const cli = edmiCLI();

  createCreateCommand(cli);

  cli.parse(process.argv);
}

export default main;
