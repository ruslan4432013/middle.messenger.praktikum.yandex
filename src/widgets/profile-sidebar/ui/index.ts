import arrowLeftIcon from './arrow-left.svg';
import render from './profile-sidebar.hbs';
import s from './profile-sidebar.module.scss';

export const ProfileSidebar = () => {
  const context = {
    arrowLeftIcon,
  };
  const source = { ...s, ...context };
  return render(source);
};
