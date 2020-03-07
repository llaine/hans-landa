"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
function triggerBuild({ bitriseBuildTriggerToken, bitriseAppSlug, bitriseWorkflow, branchName, commitHash, pullRequestId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Triggering Bitrise workflow ${bitriseWorkflow} on branch ${branchName} for app slug ${bitriseAppSlug}...`);
        return axios_1.default.post(`https://app.bitrise.io/app/${bitriseAppSlug}/build/start.json`, {
            hook_info: {
                type: 'bitrise',
                build_trigger_token: bitriseBuildTriggerToken,
            },
            build_params: {
                branch: branchName,
                workflow_id: bitriseWorkflow,
                commit_hash: commitHash,
                pull_request_id: pullRequestId,
            },
            triggered_by: 'curl',
        }).then(result => {
            const data = result.data;
            console.log(`Build url: ${data.build_url}`);
            return data;
        });
    });
}
exports.triggerBuild = triggerBuild;
