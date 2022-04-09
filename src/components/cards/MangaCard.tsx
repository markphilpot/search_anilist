import React, { useCallback } from 'react';
import CopyUrl from '../CopyUrl';

import './MangaCard.css';
import { searchAnilist_manga_results } from '../../graphql/types/searchAnilist';

type Props = {
  manga: searchAnilist_manga_results;
};

const MangaCard = (props: Props) => {
  const { manga } = props;
  const { coverImage, title: titleBlock, siteUrl } = manga;

  const imgSrc = coverImage?.large;
  const title = titleBlock?.userPreferred;

  const handleOnClick = useCallback(() => {
    if (siteUrl) window.open(siteUrl, '_blank');
  }, [siteUrl]);

  return (
    <div className={'MangaCard'} onClick={handleOnClick}>
      {imgSrc && <img src={imgSrc} alt={title ?? ''} />}
      <div>
        {title && <div>{title}</div>}
        {siteUrl && <CopyUrl url={siteUrl} />}
      </div>
    </div>
  );
};

export default MangaCard;