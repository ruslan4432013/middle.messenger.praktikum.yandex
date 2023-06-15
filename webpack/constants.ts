import path from 'path';

const IS_DEV: boolean = String(process.env.NODE_ENV).trim() === 'development';

const DEV_SERVER_PORT: number = 3000;

const SRC_DIR: string = path.join(__dirname, '../src');
const DIST_DIR: string = path.join(__dirname, '../dist');


const ALIAS: Record<string, string> = {
  '@styles': `${SRC_DIR}/shared/styles/index.scss`,
  '@shared': `${SRC_DIR}/shared`,
  '@pages': `${SRC_DIR}/pages`,
  '@entities': `${SRC_DIR}/entities`,
  '@widgets': `${SRC_DIR}/widgets`,
  '@features': `${SRC_DIR}/features`,
  _webpack: path.join(__dirname, '../webpack'),
};

export {
  ALIAS,
  DEV_SERVER_PORT,
  DIST_DIR,
  IS_DEV,
  SRC_DIR,
};
