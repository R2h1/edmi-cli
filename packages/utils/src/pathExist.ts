import fs from 'fs';

/* eslint-disable import/prefer-default-export */
export function pathExistsSync(path: string) {
  try {
    fs.accessSync(path);
    return true;
  } catch {
    return false;
  }
}

export function pathNotExistOrEmptyExceptGit(dir: string) {
  if (!pathExistsSync(dir)) {
    return true;
  }
  const files = fs.readdirSync(dir);
  if (files.length === 0) {
    return true;
  }
  if (files.length === 1 && files[0] === '.git') {
    return true;
  }
  return false;
}
