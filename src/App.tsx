import React, { ChangeEvent, KeyboardEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { all } from 'ramda';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { searchAnilist } from './graphql/search';
import { searchAnilist as searchAnilistData, searchAnilistVariables } from './graphql/types/searchAnilist';

// Fonts
import '@fontsource/zen-old-mincho/400.css';
import '@fontsource/lato';
import '@fontsource/lato/700.css';
import '@fontsource/source-sans-pro';

import './App.css';

import ResultList from './components/ResultList';
import Footer from './components/Footer';

import AnimeCard from './components/cards/AnimeCard';
import MangaCard from './components/cards/MangaCard';
import CharacterCard from './components/cards/CharacterCard';
import StaffCard from './components/cards/StaffCard';
import StudioCard from './components/cards/StudioCard';

import titleSuggestions from './assets/titles.json';
import useManageTheme from './hooks/useManageTheme';
import { IoSearchOutline } from 'react-icons/io5';

function App() {
  const { theme } = useManageTheme();

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const inputRef = useRef<HTMLInputElement>(null);

  const titleSuggestion = useMemo(() => {
    return titleSuggestions[Math.floor(titleSuggestions.length * Math.random())];
  }, []);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const { data } = useQuery<searchAnilistData, searchAnilistVariables>(searchAnilist, {
    variables: {
      search: query,
      perPage: 7,
    },
    skip: !query,
  });

  const handleHistoryChange = useCallback(
    (value: string) => {
      if (value) {
        setSearchParams({ q: value });
      } else {
        setSearchParams({});
      }
    },
    [setSearchParams]
  );

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        const value = inputRef.current?.value ?? '';
        setQuery(value);
        handleHistoryChange(value);
      }
    },
    [handleHistoryChange]
  );

  const handleOnSubmit = useCallback(() => {
    const value = inputRef.current?.value ?? '';
    setQuery(value);
    handleHistoryChange(value);
  }, [handleHistoryChange]);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value.length === 0) {
        setQuery('');
        handleHistoryChange('');
      }
    },
    [handleHistoryChange]
  );

  const animeResults = useMemo(() => data?.anime?.results ?? [], [data]);
  const mangaResults = useMemo(() => data?.manga?.results ?? [], [data]);
  const characterResults = useMemo(() => data?.characters?.results ?? [], [data]);
  const staffResults = useMemo(() => data?.staff?.results ?? [], [data]);
  const studioResults = useMemo(() => data?.studios?.results ?? [], [data]);

  const noResults = all(
    (x) => x.length === 0,
    [animeResults, mangaResults, characterResults, staffResults, studioResults]
  );

  const rows = useMemo(() => {
    const r = [];

    if (animeResults.length > 0)
      r.push({
        title: 'Anime',
        results: animeResults,
        components: animeResults.map((result) => result && <AnimeCard key={result.id} anime={result} />),
      });
    if (mangaResults.length > 0)
      r.push({
        title: 'Manga',
        results: mangaResults,
        components: mangaResults.map((result) => result && <MangaCard key={result.id} manga={result} />),
      });
    if (characterResults.length > 0)
      r.push({
        title: 'Characters',
        results: characterResults,
        components: characterResults.map((result) => result && <CharacterCard key={result.id} character={result} />),
      });
    if (staffResults.length > 0)
      r.push({
        title: 'Staff',
        results: staffResults,
        components: staffResults.map((result) => result && <StaffCard key={result.id} staff={result} />),
      });
    if (studioResults.length > 0)
      r.push({
        title: 'Studios',
        results: studioResults,
        components: studioResults.map((result) => result && <StudioCard key={result.id} studio={result} />),
      });

    return r;
  }, [animeResults, characterResults, mangaResults, staffResults, studioResults]);

  return (
    <div className="App" data-theme={theme}>
      <div
        className={classNames({
          'spacer': true,
          'spacer-collapse': !noResults,
        })}
      />

      <div
        className={classNames({
          'logo': true,
          'logoSmall': !noResults,
        })}
      >
        何 何
      </div>

      <div className={'SearchWrapper'}>
        <div className={'searchWrapperInner'}>
          <input
            className={classNames({
              'searchInput': true,
              'searchInputSmall': !noResults,
            })}
            type={'text'}
            defaultValue={query}
            ref={inputRef}
            onKeyDown={handleKeyDown}
            onChange={handleOnChange}
            placeholder={titleSuggestion}
          />
          <button
            className={classNames({
              'searchButton': true,
              'searchButtonSmall': !noResults,
            })}
            onClick={handleOnSubmit}
          >
            <IoSearchOutline />
          </button>
        </div>
      </div>

      <div className={'resultLinks'}>
        {rows
          .map((r) => <a href={`#${r.title}`}>{r.title}</a>)
          .reduce((acc: React.ReactNode[], r: React.ReactNode) => {
            return acc.length === 0 ? [r] : [...acc, ' · ', r];
          }, [])}
      </div>

      <div
        className={classNames({
          'contents': true,
          'contents-shown': !noResults,
        })}
      >
        {rows.map((r) => {
          return (
            <ResultList key={r.title} title={r.title}>
              {r.components}
            </ResultList>
          );
        })}
      </div>

      {/*<TitleSuggestionsUtil/>*/}

      <Footer />
      <ToastContainer transition={Slide} />
    </div>
  );
}

export default App;
