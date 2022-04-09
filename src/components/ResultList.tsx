import React, { useCallback, useState } from 'react';

import './ResultList.css';

type Props = {
  title: string;
  children: React.ReactNode;
};

const ResultList = (props: Props) => {
  const { title, children } = props;

  const [show, setShow] = useState(true);

  const handleOnClick = useCallback(() => {
    setShow((x) => !x);
  }, []);

  return (
    <div className={'ResultList'}>
      <h1 onClick={handleOnClick}>{title}</h1>
      {show && <div className={'cardList'}>{children}</div>}
    </div>
  );
};

export default ResultList;
