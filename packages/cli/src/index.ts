import { program } from 'commander';
import semver from 'semver';
// import chalk from 'chalk';
import createInitCommand from '@edmi/init';
import { log, isDebug } from '@edmi/utils';
import { bin, version } from '../package.json';

const LOW_NODE_VERSION = '19.0.0';

const checkNodeVersion = () => {
  const { version: nodeVersion } = process;
  if (!semver.gte(nodeVersion, LOW_NODE_VERSION)) {
    throw new Error(`需要安装 ${LOW_NODE_VERSION} 以上版本的 nodejs, 当前版本为 ${nodeVersion}`);
  }
};

const preAction = () => {
  checkNodeVersion();
};

process.on('uncaughtException', (e) => {
  if (isDebug()) {
    // eslint-disable-next-line no-console
    console.log(e);
  } else {
    log.error('', e.message);
  }
});

function main(args: string[]) {
  program
    .name(Object.keys(bin)[0])
    .usage('<command> [options]')
    .version(version)
    .option('-d, --debug', '是否开启调试模式', false)
    .hook('preAction', preAction);

  createInitCommand(program);

  program.parse(process.argv);
}

export default main;
