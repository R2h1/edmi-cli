import { log, printError } from '@edmi/utils';
import execa from 'execa';

export default async function installDepends(cwd: string) {
  log.info('installing dependencies...\n', '');
  try {
    await execa('npm', ['install'], { cwd, stdio: 'inherit' });
    log.success('dependencies install successful');
  } catch (err: any) {
    printError(err);
  }
}
