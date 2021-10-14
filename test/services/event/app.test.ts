import app from '../../../src/app';

describe('\'event/app\' service', () => {
  it('registered the service', () => {
    const service = app.service('event/app');
    expect(service).toBeTruthy();
  });
});
