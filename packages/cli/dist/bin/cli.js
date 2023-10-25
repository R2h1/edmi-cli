#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const import_local_1 = __importDefault(require("import-local"));
const npmlog_1 = __importDefault(require("npmlog"));
const index_1 = __importDefault(require("../index"));
if ((0, import_local_1.default)(__filename)) {
    npmlog_1.default.info('edmi', 'use local version of edmi');
}
else {
    (0, index_1.default)(process.argv.slice(2));
}
//# sourceMappingURL=cli.js.map