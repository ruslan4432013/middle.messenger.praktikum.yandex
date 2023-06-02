import path from 'path';
import ModuleAlias from 'module-alias';

const SRC_DIR = path.join(__dirname, './src');


const ALIAS = {
  '@styles': `${SRC_DIR}/shared/styles/index.scss`,
  '@shared': `${SRC_DIR}/shared`,
  '@pages': `${SRC_DIR}/pages`,
  '@entities': `${SRC_DIR}/entities`,
  '@widgets': `${SRC_DIR}/widgets`,
  '@features': `${SRC_DIR}/features`,
};


ModuleAlias.addAliases(ALIAS);
