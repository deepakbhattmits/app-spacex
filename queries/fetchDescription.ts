import { gql } from "@apollo/client";
export const FETCH_DESCRIPTION = gql`
  query missionDescription($id: ID!) {
    mission(id: $id) {
      id
      description
    }
  }
`;
