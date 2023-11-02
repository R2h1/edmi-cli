import { $ } from 'execa';
import { watch } from 'chokidar';
import { cyan, dim } from '@edmi/utils';

watch('src').on('change', async () => {
  await $`tsc --build`;
  const date = new Date();
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  console.error(`[${cyan('INFO')}] ${dim(`${h}:${m}:${s}`)} rebuild successful`);
});
