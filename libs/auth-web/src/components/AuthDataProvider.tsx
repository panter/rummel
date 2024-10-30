import { AnyAbility, defineAbility, InferSubjects } from '@casl/ability';
import { createContext, PropsWithChildren, Suspense } from 'react';
import { OperationVariables, useQuery } from '@apollo/client';
import { get } from 'lodash';
import dynamic from 'next/dynamic';
import { AuthStrategy } from './AuthProvider';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

const FirebaseAuthWatcher = dynamic(
  () =>
    import('./firebase/FirebaseProvider').then(
      (mod) => mod.FirebaseAuthWatcher,
    ),
  {
    ssr: false,
  },
);

enum CrudPermissionAction {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

type PermissionAction = CrudPermissionAction | string;

type PermissionCondition = {
  [key: string]: any;
};

type CaslPermission<C = any> = {
  action: PermissionAction;
  subject: InferSubjects<C> | 'all';
  condition?: PermissionCondition;
};

type AuthState<UserIdentity> = {
  user: UserIdentity | null;
  isAuthenticated: boolean;
  ability: AnyAbility;
};

const emptyAbility = defineAbility((_) => {});
const initialAuthState: AuthState<null> = {
  user: null,
  isAuthenticated: false,
  ability: emptyAbility,
};

export const AuthContext = createContext<AuthState<any>>(initialAuthState);

export function AuthDataProvider<TData, TVariables extends OperationVariables>({
  children,
  authStrategy,
  query,
  parseData,
}: PropsWithChildren<{
  query: TypedDocumentNode<TData, TVariables>;
  parseData: (result: TData) => any;
  authStrategy: AuthStrategy;
}>) {
  const { data, error } = useQuery(query, {
    fetchPolicy: 'cache-and-network',
  });

  if (data === undefined && !error) {
    return null;
  }

  return (
    <>
      {authStrategy === 'firebase' ? (
        <Suspense fallback={null}>
          <FirebaseAuthWatcher />
        </Suspense>
      ) : null}

      <AuthContext.Provider
        value={
          data === undefined
            ? initialAuthState
            : {
                user: parseData(data),
                isAuthenticated: Boolean(parseData(data)),
                ability: defineAbility((can) => {
                  return parseData(data)?.myPermissions?.map(
                    (p: CaslPermission) => {
                      can(
                        p.action,
                        p.subject,
                        parsePermissionCondition(p.condition, {
                          id: parseData(data)?.id,
                        }),
                      );
                    },
                  );
                }),
              }
        }
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

const parsePermissionCondition = (
  condition: any,
  variables: Record<string, any>,
): PermissionCondition | null => {
  if (!condition) return null;
  const parsedCondition: Record<string, any> = {};
  for (const [key, rawValue] of Object.entries(condition)) {
    if (rawValue !== null && typeof rawValue === 'object') {
      parsedCondition[key] = parsePermissionCondition(rawValue, variables);
      continue;
    }
    if (typeof rawValue !== 'string') {
      parsedCondition[key] = rawValue;
      continue;
    }
    // find placeholder "${}""
    const matches = /^\${([a-zA-Z0-9.]+)}$/.exec(rawValue);
    if (!matches) {
      parsedCondition[key] = rawValue;
      continue;
    }
    const value = get(variables, matches[1]);
    if (typeof value === 'undefined') {
      throw new ReferenceError(`Variable ${matches[1]} is not defined`);
    }
    parsedCondition[key] = value;
  }
  return parsedCondition;
};
