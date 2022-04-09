import React, { KeyboardEventHandler, useCallback, useRef, useState } from 'react';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { useLocalStorage } from 'react-use';
import { all } from 'ramda';
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
import classNames from 'classnames';
import ResultList from './components/ResultList';

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

  const handleOnChange = useCallback((event) => {
    const value = event.target.value;
    if (value.length === 0) {
      setQuery('');
    }
  }, []);

  const animeResults = data?.anime?.results ?? [];
  const mangaResults = data?.manga?.results ?? [];

  const noResults = all((x) => x.length === 0, [animeResults, mangaResults]);

  return (
    <div className="App" data-theme={theme}>
      <div
        className={classNames({
          'spacer': true,
          'spacer-collapse': !noResults,
        })}
      />

      <div className={'logo'}>何 何</div>

      <div className={'SearchWrapper'}>
        <input
          className={'searchInput'}
          type={'search'}
          defaultValue={query}
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
          placeholder={'Sound Euphonium'}
        />
        <button className={'searchButton'} onClick={handleOnSubmit}>
          Search
        </button>
      </div>

      <div
        className={classNames({
          'contents': true,
          'contents-shown': !noResults,
        })}
      >
        {animeResults.length > 0 && (
          <ResultList title={'Anime'}>
            {animeResults.map((result) => result && <AnimeCard key={result.id} anime={result} />)}
          </ResultList>
        )}
        {mangaResults.length > 0 && (
          <ResultList title={'Manga'}>
            {mangaResults.map((result) => result && <MangaCard key={result.id} manga={result} />)}
          </ResultList>
        )}
      </div>

      <Footer>
        <FontAwesomeIcon
          className={'toggleThemeButton'}
          icon={theme === 'light' ? faSun : faMoon}
          onClick={toggleTheme}
        />
      </Footer>
      <ToastContainer transition={Slide} />
    </div>
  );
}

export default App;
