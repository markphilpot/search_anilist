import React, { useMemo } from 'react';
import { CircleMenu, CircleMenuItem, CircleButton } from '@mphilpot/react-circular-menu';
import { IoSunnyOutline, IoMoonOutline, IoInvertModeOutline } from 'react-icons/io5';

import { useManageTheme, useTheme } from '../context/theme';

import '@mphilpot/react-circular-menu/dist/style.css';
import './ThemeMenu.css';

type Props = {};

const ThemeMenu = (props: Props) => {
  const { theme } = useTheme();
  const { setTheme } = useManageTheme();

  const ToggleElement = useMemo(() => {
    if (theme === 'light') {
      return (
        <CircleButton size={2}>
          <div className={'themeIcon'}>
            <IoSunnyOutline size={'2em'} />
          </div>
        </CircleButton>
      );
    } else {
      return (
        <CircleButton size={2}>
          <div className={'themeIcon'}>
            <IoMoonOutline size={'2em'} />
          </div>
        </CircleButton>
      );
    }
  }, [theme]);

  return (
    <CircleMenu
      startAngle={-135}
      rotationAngle={90}
      itemSize={2}
      radius={3}
      /**
       * rotationAngleInclusive (default true)
       * Whether to include the ending angle in rotation because an
       * item at 360deg is the same as an item at 0deg if inclusive.
       * Leave this prop for angles other than 360deg unless otherwise desired.
       */
      rotationAngleInclusive={true}
      menuToggleElement={ToggleElement}
      closeOnItemClick={true}
    >
      <CircleMenuItem tooltipComponent={<div className={'tooltip'}>System</div>} onClick={() => setTheme(null)}>
        <div className={'themeIcon'}>
          <IoInvertModeOutline size={'2em'} />
        </div>
      </CircleMenuItem>
      <CircleMenuItem tooltipComponent={<div className={'tooltip'}>Light</div>} onClick={() => setTheme('light')}>
        <div className={'themeIcon'}>
          <IoSunnyOutline size={'2em'} />
        </div>
      </CircleMenuItem>
      <CircleMenuItem tooltipComponent={<div className={'tooltip'}>Dark</div>} onClick={() => setTheme('dark')}>
        <div className={'themeIcon'}>
          <IoMoonOutline size={'2em'} />
        </div>
      </CircleMenuItem>
    </CircleMenu>
  );
};

export default ThemeMenu;
