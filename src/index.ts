import { initNavigation } from '@pages/index';
import { UpdateProfilePage } from '@pages/update-profile';
import { render } from '@shared/lib';

const container = document.querySelector('#root');

if (!container) {
  throw new Error('Element #root not found');
}

render('#root', new UpdateProfilePage({
  events: {
    onmouseover: () => {
      console.log('hello world');
    },
  },
}));

initNavigation();
