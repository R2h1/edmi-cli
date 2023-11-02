import CommandBase from '@edmi/command';
import { log } from '@edmi/utils';
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
    const projectInfo = await generateProjectInfo(projectName, opts);
    log.verbose('projectInfo', JSON.stringify(projectInfo));
    // 2. download 模板
    await downloadTemplate({
      ...projectInfo.templateInfo
    });
    // 3. copy 模板
    await copyTemplate({
      ...projectInfo.templateInfo,
      projectName: projectInfo.projectName,
      targetPath: projectInfo.targetPath,
      overwrite: projectInfo.overwrite
    });
    // 4. install 依赖
    await installDepends(projectInfo.targetPath);
    // 5. git init
    await gitInit(projectInfo.targetPath);
  };

  override get options() {
    return [
      {
        flags: '-f, --force',
        description: '是否强制覆盖',
        defaultValue: false
      },
      {
        flags: '-t, --template',
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
