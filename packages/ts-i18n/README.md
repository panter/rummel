This is a typesafe way how to autocomplete your translation keys in app

## Getting Started

```
-i: input
-o: output
```

For example

```bash
yarn ts-i18n -i ./public/locales/de -o ./@generated/resources.d.ts
```

Do not forget override translation function like this

```
import { ResourcesWithoutNamespace, ResourcesWithNamespace } from '../../@generated/resources';

declare module 'next-i18next' {
  export function useTranslation(ns: string): {
    t: (key: ResourcesWithoutNamespace) => string;
  };
  export function useTranslation(): {
    t: (key: ResourcesWithNamespace) => string;
  };
}

```
