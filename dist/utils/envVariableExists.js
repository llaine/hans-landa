"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Verify if a ENV variable is present
 * @param envVariable
 * @param envVarName
 */
function envVariableExists(envVariable, envVarName) {
    if (!envVariable)
        throw new Error(`${envVarName} is not present`);
}
exports.default = envVariableExists;
