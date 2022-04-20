import React from 'react';

import './Footer.css';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';
import { useManageTheme, useTheme } from '../context/theme';

type Props = {};

const Footer = (props: Props) => {
  const theme = useTheme();
  const { toggleTheme } = useManageTheme();

  const Icon = theme === 'light' ? IoSunnyOutline : IoMoonOutline;

  return (
    <div className={'Footer'}>
      <div className={'poweredBy'}>
        Powered by{' '}
        <a href={'https://anilist.co'} target={'_blank'} rel={'noreferrer'}>
          Anilist
        </a>
      </div>
      <Icon className={'toggleThemeButton'} onClick={toggleTheme} />
      <div className={'shortcutLink'}>
        <a
          href={'https://www.icloud.com/shortcuts/334f676de6194ed8ac2b404ff0b30711'}
          target={'_blank'}
          rel={'noreferrer'}
        >
          Shortcut
        </a>
      </div>
    </div>
  );
};

export default Footer;
