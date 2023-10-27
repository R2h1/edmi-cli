import { checkNodeVersion } from '@edmi/utils';
import { program } from 'commander';
import { bin, version } from '../package.json';

export default function edmiCLI() {
  program
    .name(Object.keys(bin)[0])
    .usage('<command> [options]')
    .version(version)
    .option('-d, --debug', '是否开启调试模式', false)
    .hook('preAction', () => {
      checkNodeVersion();
    });

  return program;
}
