import React from 'react';

import './ResultList.css';

type Props = {
  title: string;
  children: React.ReactNode;
};

const ResultList = (props: Props) => {
  const { title, children } = props;

  return (
    <div className={'ResultList'}>
      <h2 id={title}>{title}</h2>
      <div className={'cardList'}>{children}</div>
    </div>
  );
};

export default ResultList;
