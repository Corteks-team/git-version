import { exec } from 'child_process';

export async function getLatestTag(): Promise<string | null> {
    return new Promise((resolve, reject) => {
        exec('git describe --tags --abbrev=0', (err, stdout, stderr) => {
            if (err) {
                return resolve(null);
            }
            resolve(stdout.trim());
        });
    });
}

export async function getCommitsSinceTag(lastTag: string | null): Promise<number | null> {
    const tagName = lastTag ? lastTag + '..' : '';
    return new Promise((resolve, reject) => {
        exec(`git rev-list ${tagName}HEAD --count`, (err, stdout, stderr) => {
            if (err) {
                return resolve(null);
            }
            resolve(parseInt(stdout.trim(), 10));
        });
    });
}

export async function getCurrentCommitHash(): Promise<string | null> {
    return new Promise((resolve, reject) => {
        exec('git rev-parse HEAD', (err, stdout, stderr) => {
            if (err) {
                return resolve(null);
            }
            resolve(stdout.trim());
        });
    });
}

export async function hasUncommitedChanges(): Promise<boolean | null> {
    return new Promise((resolve, reject) => {
        exec('git diff-index --stat HEAD .', (err, stdout, stderr) => {
            if (err) { return resolve(null); }
            resolve(!!stdout);
        });
    });
}

export async function hasUntrackedFiles(): Promise<boolean | null> {
    return new Promise((resolve, reject) => {
        exec('git ls-files --exclude-standard --others', (err, stdout, stderr) => {
            if (err) { return resolve(null); }
            resolve(!!stdout);
        });
    });
}

export async function getCurrentBranch(): Promise<string | null> {
    return new Promise((resolve, reject) => {
        exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
            if (err) { return resolve(null); }
            resolve(stdout.trim());
        });
    });
}

export default async () => {
    const lastTag = await getLatestTag();
    const commitsSinceTag = await getCommitsSinceTag(lastTag);
    const currentCommitHash = await getCurrentCommitHash();
    const uncommitedChanges = (await Promise.all([hasUncommitedChanges(), hasUntrackedFiles()])).find((x) => x ? x : false);
    const currentBranch = await getCurrentBranch();
    return {
        COMMITS_SINCE_TAG: commitsSinceTag,
        CURRENT_BRANCH: currentBranch,
        CURRENT_COMMIT_ID: currentCommitHash,
        LAST_TAG_NAME: lastTag,
        MODIFIED_SINCE_COMMIT: uncommitedChanges,
    };
};
