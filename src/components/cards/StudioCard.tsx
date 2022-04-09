import React, { useCallback } from 'react';
import CopyUrl from '../CopyUrl';

import './shared.css';
import { searchAnilist_studios_results } from '../../graphql/types/searchAnilist';

type Props = {
  studio: searchAnilist_studios_results;
};

const StudioCard = (props: Props) => {
  const { studio } = props;
  const { name, siteUrl } = studio;

  const title = name;

  const handleOnClick = useCallback(() => {
    if (siteUrl) window.open(siteUrl, '_blank');
  }, [siteUrl]);

  return (
    <div className={'Card StudioCard'} onClick={handleOnClick}>
      <div className={'cardDetails'}>
        <div>{title && <div className={'cardTitle'}>{title}</div>}</div>
        {siteUrl && <CopyUrl url={siteUrl} />}
      </div>
    </div>
  );
};

export default StudioCard;
