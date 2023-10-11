#! /usr/bin/env node

import importLocal from "import-local";
import npmlog from 'npmlog';
import entry from '../src/index';

if (importLocal(__filename)) {
  npmlog.info('edmi', 'use local version of edmi');
} else {
  entry(process.argv.slice(2));
}
