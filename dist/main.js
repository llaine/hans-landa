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
const core = require("@actions/core");
const bitrise_utils_1 = require("./utils/bitrise-utils");
const github_1 = require("@actions/github");
function run() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bitriseAppSlug = core.getInput('bitrise_app_slug');
            const bitriseBuildTriggerToken = core.getInput('bitrise_build_trigger_token');
            const bitriseWorkflow = core.getInput('bitrise_workflow');
            let branchName = github_1.context.ref.slice(11);
            let commitHash = github_1.context.sha;
            if (github_1.context.payload.pull_request) {
                branchName = github_1.context.payload.pull_request.head.ref;
                commitHash = github_1.context.payload.pull_request.sha;
            }
            bitrise_utils_1.triggerBuild({
                bitriseAppSlug,
                bitriseWorkflow,
                bitriseBuildTriggerToken,
                branchName,
                commitHash,
                pullRequestId: (_a = github_1.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.number,
            });
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
