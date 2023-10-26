import CommandBase from '@edmi/command';
import { log } from '@edmi/utils';

class InitCommand extends CommandBase {
  get nameAndArgs() {
    return 'init [name]';
  }

  get description() {
    return 'init project';
  }

  action = ([name, opts]: any[]) => {
    log.success('init', name, opts);
  };

  get options() {
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
