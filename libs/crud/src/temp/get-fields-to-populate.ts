import { logger } from '@mikro-orm/nestjs';
import { FieldNode, FragmentSpreadNode, SelectionNode } from 'graphql/language';
import { Type } from '@nestjs/common';
import { RequestContext } from '@mikro-orm/core';
import { GraphQLResolveInfo } from 'graphql/type';

// import { InvalidContextException } from '../../exceptions';

export function getFieldsToPopulate<T>(
  info: GraphQLResolveInfo,
  type: Type<T>,
  debug = false,
): any[] {
  const selection: string[] = [];
  getSubselection(
    info,
    undefined,
    info.fieldNodes[0]?.selectionSet?.selections || [],
    selection,
    type.name,
  );
  log(`Final populate set: ${JSON.stringify(selection, null, 2)}`);
  return [...new Set(selection)];

  /* FUNCTION DECLARATIONS */
  function getSubselection(
    info: GraphQLResolveInfo,
    parent: string | undefined,
    nodes: readonly SelectionNode[],
    selection: string[],
    typeName: string,
  ) {
    const em = RequestContext.getEntityManager();
    if (!em) {
      throw new Error(`MikroORM RequestContext is not available!`);
    }

    const currentEntityProperties = em.getMetadata().get(typeName).properties;

    nodes.forEach((field) => {
      if (field.kind === 'Field') {
        const fieldNode = field as FieldNode;
        if (fieldNode.selectionSet === undefined) {
          addPath(parent, field);
        } else {
          addPath(parent, field);
          const nestedType = currentEntityProperties[field.name.value];
          if (!nestedType?.targetMeta?.name) {
            log(
              `Skipping property ${joinPath(
                parent,
                field.name.value,
              )} because it is not know property of entity ${typeName}`,
            );
            return;
          }
          getSubselection(
            info,
            joinPath(parent, field.name.value),
            fieldNode.selectionSet.selections,
            selection,
            nestedType.targetMeta.name,
          );
        }
      } else if (field.kind === 'FragmentSpread') {
        const fragmentSpreadNode = field as FragmentSpreadNode;
        const fragmentName = fragmentSpreadNode.name.value;
        const fragment = info.fragments[fragmentName];
        getSubselection(
          info,
          parent,
          fragment.selectionSet.selections,
          selection,
          typeName,
        );
      }
    });

    /* FUNCTION DECLARATIONS */
    function addPath(parent: string | undefined, fieldNode: FieldNode) {
      const propName = fieldNode.name.value;
      const newPath = joinPath(parent, propName);

      if (!Object.keys(currentEntityProperties).includes(propName)) {
        log(
          `Skipping property ${newPath} because it is not know property of entity ${typeName}`,
        );
        return;
      }
      selection.push(joinPath(parent, propName));
    }

    function joinPath(parent: string | undefined, currentNode: string): string {
      return parent ? `${parent}.${currentNode}` : currentNode;
    }
  }

  function log(message: string) {
    if (debug) {
      logger.debug(message);
    }
  }
}
