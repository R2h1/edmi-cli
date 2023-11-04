import fse from 'fs-extra';
import ora from 'ora';

import { printError } from '@edmi/utils';
import { getCachedTemplatePath } from './path';

type CopyOptions = {
  projectName: string;
  packageName: string;
  targetPath: string;
  overwrite?: boolean;
};

async function copyFiles(src: string, dest: string, projectName: string) {
  const spinner = ora('copying template...').start();
  try {
    fse.copySync(src, dest);
    const files = fse.readdirSync(dest);
    files.forEach((file) => {
      if (file === 'package.json') {
        const pkg = JSON.parse(fse.readFileSync(`${dest}/${file}`, 'utf-8'));
        pkg.name = projectName;
        fse.writeFileSync(`${dest}/${file}`, `${JSON.stringify(pkg, null, 2)}\n`);
      }
    });
    spinner.succeed('template copy successful\n');
  } catch (err: any) {
    spinner.fail();
    printError(err);
  } finally {
    spinner.stop();
  }
}

export default async function copyTemplate(options: CopyOptions) {
  const { packageName, targetPath, overwrite, projectName } = options;
  if (overwrite) {
    fse.removeSync(targetPath);
  }
  fse.mkdirpSync(targetPath);
  const cachedTemplatePath = getCachedTemplatePath(packageName);
  copyFiles(cachedTemplatePath, targetPath, projectName);
}
