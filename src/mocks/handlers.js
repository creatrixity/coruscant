import { rest } from "msw";

console.debug(process.env.REACT_APP_API_URL);
export const handlers = [
  // Handles a GET /user request
  rest.get(`${process.env.REACT_APP_API_URL}/films`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            title: "A New Hope",
            episode_id: 4,
            opening_crawl:
              "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
            release_date: "1977-05-25",
            characters: ["https://swapi.dev/api/people/1/"],
          },
        ],
      })
    );
  }),
];
