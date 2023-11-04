import prompts from 'prompts';

import { request, log, pathNotExistOrEmptyExceptGit, printError, red } from '@edmi/utils';
import { getTargetPath } from './path';

export type TemplateInfo = {
  packageName: string;
};

const defaultProjectName = 'edmi-project';

async function fetchTemplates() {
  try {
    const data = await request({
      url: '/api/v1/templates',
      method: 'GET'
    });
    log.verbose('', JSON.stringify(data));
    return data as unknown as TemplateInfo[];
  } catch (err: any) {
    printError(err);
  }
  return null;
}

export default async function generateProjectInfo(
  projectName: string,
  opts: {
    projectName?: string;
    force?: boolean;
    template?: string;
  }
) {
  let result: {
    projectName?: string;
    template?: string;
    overwrite?: boolean;
  } = {};

  const templates = await fetchTemplates();
  if (!templates) {
    throw new Error('There are not any templates to be select!');
  }
  let targetPath = getTargetPath(projectName);
  let templateInfo = templates.find((item) => item.packageName === opts.template) as TemplateInfo;

  try {
    result = await prompts(
      [
        {
          type: projectName ? null : 'text',
          name: 'projectName',
          message: 'Project name:',
          initial: defaultProjectName,
          onState: (state) => {
            targetPath = getTargetPath(state.value) || projectName;
          }
        },
        {
          type: () => (pathNotExistOrEmptyExceptGit(targetPath) || opts.force ? null : 'confirm'),
          name: 'overwrite',
          message: () => `Target directory "${targetPath}" is not empty, Remove existing files and continue?`
        },
        {
          type: (_, { overwrite }: { overwrite?: boolean }) => {
            if (overwrite === false) {
              throw new Error(`${red('✖')} Operation cancelled`);
            }
            return null;
          },
          name: 'overwriteChecker'
        },
        {
          type: opts.template && templateInfo ? null : 'select',
          name: 'template',
          message: 'Select a template:',
          choices: templates.map(({ packageName }) => ({
            title: packageName,
            value: packageName
          })),
          onState: (state) => {
            templateInfo = templates.find((item) => item.packageName === state.value) as TemplateInfo;
          }
        }
      ],
      {
        onCancel: () => {
          throw new Error(`${red('✖')}  Operation cancelled`);
        }
      }
    );
  } catch (err: any) {
    log.error('', err.message);
    process.exit(1);
  }
  const projectInfo = {
    overwrite: result.overwrite,
    templateInfo,
    targetPath
  };
  log.verbose('projectInfo', JSON.stringify(projectInfo));
  return projectInfo;
}
