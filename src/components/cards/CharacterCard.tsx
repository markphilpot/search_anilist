import React, { useCallback } from 'react';
import CopyUrl from '../CopyUrl';

import './shared.css';
import { searchAnilist_characters_results } from '../../graphql/types/searchAnilist';

type Props = {
  character: searchAnilist_characters_results;
};

const CharacterCard = (props: Props) => {
  const { character } = props;
  const { image, name, siteUrl } = character;

  const imgSrc = image?.large;
  const title = name?.userPreferred;

  const handleOnClick = useCallback(() => {
    if (siteUrl) window.open(siteUrl, '_blank');
  }, [siteUrl]);

  return (
    <div className={'Card CharacterCard'} onClick={handleOnClick}>
      {imgSrc && <img className={'cardImage'} src={imgSrc} alt={title ?? ''} />}
      <div className={'cardDetails'}>
        {title && <div className={'cardTitle'}>{title}</div>}
        {siteUrl && <CopyUrl url={siteUrl} />}
      </div>
    </div>
  );
};

export default CharacterCard;
