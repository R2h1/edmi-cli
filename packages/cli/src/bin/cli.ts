#! /usr/bin/env node

import importLocal from 'import-local';
import { log } from '@edmi/utils';
import entry from '../index';

if (importLocal(__filename)) {
  log.info('edmi', 'use local version of edmi');
} else {
  entry(process.argv.slice(2));
}
