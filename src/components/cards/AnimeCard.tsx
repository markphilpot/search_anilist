import React, { useCallback } from 'react';
import CopyUrl from '../CopyUrl';

import './shared.css';
import './AnimeCard.css';
import { searchAnilist_anime_results } from '../../graphql/types/searchAnilist';
import { formatMediaFormat } from './utils';

type Props = {
  anime: searchAnilist_anime_results;
};

const AnimeCard = (props: Props) => {
  const { anime } = props;
  const { coverImage, title: titleBlock, siteUrl, startDate, format } = anime;

  const imgSrc = coverImage?.large;
  const title = titleBlock?.userPreferred;

  const handleOnClick = useCallback(() => {
    if (siteUrl) window.open(siteUrl, '_blank');
  }, [siteUrl]);

  return (
    <div className={'Card AnimeCard'} onClick={handleOnClick}>
      {imgSrc && <img className={'cardImage'} src={imgSrc} alt={title ?? ''} />}
      <div className={'cardDetails'}>
        <div>
          {title && <div className={'cardTitle'}>{title}</div>}
          <div className={'cardMeta'}>
            {startDate?.year} - {formatMediaFormat(format)}
          </div>
        </div>
        {siteUrl && <CopyUrl url={siteUrl} />}
      </div>
    </div>
  );
};

export default AnimeCard;
