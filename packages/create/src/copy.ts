import fse from 'fs-extra';
import ora from 'ora';

import { log, printError } from '@edmi/utils';
import { getCachedTemplatePath } from './path';

type CopyOptions = {
  projectName: string;
  packageName: string;
  targetPath: string;
  overwrite?: boolean;
};

async function copyFiles(src: string, dest: string) {
  const spinner = ora('copying template...').start();
  try {
    fse.copySync(`${src}`, `${dest}`);
    spinner.succeed();
    log.success('template copy successful');
  } catch (err: any) {
    spinner.fail();
    printError(err);
  }
}

export default async function copyTemplate(options: CopyOptions) {
  const { packageName, targetPath, overwrite } = options;
  if (overwrite) {
    fse.removeSync(targetPath);
  }
  fse.mkdirpSync(targetPath);
  const cachedTemplatePath = getCachedTemplatePath(packageName);
  await copyFiles(cachedTemplatePath, targetPath);
}
