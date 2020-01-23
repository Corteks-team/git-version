const gitVersion = require('@corteks/gitversion').default
const { getFormattedVersion } = require('@corteks/gitversion')

gitVersion()
    .then((informations) => {
        console.log(informations)
    })
    .catch((err) => {
        console.error(err)
    })

getFormattedVersion()
    .then((version) => {
        console.log(version)
    })
    .catch((err) => {
        console.error(err)
    })
