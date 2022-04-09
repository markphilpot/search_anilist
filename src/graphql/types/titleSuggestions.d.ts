/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: titleSuggestions
// ====================================================

export interface titleSuggestions_Page_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean | null;
}

export interface titleSuggestions_Page_mediaList_media_title {
  __typename: "MediaTitle";
  userPreferred: string | null;
}

export interface titleSuggestions_Page_mediaList_media {
  __typename: "Media";
  title: titleSuggestions_Page_mediaList_media_title | null;
}

export interface titleSuggestions_Page_mediaList {
  __typename: "MediaList";
  media: titleSuggestions_Page_mediaList_media | null;
}

export interface titleSuggestions_Page {
  __typename: "Page";
  pageInfo: titleSuggestions_Page_pageInfo | null;
  mediaList: (titleSuggestions_Page_mediaList | null)[] | null;
}

export interface titleSuggestions {
  Page: titleSuggestions_Page | null;
}

export interface titleSuggestionsVariables {
  perPage?: number | null;
  page?: number | null;
}
