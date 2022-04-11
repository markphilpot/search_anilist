import React, { MouseEventHandler, useCallback } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { IoClipboardOutline } from 'react-icons/io5';

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
          <IoClipboardOutline />
        </span>
      </CopyToClipboard>
    </div>
  );
};

export default CopyUrl;
