import { useRouter } from 'next/router';
import { isArray } from 'lodash';

export function useQueryParams<T extends string>(params: T[]): Record<T, any> {
  const router = useRouter();
  const parsedParams: Record<string, string> = {};
  for (const param of params) {
    const paramValue = router.query[param];
    if (paramValue !== undefined) {
      parsedParams[param] = isArray(paramValue) ? paramValue[0] : paramValue;
    }
  }
  return parsedParams;
}
