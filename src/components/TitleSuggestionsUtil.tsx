import React, { useEffect, useState } from 'react';
import { ApolloClient, useApolloClient } from '@apollo/client';
import { titleSuggestions } from '../graphql/utils';
import { titleSuggestions as titleSuggestionsData, titleSuggestionsVariables } from '../graphql/types/titleSuggestions';

const fetchTitleList = async (apolloClient: ApolloClient<any>) => {
  let page = 1;
  let hasMore = true;
  let titles: string[] = [];

  while (hasMore) {
    const { data } = await apolloClient.query<titleSuggestionsData, titleSuggestionsVariables>({
      query: titleSuggestions,
      variables: {
        page,
      },
    });

    titles = [...titles, ...(data.Page?.mediaList ?? []).map((m) => m?.media?.title?.userPreferred ?? '')];

    page++;
    hasMore = data.Page?.pageInfo?.hasNextPage ?? false;
  }

  return new Set(titles);
};

const TitleSuggestionsUtil = () => {
  const [titles, setTitles] = useState<string[]>([]);
  const apolloClient = useApolloClient();

  useEffect(() => {
    fetchTitleList(apolloClient).then((set) => {
      setTitles(Array.from(set));
    });
    // onMount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (titles.length === 0) {
    return <div>Loading...</div>;
  }

  return <textarea>{JSON.stringify(titles)}</textarea>;
};

export default TitleSuggestionsUtil;
