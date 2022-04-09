import React, { useCallback } from 'react';
import CopyUrl from '../CopyUrl';

import './shared.css';
import { searchAnilist_staff_results } from '../../graphql/types/searchAnilist';

type Props = {
  staff: searchAnilist_staff_results;
};

const StaffCard = (props: Props) => {
  const { staff } = props;
  const { image, name, primaryOccupations, siteUrl } = staff;

  const imgSrc = image?.large;
  const title = name?.userPreferred;

  const handleOnClick = useCallback(() => {
    if (siteUrl) window.open(siteUrl, '_blank');
  }, [siteUrl]);

  return (
    <div className={'Card StaffCard'} onClick={handleOnClick}>
      {imgSrc && <img className={'cardImage'} src={imgSrc} alt={title ?? ''} />}
      <div className={'cardDetails'}>
        <div>
          {title && <div className={'cardTitle'}>{title}</div>}
          {primaryOccupations && <div className={'cardMeta'}>{primaryOccupations.join(', ')}</div>}
        </div>
        {siteUrl && <CopyUrl url={siteUrl} />}
      </div>
    </div>
  );
};

export default StaffCard;
