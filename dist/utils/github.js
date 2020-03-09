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
const github_1 = require("@actions/github");
function shouldTriggerBuild() {
    return __awaiter(this, void 0, void 0, function* () {
        const octokit = new github_1.GitHub('503d8295502e1b9ec9b88496c436c3d494bcdd55');
        const { repo: { owner, repo }, payload, } = github_1.context;
        if (!payload.pull_request)
            return true;
        const pull_number = payload.pull_request.number;
        const pr = yield octokit.pulls.listReviews({
            owner,
            repo,
            pull_number,
        });
        console.log(pr.data.filter(pr => pr.state === ''));
        return true;
    });
}
exports.shouldTriggerBuild = shouldTriggerBuild;
