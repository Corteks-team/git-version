This package extract informations from your git repository to help you generate version number dynamically.

Inspired by: https://github.com/smessmer/gitversion

Usage:
`yarn install @corteks/gitversion`

```typescript
import gitVersion from '@corteks/gitversion'

gitVersion()
    .then((informations) => {
        console.log(informations)
    })
    .catch((err) => {
        console.error(err)
    })
```

```Javascript
const gitVersion = require('@corteks/gitversion').default

gitVersion()
    .then((informations) => {
        console.log(informations)
    })
    .catch((err) => {
        console.error(err)
    })
```

This ouputs:
```javascript
{
    COMMITS_SINCE_TAG: 22,
    CURRENT_BRANCH: 'master',
    CURRENT_COMMIT_ID:'c1a78a93f8e1735cf1ac86a218b973cc654fe482',
    CURRENT_COMMIT_SHORT_ID: 'c1a78a9',
    LAST_TAG_NAME: 1.2.7,
    MODIFIED_SINCE_COMMIT: true
}
```

There is also a default format directly accessible via:
```typescipt
import { getFormattedVersion } from '@corteks/gitversion';

getFormattedVersion()
    .then((version) => {
        console.log(version);
    })
    .catch((err) => {
        console.error(err);
    });
```
