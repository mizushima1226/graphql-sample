import fetch from "node-fetch";

// TODO type
const requestGithubToken = (credentials: any) => {
  return fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(credentials)
    }
  ).then(res => {
    return res.json();
  }).catch(error => {
    throw new Error(JSON.stringify(error));
  })
};

// TODO type
const requestGithubUserAccount = (token: string) => {
  return fetch(
    `https://api.github.com/user`,
    {
      method: 'GET',
      headers: {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": `token ${token}`
      }
    }
  ).then(res => {
    return res.json();
  }).catch(err => {
    throw new Error(JSON.stringify(err));
  })
};

export const authorizeWithGithub = async (credentials: any) => {
  const { access_token } = await requestGithubToken(credentials);
  const githubUser = await requestGithubUserAccount(access_token);
  return {...githubUser, access_token};
}