"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const core = require("@actions/core");
const github_1 = require("@actions/github");
function shouldTriggerBuild() {
    const isPrDraft = core.getInput('draft', { required: true }) === 'true';
    console.log('is PR draft ', isPrDraft);
    console.log(github_1.context.payload);
    return true;
}
exports.shouldTriggerBuild = shouldTriggerBuild;
