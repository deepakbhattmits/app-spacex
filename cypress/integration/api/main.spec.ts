/// <reference types="cypress"/>
describe("Main page", () => {
  it("GET request", () => {
    cy.request({
      method: "POST",
      url: "https://api.spacex.land/graphql/",
      body: {
        query: `
                query Launches {
                    launches(limit: 10) {
                    id
                    launch_date_utc
                    mission_name
                    mission_id
                    }
                }
                `,
      },
    })?.then((response) => {
      expect(response?.status)?.to?.be?.eq(200);
    });
  });
});
export {}
