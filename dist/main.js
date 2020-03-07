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
const envVariableExists_1 = require("utils/envVariableExists");
const github_1 = require("utils/github");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            envVariableExists_1.default(process.env.github_token, 'github_token');
            envVariableExists_1.default(process.env.bitrise_app_slug, 'bitrise_app_slug');
            envVariableExists_1.default(process.env.bitrise_build_trigger_token, 'bitrise_build_trigger_token');
            github_1.shouldTriggerBuild();
        }
        catch (error) {
            core.setFailed(error.message);
        }
        // 1 recup params app_slug & build_trigger_token & github_token
        // check if we want to trigger the build //tbd
        // trigger the build
    });
}
run();
