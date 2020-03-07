"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const github_1 = require("@actions/github");
function shouldTriggerBuild() {
    // const octokit = new GitHub('503d8295502e1b9ec9b88496c436c3d494bcdd55')
    // eslint-disable-next-line no-empty-pattern
    const {} = github_1.context;
    console.log(github_1.context.payload.repository);
    // const pr = octokit.pulls.get({
    //   owner,
    //   repo,
    //   pull_number
    // });
    return true;
}
exports.shouldTriggerBuild = shouldTriggerBuild;
