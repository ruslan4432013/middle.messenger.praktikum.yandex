import { initNavigation } from '@pages/index';
import { UpdateProfilePage } from '@pages/update-profile';

const container = document.querySelector('#root');

if (!container) {
  throw new Error('Element #root not found');
}

container.innerHTML = UpdateProfilePage();

initNavigation();
