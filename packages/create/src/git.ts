import execa from 'execa';
import { log } from '@edmi/utils';

function isInGitRepository(cwd: string) {
  try {
    execa.sync('git', ['rev-parse', '--is-inside-work-tree'], { cwd, stdio: 'ignore' });
    return true;
  } catch (err: any) {
    log.verbose('', err);
  }
  return false;
}

export default async function gitInit(cwd: string) {
  try {
    if (isInGitRepository(cwd)) {
      throw new Error(`${cwd} is already a git repository`);
    }
    await execa('git', ['init'], { cwd, stdio: 'ignore' });
    log.success('Git init successful');
  } catch (err: any) {
    log.verbose('', err.message);
  }
}
