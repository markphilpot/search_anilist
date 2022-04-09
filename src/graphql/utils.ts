import { gql } from '@apollo/client';

export const titleSuggestions = gql`
  query titleSuggestions($perPage: Int = 50, $page: Int = 1) {
    Page(perPage: $perPage, page: $page) {
      pageInfo {
        hasNextPage
      }
      mediaList(userName: "mphilpot") {
        media {
          title {
            userPreferred
          }
        }
      }
    }
  }
`;
