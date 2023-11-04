import createCreateCommand from '@edmi/create';
import createTemplateCommand from '@edmi/template';
import edmiCLI from './cli';
import './errorListener';

function main(args: string[]) {
  const cli = edmiCLI();

  createCreateCommand(cli);
  createTemplateCommand(cli);

  cli.parse(process.argv);
}

export default main;
