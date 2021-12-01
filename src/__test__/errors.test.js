import ConfigurationError from '../ConfigurationError';

describe('Configuration error', () => {
  it('is istance of Error', () => {
    const error = new ConfigurationError('message');
    expect(error).toBeInstanceOf(Error);
  });
  it('is named ConfigurationError', () => {
    const error = new ConfigurationError('message');
    expect(error.name).toBe('ConfigurationError');
  });
});
