import React, { MouseEventHandler, useCallback } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

type Props = {
  url: string;
};

const CopyUrl = (props: Props) => {
  const { url } = props;

  const handleOnCopy = useCallback(() => {
    toast('URL copied to clipboard', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);

  const squashClick: MouseEventHandler = useCallback((event) => {
    event.stopPropagation();
  }, []);

  return (
    <div onClick={squashClick}>
      <CopyToClipboard text={url} onCopy={handleOnCopy}>
        <span>
          <FontAwesomeIcon icon={faClipboard} />
        </span>
      </CopyToClipboard>
    </div>
  );
};

export default CopyUrl;
