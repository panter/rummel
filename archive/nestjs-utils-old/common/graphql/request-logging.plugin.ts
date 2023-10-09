import { Plugin } from '@nestjs/apollo';
import { performance } from 'perf_hooks';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { GqlRequestContext } from './gql-request-context';
import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from '@apollo/server';

const INTROSPECTION_QUERY = 'IntrospectionQuery';

@Plugin()
export class RequestLoggingPlugin implements ApolloServerPlugin {
  private readonly logger = new Logger(RequestLoggingPlugin.name);
  private readonly loggingEnabled: boolean;

  constructor(private readonly config: ConfigService) {
    this.loggingEnabled = this.config.get('LOG_GQL_QUERY', 'false') === 'true';
  }

  async requestDidStart(
    context: GraphQLRequestContext<GqlRequestContext>,
  ): Promise<GraphQLRequestListener<GraphQLRequestContext<GqlRequestContext>>> {
    const logger = this.logger;
    const loggingEnabled = this.loggingEnabled;

    if (context?.request?.operationName === INTROSPECTION_QUERY) return {};
    // const operationName = context?.request?.operationName || 'Unnamed';

    const start = performance.now();
    return {
      async didEncounterErrors(ctx) {
        ctx.errors.forEach((e) => {
          //log only field or "internal" errors here, query and mutations are handled separately
          //my observation is that "internal" errors doesn't have original error
          // if ((e.path && e.path?.length > 1) || !e.originalError) {
          logger.error(e, e.stack);
          // }
        });
      },

      async willSendResponse({ response }) {
        const stop = performance.now();
        const duration = Number((stop - start) / 1000).toFixed(3);
        const errors =
          response.body.kind === 'single' && response.body.singleResult.errors;
        if (errors && errors.length > 0) {
          logger.warn(
            ` Request completed with errors(${errors.length}) in ${duration}s.`,
          );
        } else {
          if (loggingEnabled) {
            logger.log(`Request completed successfully in ${duration}s.`);
          }
        }
      },
    };
  }
}
