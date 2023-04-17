import arrowLeftIcon from './arrow-left.svg';
import s from './profile-sidebar.module.scss';
import render from './profile-sidebar.hbs';

export const ProfileSidebar = () => {
  const context = {
    arrowLeftIcon,
  };
  const source = { ...s, ...context };
  return render(source);
};
