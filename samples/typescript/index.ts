import gitVersion, { getFormattedVersion } from '@corteks/gitversion';

gitVersion()
    .then((information) => {
        console.log(information);
    })
    .catch((err) => {
        console.error(err);
    });

getFormattedVersion()
    .then((version) => {
        console.log(version);
    })
    .catch((err) => {
        console.error(err);
    });
