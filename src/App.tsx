import React, { KeyboardEventHandler, useCallback, useRef, useState } from 'react';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { useLocalStorage } from 'react-use';

import { useQuery } from '@apollo/client';
import { useSearchParam } from 'react-use';
import { searchAnilist } from './graphql/search';
import { searchAnilist as searchAnilistData, searchAnilistVariables } from './graphql/types/searchAnilist';
import AnimeCard from './components/AnimeCard';

import './App.css';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [setTheme, theme]);

  const q = useSearchParam('q');
  const [query, setQuery] = useState(q || '');

  const inputRef = useRef<HTMLInputElement>(null);

  const { data } = useQuery<searchAnilistData, searchAnilistVariables>(searchAnilist, {
    variables: {
      search: query,
      perPage: 8,
    },
    skip: !query,
  });

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback((event) => {
    if (event.key === 'Enter') {
      const value = inputRef.current?.value ?? '';
      setQuery(value);
    }
  }, []);

  return (
    <div className="App" data-theme={theme}>
      <div>
        <input type={'text'} defaultValue={query} ref={inputRef} onKeyDown={handleKeyDown} />
        <FontAwesomeIcon icon={theme === 'light' ? faSun : faMoon} onClick={toggleTheme} />
      </div>
      <div>
        <h1>Anime</h1>
        <div className={'results-list'}>
          {data?.anime?.results?.map((result) => (
            <AnimeCard
              key={result?.id}
              imgSrc={result?.coverImage?.large}
              title={result?.title?.userPreferred}
              url={result?.siteUrl}
            />
          ))}
        </div>
      </div>
      <ToastContainer transition={Slide} />
    </div>
  );
}

export default App;
