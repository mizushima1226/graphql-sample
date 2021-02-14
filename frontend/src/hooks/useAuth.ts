import { useGithubAuthMutation } from '../generated/graphql';
import { userErrorHandling } from './userErrorHandling';

export const useAuth = () => {
  const { errorHandling } = userErrorHandling();

  const [githubAuth, githubAuthMutation] = useGithubAuthMutation({
    onError: (err) => errorHandling(err),
  });

  return { githubAuth, githubAuthMutation };
};
