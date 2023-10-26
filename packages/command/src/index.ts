import { Command } from 'commander';

export default class CommandBase {
  program: Command;

  constructor(instance: Command) {
    if (!instance) {
      throw new Error('command instance must not be null');
    }
    this.program = instance;

    const cmd = this.program
      .command(this.nameAndArgs)
      .description(this.description)
      .hook('preAction', () => {
        this.preAction();
      })
      .hook('postAction', () => {
        this.postAction();
      })
      .action((...params: any[]) => {
        this.action(params);
      });
    this.options.forEach((option) => {
      const { flags, description, defaultValue } = option;
      cmd.option(flags, description, defaultValue);
    });
  }

  get nameAndArgs(): never | string {
    throw new Error(`nameAndArgs must be implements`);
  }

  get description(): never | string {
    throw new Error(`description must be implements`);
  }

  action: (params: any[]) => void | Promise<void> = () => {
    throw new Error(`action must be implements`);
  };

  get options(): {
    flags: string;
    description?: string;
    defaultValue?: string | boolean | string[];
  }[] {
    return [];
  }

  preAction() {
    // empty
  }

  postAction() {
    // empty
  }
}
