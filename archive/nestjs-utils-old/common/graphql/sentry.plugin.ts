import { Plugin } from '@nestjs/apollo';

import * as Sentry from '@sentry/node';
import { GqlRequestContext } from './gql-request-context';
import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from '@apollo/server';

const INTROSPECTION_QUERY = 'IntrospectionQuery';

@Plugin()
export class SentryPlugin implements ApolloServerPlugin {
  async requestDidStart(
    context: GraphQLRequestContext<GqlRequestContext>,
  ): Promise<GraphQLRequestListener<GraphQLRequestContext<GqlRequestContext>>> {
    const request = context.request;
    if (request?.operationName === INTROSPECTION_QUERY) return {};

    const transaction = Sentry.startTransaction({
      op: 'gql',
      name: request?.operationName || 'GraphQLTransaction', // this will be the default name, unless the gql query has a name
    });
    return {
      async willSendResponse() {
        transaction.finish();
      },

      //This might impact performance so in case of problems disable it
      // async executionDidStart() {
      //   return {
      //     willResolveField({ info }: any) {
      //       // hook for each new resolver
      //       const span = transaction.startChild({
      //         op: 'resolver',
      //         description: `${info.parentType.name}.${info.fieldName}`,
      //       });
      //       return () => {
      //         // this will execute once the resolver is finished
      //         span.finish();
      //       };
      //     },
      //   };
      // },

      async didEncounterErrors(ctx) {
        // If we couldn't parse the operation, don't
        // do anything here
        if (!ctx.operation) {
          return;
        }

        for (const err of ctx.errors) {
          // Only report internal server errors,
          // all errors extending ApolloError should be user-facing

          // Add scoped report details and send to Sentry
          Sentry.withScope((scope) => {
            // Annotate whether failing operation was query/mutation/subscription
            scope.setTag('kind', ctx.operation?.kind);
            // Log query and variables as extras
            // (make sure to strip out sensitive data!)
            scope.setExtra('query', request.query);
            scope.setExtra('variables', request.variables);
            if (err.path) {
              // We can also add the path as breadcrumb
              scope.addBreadcrumb({
                category: 'query-path',
                message: err.path.join(' > '),
                level: 'debug',
              });
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            //todo: fix user prop
            Sentry.captureException(err, { user: request.user });
          });
        }
      },
    };
  }
}
