import React from 'react';

import './Footer.css';
import useManageTheme from '../hooks/useManageTheme';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {};

const Footer = (props: Props) => {
  const { theme, toggleTheme } = useManageTheme();

  return (
    <div className={'Footer'}>
      <div className={'poweredBy'}>
        Powered by{' '}
        <a href={'https://anilist.co'} target={'_blank'} rel={'noreferrer'}>
          Anilist
        </a>
      </div>
      <FontAwesomeIcon
        className={'toggleThemeButton'}
        icon={theme === 'light' ? faSun : faMoon}
        onClick={toggleTheme}
      />
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
