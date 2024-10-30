import { PropsWithChildren, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { AuthStrategy } from './AuthProvider';

const FirebaseProvider = dynamic(
  () =>
    import('./firebase/FirebaseProvider').then((mod) => mod.FirebaseProvider),
  {
    ssr: false,
  },
);

export const AuthTokenProvider: React.FC<
  PropsWithChildren<{ authStrategy: AuthStrategy }>
> = ({ authStrategy, children }) => {
  return authStrategy === 'firebase' ? (
    <Suspense fallback={null}>
      <FirebaseProvider>{children}</FirebaseProvider>
    </Suspense>
  ) : (
    children
  );
};
