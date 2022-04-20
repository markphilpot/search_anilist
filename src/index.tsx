import React from 'react';
// @ts-ignore React 18
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { useWatchColorScheme, PrefersColorSchemeContext } from './context/theme';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
});

const container = document.getElementById('root');
const root = createRoot(container);

const Index = () => {
  const { colorScheme } = useWatchColorScheme();

  return (
    <PrefersColorSchemeContext.Provider value={colorScheme}>
      <App />
    </PrefersColorSchemeContext.Provider>
  );
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Index />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
