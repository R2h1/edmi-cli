import CommandBase from '@edmi/command';
import { green, log } from '@edmi/utils';
import generateProjectInfo from './prompts';
import downloadTemplate from './download';
import copyTemplate from './copy';
import installDepends from './install';
import gitInit from './git';

class CreateCommand extends CommandBase {
  override get nameAndArgs() {
    return 'create <project-name>';
  }

  override get description() {
    return 'create a project by template';
  }

  override action = async ([projectName, opts]: any[]) => {
    // 1. 用户交互
    const { targetPath, templateInfo, overwrite } = await generateProjectInfo(projectName, opts);
    log.info(`Creating a project in ${green(targetPath)}.\n`, '');
    log.info(`Using template: ${green(templateInfo.title)}\n`, '');
    // 2. download 模板
    await downloadTemplate({
      ...templateInfo
    });
    // 3. copy 模板
    await copyTemplate({
      ...templateInfo,
      targetPath,
      overwrite
    });
    // 4. install 依赖
    await installDepends(targetPath);
    // 5. git init
    await gitInit(targetPath);
  };

  override get options() {
    return [
      {
        flags: '-f, --force',
        description: '是否强制覆盖',
        defaultValue: false
      },
      {
        flags: '-tp, --template <template>',
        description: '指定模板名称',
        defaultValue: 'react-vite-typescript-starter'
      }
    ];
  }
}

function Factory(instance: any) {
  return new CreateCommand(instance);
}

export default Factory;
