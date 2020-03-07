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
const github_1 = require("./utils/github");
const bitrise_utils_1 = require("./utils/bitrise-utils");
// import * as core from '@actions/core'
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            github_1.shouldTriggerBuild();
        }
        catch (error) {
            core.setFailed(error.message);
        }
        // 1 recup params app_slug & build_trigger_token & github_token
        // check if we want to trigger the build //tbd
        // trigger the build
        bitrise_utils_1.triggerBuild({
            bitriseAppSlug: 'ca04e0425716e1ce',
            bitriseWorkflow: 'primary',
            bitriseBuildTriggerToken: 'Gs7vZtsWEz-UZ_vNdNxDIA',
            branchName: 'implement-bitrise-utils',
            commitHash: 'fb96e1ed33612afb5190156fc1ce53922fd2609a',
            pullRequestId: 10,
        });
    });
}
run();
