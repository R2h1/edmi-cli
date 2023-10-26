// eslint-disable-next-line import/no-extraneous-dependencies
import npmlog from 'npmlog';
import isDebug from './isDebug';

if (isDebug()) {
  npmlog.level = 'verbose';
} else {
  npmlog.level = 'info';
}

npmlog.heading = 'edmi';
npmlog.addLevel('success', 2000, { fg: 'green', bold: true });

export default npmlog;
