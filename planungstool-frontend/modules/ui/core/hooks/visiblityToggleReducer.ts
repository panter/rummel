import { useCallback, useReducer } from 'react';
import { exhaust } from '../../core/utils/exhaust';

/**
 * Reducer for a visible state, to be used in "useReducer" hooks.
 * It handles the tipical show / hide case that can be used in multiple scenarios.
 *
 */
export const visibilityToggleReducer = (
  state: boolean,
  action: 'show' | 'hide' | 'toggle',
) => {
  switch (action) {
    case 'show':
      return true;
    case 'hide':
      return false;
    case 'toggle':
      return !state;
    default:
      return exhaust(action);
  }
};

export const useVisibilityReducer = (initState?: boolean) => {
  const [state, dispatcher] = useReducer(
    visibilityToggleReducer,
    Boolean(initState),
  );
  const show = useCallback(() => dispatcher('show'), []);
  const hide = useCallback(() => dispatcher('hide'), []);
  const toggle = useCallback(() => dispatcher('toggle'), []);

  return { state, show, hide, toggle, dispatcher };
};
