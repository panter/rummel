import { defaultNS } from '../lib/i18n';
import {
  ResourcesWithoutNamespace,
  ResourcesWithNamespace,
} from './resources';

declare module 'next-i18next' {
  export function useTranslation(ns: string): {
    t: (key: ResourcesWithoutNamespace) => string;
  };
  export function useTranslation(): {
    t: (key: ResourcesWithNamespace) => string;
  };
}
