import semver from 'semver';
import { red } from 'kolorist';

const LOW_NODE_VERSION = '18.0.0';

export function isDebug() {
  return process.argv.includes('--debug') || process.argv.includes('-d');
}

export function checkNodeVersion() {
  const { version: nodeVersion } = process;
  if (!semver.gte(nodeVersion, LOW_NODE_VERSION)) {
    throw new Error(red(`需要安装 ${LOW_NODE_VERSION} 以上版本的 nodejs, 当前版本为 ${nodeVersion}`));
  }
}
