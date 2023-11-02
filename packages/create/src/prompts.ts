import prompts from 'prompts';
import { red } from 'kolorist';

import { log, pathNotExistOrEmptyExceptGit } from '@edmi/utils';
import { getTargetPath } from './path';

export type TemplateInfo = {
  title: string;
  value: string;
  packageName: string;
  registry: string;
};

const defaultProjectName = 'edmi-project';

const TEMPLATE_INFO_LIST = [
  {
    title: 'vue-vite-ts',
    value: 'vue-vite-typescript-starter',
    packageName: '@edmi965/vue-vite-typescript-starter',
    registry: 'https://registry.npmjs.org'
  },
  {
    title: 'react-vite-ts',
    value: 'react-vite-typescript-starter',
    packageName: '@edmi965/react-vite-typescript-starter',
    registry: 'https://registry.npmjs.org'
  }
];

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

  let targetPath = getTargetPath(projectName);
  let templateInfo = TEMPLATE_INFO_LIST.find((item) => item.title === opts.template) as TemplateInfo;

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
          choices: TEMPLATE_INFO_LIST.map(({ value, title }) => ({
            value,
            title
          })),
          onState: (state) => {
            templateInfo = TEMPLATE_INFO_LIST.find((item) => item.value === state.value) as TemplateInfo;
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
  return {
    projectName: result.projectName as string,
    overwrite: result.overwrite,
    templateInfo,
    targetPath
  };
}
