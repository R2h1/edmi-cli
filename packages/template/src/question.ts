import { red, log, request, printError } from '@edmi/utils';
import prompts from 'prompts';

export type TemplateInfo = {
  packageName?: string;
  newPackageName?: string;
};

export async function addTemplate(templateInfo: TemplateInfo): Promise<void> {
  try {
    const rspData = await request({
      url: '/api/v1/templates/add',
      method: 'POST',
      data: templateInfo
    });
    log.verbose('', JSON.stringify(rspData));
  } catch (err: any) {
    printError(err);
  }
}

export async function deleteTemplate(templateInfo: TemplateInfo): Promise<void> {
  try {
    const rspData = await request({
      url: '/api/v1/templates/delete',
      method: 'POST',
      data: templateInfo
    });
    log.verbose('', JSON.stringify(rspData));
  } catch (err: any) {
    printError(err);
  }
}

export async function updateTemplate(templateInfo: TemplateInfo): Promise<void> {
  try {
    const rspData = await request({
      url: '/api/v1/templates/update',
      method: 'POST',
      data: templateInfo
    });
    log.verbose('', JSON.stringify(rspData));
  } catch (err: any) {
    printError(err);
  }
}

// edmi template
export async function questionForTemplate(opts: TemplateInfo, type: string) {
  const result: TemplateInfo = opts;
  try {
    await prompts(
      [
        {
          type: opts.packageName ? null : 'text',
          name: 'packageName',
          message: 'npm package name:',
          initial: '',
          onState: (state) => {
            result.packageName = state.value;
          }
        },
        {
          type: type !== 'update' || opts.newPackageName ? null : 'text',
          name: 'newPackageName',
          message: 'update package name:',
          onState: (state) => {
            result.newPackageName = state.value;
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
  return result;
}
