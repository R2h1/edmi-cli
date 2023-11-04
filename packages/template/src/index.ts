import CommandBase from '@edmi/command';
import { log } from '@edmi/utils';
import { questionForTemplate, addTemplate, deleteTemplate, updateTemplate } from './question';

class AddCommand extends CommandBase {
  override get nameAndArgs() {
    return 'template <type> [packageName] [newPackageName]';
  }

  override get description() {
    return 'curd for template';
  }

  override action = async ([type, packageName, newPackageName]: any[]) => {
    log.verbose(type, packageName, newPackageName);
    const templateInfo = await questionForTemplate({ packageName, newPackageName }, type);
    // 1. 用户交互
    if (type === 'add') {
      await addTemplate(templateInfo);
    } else if (type === 'delete') {
      await deleteTemplate(templateInfo);
    } else if (type === 'update') {
      await updateTemplate(templateInfo);
    } else {
      throw new Error(`This '${type}' is not support!`);
    }
  };
}

function Factory(instance: any) {
  return new AddCommand(instance);
}

export default Factory;
