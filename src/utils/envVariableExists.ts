/**
 * Verify if a ENV variable is present
 * @param envVariable
 * @param envVarName
 */
export default function envVariableExists(
  envVariable: Optionnal<string>,
  envVarName: string,
): void {
  if (!envVariable) throw new Error(`${envVarName} is not present`)
}
