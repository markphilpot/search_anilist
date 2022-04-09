import { gql } from '@apollo/client';

export const searchAnilist = gql`
  query searchAnilist($search: String, $perPage: Int = 3, $isAdult: Boolean = false) {
    anime: Page(perPage: $perPage) {
      pageInfo {
        total
      }
      results: media(type: ANIME, search: $search, isAdult: $isAdult) {
        id
        title {
          userPreferred
        }
        coverImage {
          large
        }
        type
        format
        isLicensed
        startDate {
          year
        }
        siteUrl
      }
    }
    manga: Page(perPage: $perPage) {
      pageInfo {
        total
      }
      results: media(type: MANGA, search: $search, isAdult: $isAdult) {
        id
        title {
          userPreferred
        }
        coverImage {
          large
        }
        type
        format
        isLicensed
        startDate {
          year
        }
        siteUrl
      }
    }
    characters: Page(perPage: $perPage) {
      pageInfo {
        total
      }
      results: characters(search: $search) {
        id
        name {
          userPreferred
        }
        image {
          large
        }
        siteUrl
      }
    }
    staff: Page(perPage: $perPage) {
      pageInfo {
        total
      }
      results: staff(search: $search) {
        id
        primaryOccupations
        name {
          userPreferred
        }
        image {
          large
        }
        siteUrl
      }
    }
    studios: Page(perPage: $perPage) {
      pageInfo {
        total
      }
      results: studios(search: $search) {
        id
        name
        siteUrl
      }
    }
  }
`;
