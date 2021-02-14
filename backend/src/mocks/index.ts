export const users = [
  {
    githubLogin: "mHattrup",
    name: "Mike Hattrup"
  },
  {
    githubLogin: "gPlake",
    name: "Glen Plake"
  },
  {
    githubLogin: "sSchmidt",
    name: "Scot Schmidt"
  },
];

export const photos = [
  {
    id: "1",
    name: "Dropping the Heart Chute",
    description: "The heart chute is one of my favorite chutes",
    githubUser: "gPlake",
    createdAt: "3-28-1977",
    taggedUsers: [],
    postedBy: users.find(u => u.githubLogin === "1"),
  },
  {
    id: 2,
    name: "Enjoying the sunshine",
    githubUser: "sSchmidt",
    createdAt: "1-2-1985"
  },
  {
    id: 3,
    name: "Gunbarrel 25",
    description: "25 laps on gunbarrel today",
    githubUser: "sSchmidt",
    createdAt: "2018-04-15T19:09:57.308Z"
  },
];

export const tags = [
  {
    photoID: 1,
    userID: "gPlake"
  },
  {
    photoID: 2,
    userID: "sSchmidt"
  },
  {
    photoID: 1,
    userID: "mHattrup"
  },
  {
    photoID: 1,
    userID: "gPlake"
  },
]