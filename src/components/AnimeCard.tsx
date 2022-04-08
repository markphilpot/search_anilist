import React from 'react';
import CopyUrl from './CopyUrl';

import './AnimeCard.css';

type Props = {
  imgSrc: string | null | undefined;
  title: string | null | undefined;
  url: string | null | undefined;
};

const AnimeCard = (props: Props) => {
  const { imgSrc, title, url } = props;

  return (
    <div className={'AnimeCard'}>
      {imgSrc && <img src={imgSrc} alt={title ?? ''} />}
      {title && <div>{title}</div>}
      {url && <CopyUrl url={url} />}
    </div>
  );
};

export default AnimeCard;
