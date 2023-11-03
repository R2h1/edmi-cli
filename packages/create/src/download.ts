import ora from 'ora';
import execa from 'execa';
import fse from 'fs-extra';
import { log, pathExistsSync, printError } from '@edmi/utils';
import { CACHE_TEMPLATE_ROOT, CACHE_TEMPLATE_ROOT_NODE_MODULES } from './path';

type DownloadOptions = {
  packageName: string;
  registry: string;
};

export default async function downloadTemplate(options: DownloadOptions) {
  log.verbose('downloadTemplate options', JSON.stringify(options));
  const { packageName } = options;
  const spinner = ora('downloading template...').start();
  try {
    if (!pathExistsSync(CACHE_TEMPLATE_ROOT_NODE_MODULES)) {
      fse.mkdirpSync(CACHE_TEMPLATE_ROOT);
    }
    await execa('npm', ['install', packageName], { cwd: CACHE_TEMPLATE_ROOT });
    spinner.succeed('template download successful\n');
  } catch (err: any) {
    spinner.fail();
    printError(err);
  } finally {
    spinner.stop();
  }
}
