import { homedir } from 'os';
import path from 'path';

export function getTargetPath(projectName: string) {
  return path.resolve(process.cwd(), projectName);
}

export const CACHE_ROOT = path.resolve(homedir(), '.edmi');

export const CACHE_TEMPLATE_ROOT = path.resolve(CACHE_ROOT, 'template');

export const CACHE_TEMPLATE_ROOT_NODE_MODULES = path.resolve(CACHE_TEMPLATE_ROOT, 'node_modules');

/**
 * 模板的缓存路径
 * @param packageName
 * @returns
 */
export function getCachedTemplatePath(packageName: string) {
  return path.resolve(CACHE_TEMPLATE_ROOT_NODE_MODULES, packageName, 'template');
}
