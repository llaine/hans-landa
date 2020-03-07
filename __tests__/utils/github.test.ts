import { shouldTriggerBuild } from 'utils/github'

describe('Github service', () => {
  it('should return a boolean', () => {
    expect(shouldTriggerBuild()) .toBeTruthy();
  })
})