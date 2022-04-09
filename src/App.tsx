import React, { KeyboardEventHandler, useCallback, useRef, useState } from 'react';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { useLocalStorage } from 'react-use';
import { empty, all, not } from 'ramda';
import { useQuery } from '@apollo/client';
import { useSearchParam } from 'react-use';
import { searchAnilist } from './graphql/search';
import { searchAnilist as searchAnilistData, searchAnilistVariables } from './graphql/types/searchAnilist';
import AnimeCard from './components/cards/AnimeCard';

import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './components/Footer';
import MangaCard from './components/cards/MangaCard';

import '@fontsource/zen-old-mincho/400.css';
import './App.css';

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
      perPage: 7,
    },
    skip: !query,
  });

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback((event) => {
    if (event.key === 'Enter') {
      const value = inputRef.current?.value ?? '';
      setQuery(value);
    }
  }, []);

  const handleOnSubmit = useCallback(() => {
    const value = inputRef.current?.value ?? '';
    setQuery(value);
  }, []);

  const animeResults = data?.anime?.results ?? [];
  const mangaResults = data?.manga?.results ?? [];

  const noResults = all((x) => x.length === 0, [animeResults, mangaResults]);

  return (
    <div className="App" data-theme={theme}>
      <div className={`spacer${!noResults ? ' spacer-collapse' : ''}`} />
      <div className={'logo'}>何 何</div>
      <div>
        <input
          type={'text'}
          defaultValue={query}
          ref={inputRef}
          onKeyDown={handleKeyDown}
          placeholder={'Search Anime, Manga, Characters, Staff, & Studios'}
        />
        <button onClick={handleOnSubmit}>Search</button>
        <FontAwesomeIcon icon={theme === 'light' ? faSun : faMoon} onClick={toggleTheme} />
      </div>
      <div className={`contents${!noResults ? ' contents-shown' : ''}`}>
        {animeResults.length > 0 && (
          <div>
            <h1>Anime</h1>
            <div className={'results-list'}>
              {animeResults.map((result) => result && <AnimeCard key={result.id} anime={result} />)}
            </div>
          </div>
        )}
        {mangaResults.length > 0 && (
          <div>
            <h1>Manga</h1>
            <div className={'results-list'}>
              {mangaResults.map((result) => result && <MangaCard key={result.id} manga={result} />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
      <ToastContainer transition={Slide} />
    </div>
  );
}

export default App;
