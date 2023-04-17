import render from './header.hbs';
import s from './header.module.scss';
import menuIcon from './menu-icon.svg';

export const Header = () => {
  const context = {
    userIcon: 'https://via.placeholder.com/34x34',
    userName: 'Вадим',
    menuIcon,
  };
  const source = { ...s, ...context };
  return render(source);
};
