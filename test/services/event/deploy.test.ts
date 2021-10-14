import app from '../../../src/app';

describe('\'event/deploy\' service', () => {
  it('registered the service', () => {
    const service = app.service('event/deploy');
    expect(service).toBeTruthy();
  });
});
