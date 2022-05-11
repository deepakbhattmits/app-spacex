import { gql } from "@apollo/client";
export const GET_LAUNCHES = gql`
  query Launches {
    launches(limit: 10) {
      id
      launch_date_utc
      mission_name
      mission_id
    }
  }
`;
