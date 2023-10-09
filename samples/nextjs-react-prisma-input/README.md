## Translations

Translations are done using `@panter/transporter` with Airtable integration.

### Adding new keys to local file

1. pull latest translations from Airtable `yarn translations:pull` (so later push won't overwrite changes made by
   customers)
2. Add new key to `public/locales/[language]/translation.json`
3. push new version to Airtable `yarn translations:push`
