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

const TEMPLATE_INFO_LIST = [
  {
    title: 'vue',
    value: 'vue-vite-typescript-starter',
    packageName: '@edmi965/vue-vite-typescript-starter',
    registry: 'https://registry.npmjs.org'
  },
  {
    title: 'react',
    value: 'react-vite-typescript-starter',
    packageName: '@edmi965/react-vite-typescript-starter',
    registry: 'https://registry.npmjs.org'
  }
];

export default async function generateProjectInfo(projectName: string, opts: any) {
  let result: {
    projectName?: string;
    template?: string;
    overwrite?: boolean;
  } = {};

  let targetPath = '';

  try {
    result = await prompts(
      [
        {
          type: 'text',
          name: 'projectName',
          message: 'Project name:',
          initial: projectName,
          onState: (state) => {
            targetPath = getTargetPath(state.value) || projectName;
            // console.log(state.value);
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
          type: 'select',
          name: 'template',
          message: 'Select a template:',
          choices: TEMPLATE_INFO_LIST.map(({ value, title }) => ({
            value,
            title
          }))
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
  const templateInfo = TEMPLATE_INFO_LIST.find((item) => item.value === result.template) as TemplateInfo;
  return {
    projectName: result.projectName as string,
    overwrite: result.overwrite,
    templateInfo,
    targetPath
  };
}
