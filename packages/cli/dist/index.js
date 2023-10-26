"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const semver_1 = __importDefault(require("semver"));
// import chalk from 'chalk';
const init_1 = __importDefault(require("@edmi/init"));
const utils_1 = require("@edmi/utils");
const package_json_1 = require("../package.json");
const LOW_NODE_VERSION = '19.0.0';
const checkNodeVersion = () => {
    const { version: nodeVersion } = process;
    if (!semver_1.default.gte(nodeVersion, LOW_NODE_VERSION)) {
        throw new Error(`需要安装 ${LOW_NODE_VERSION} 以上版本的 nodejs, 当前版本为 ${nodeVersion}`);
    }
};
const preAction = () => {
    checkNodeVersion();
};
process.on('uncaughtException', (e) => {
    if ((0, utils_1.isDebug)()) {
        // eslint-disable-next-line no-console
        console.log(e);
    }
    else {
        utils_1.log.error('', e.message);
    }
});
function main(args) {
    commander_1.program
        .name(Object.keys(package_json_1.bin)[0])
        .usage('<command> [options]')
        .version(package_json_1.version)
        .option('-d, --debug', '是否开启调试模式', false)
        .hook('preAction', preAction);
    (0, init_1.default)(commander_1.program);
    commander_1.program.parse(process.argv);
}
exports.default = main;
//# sourceMappingURL=index.js.map