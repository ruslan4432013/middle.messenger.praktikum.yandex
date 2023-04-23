import { initNavigation } from '@pages/index';
import { LoginPageView } from '@pages/login';
import { render } from '@shared/lib';

const container = document.querySelector('#root');

if (!container) {
  throw new Error('Element #root not found');
}

render('#root', new LoginPageView(container));

initNavigation();
