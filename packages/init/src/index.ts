import CommandBase from '@edmi/command';
import { log } from '@edmi/utils';

class InitCommand extends CommandBase {
  override get nameAndArgs() {
    return 'init [name]';
  }

  override get description() {
    return 'init project';
  }

  override action = ([name, opts]: any[]) => {
    log.success('init', name, opts);
  };

  override get options() {
    return [
      {
        flags: '-f, --force',
        description: '是否强制更新',
        defaultValue: false
      }
    ];
  }
}

function createInitCommand(instance: any) {
  return new InitCommand(instance);
}

export default createInitCommand;
