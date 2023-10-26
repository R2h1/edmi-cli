import { $ } from 'execa';
import { watch } from 'chokidar';
import chalk from 'chalk';

watch('src').on('change', async () => {
  await $`tsc --build`;
  const date = new Date();
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  console.error(`[${chalk.cyan('INFO')}] ${chalk.dim(`${h}:${m}:${s}`)} rebuild successful`);
});
