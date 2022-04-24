import React from 'react';

import './Footer.css';
import ThemeMenu from './ThemeMenu';

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className={'Footer'}>
      <div className={'poweredBy'}>
        Powered by{' '}
        <a href={'https://anilist.co'} target={'_blank'} rel={'noreferrer'}>
          Anilist
        </a>
      </div>
      <div className={'footerButton'}>
        <ThemeMenu />
      </div>
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
