import React from 'react';

import './Footer.css';

type Props = {
  children: React.ReactNode;
};

const Footer = (props: Props) => {
  const { children } = props;

  return (
    <div className={'Footer'}>
      <div>
        Powered by <a href={'https://anilist.co'}>Anilist</a>
      </div>
      {children}
    </div>
  );
};

export default Footer;
