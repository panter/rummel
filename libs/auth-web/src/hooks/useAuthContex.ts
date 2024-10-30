import { useContext } from 'react';
import { AuthContext } from '../components/AuthDataProvider';

class AuthContextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthContextError';
  }
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new AuthContextError(
      'useAuthContext must be used within an AuthProvider. Ensure that the component calling useAuthContext is wrapped in an AuthProvider component.',
    );
  }

  return context;
};
