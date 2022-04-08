/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MediaType, MediaFormat } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchAnilist
// ====================================================

export interface searchAnilist_anime_pageInfo {
  __typename: "PageInfo";
  total: number | null;
}

export interface searchAnilist_anime_results_title {
  __typename: "MediaTitle";
  userPreferred: string | null;
}

export interface searchAnilist_anime_results_coverImage {
  __typename: "MediaCoverImage";
  large: string | null;
}

export interface searchAnilist_anime_results_startDate {
  __typename: "FuzzyDate";
  year: number | null;
}

export interface searchAnilist_anime_results {
  __typename: "Media";
  id: number;
  title: searchAnilist_anime_results_title | null;
  coverImage: searchAnilist_anime_results_coverImage | null;
  type: MediaType | null;
  format: MediaFormat | null;
  isLicensed: boolean | null;
  startDate: searchAnilist_anime_results_startDate | null;
  siteUrl: string | null;
}

export interface searchAnilist_anime {
  __typename: "Page";
  pageInfo: searchAnilist_anime_pageInfo | null;
  results: (searchAnilist_anime_results | null)[] | null;
}

export interface searchAnilist_manga_pageInfo {
  __typename: "PageInfo";
  total: number | null;
}

export interface searchAnilist_manga_results_title {
  __typename: "MediaTitle";
  userPreferred: string | null;
}

export interface searchAnilist_manga_results_coverImage {
  __typename: "MediaCoverImage";
  large: string | null;
}

export interface searchAnilist_manga_results_startDate {
  __typename: "FuzzyDate";
  year: number | null;
}

export interface searchAnilist_manga_results {
  __typename: "Media";
  id: number;
  title: searchAnilist_manga_results_title | null;
  coverImage: searchAnilist_manga_results_coverImage | null;
  type: MediaType | null;
  format: MediaFormat | null;
  bannerImage: string | null;
  isLicensed: boolean | null;
  startDate: searchAnilist_manga_results_startDate | null;
  siteUrl: string | null;
}

export interface searchAnilist_manga {
  __typename: "Page";
  pageInfo: searchAnilist_manga_pageInfo | null;
  results: (searchAnilist_manga_results | null)[] | null;
}

export interface searchAnilist_characters_pageInfo {
  __typename: "PageInfo";
  total: number | null;
}

export interface searchAnilist_characters_results_name {
  __typename: "CharacterName";
  userPreferred: string | null;
}

export interface searchAnilist_characters_results_image {
  __typename: "CharacterImage";
  large: string | null;
}

export interface searchAnilist_characters_results {
  __typename: "Character";
  id: number;
  name: searchAnilist_characters_results_name | null;
  image: searchAnilist_characters_results_image | null;
  siteUrl: string | null;
}

export interface searchAnilist_characters {
  __typename: "Page";
  pageInfo: searchAnilist_characters_pageInfo | null;
  results: (searchAnilist_characters_results | null)[] | null;
}

export interface searchAnilist_staff_pageInfo {
  __typename: "PageInfo";
  total: number | null;
}

export interface searchAnilist_staff_results_name {
  __typename: "StaffName";
  userPreferred: string | null;
}

export interface searchAnilist_staff_results_image {
  __typename: "StaffImage";
  large: string | null;
}

export interface searchAnilist_staff_results {
  __typename: "Staff";
  id: number;
  primaryOccupations: (string | null)[] | null;
  name: searchAnilist_staff_results_name | null;
  image: searchAnilist_staff_results_image | null;
  siteUrl: string | null;
}

export interface searchAnilist_staff {
  __typename: "Page";
  pageInfo: searchAnilist_staff_pageInfo | null;
  results: (searchAnilist_staff_results | null)[] | null;
}

export interface searchAnilist_studios_pageInfo {
  __typename: "PageInfo";
  total: number | null;
}

export interface searchAnilist_studios_results {
  __typename: "Studio";
  id: number;
  name: string;
  siteUrl: string | null;
}

export interface searchAnilist_studios {
  __typename: "Page";
  pageInfo: searchAnilist_studios_pageInfo | null;
  results: (searchAnilist_studios_results | null)[] | null;
}

export interface searchAnilist {
  anime: searchAnilist_anime | null;
  manga: searchAnilist_manga | null;
  characters: searchAnilist_characters | null;
  staff: searchAnilist_staff | null;
  studios: searchAnilist_studios | null;
}

export interface searchAnilistVariables {
  search?: string | null;
  perPage?: number | null;
}
