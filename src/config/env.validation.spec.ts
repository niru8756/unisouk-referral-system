import 'reflect-metadata';
import { validateEnv } from './env.validation.js';

describe('validateEnv', () => {
  const databaseUrl = 'postgresql://user:pass@localhost:5432/db';

  it('applies defaults and converts PORT to a number', () => {
    expect(validateEnv({ DATABASE_URL: databaseUrl })).toMatchObject({
      NODE_ENV: 'development',
      PORT: 3000,
    });
    expect(validateEnv({ DATABASE_URL: databaseUrl, PORT: '8080' }).PORT).toBe(
      8080,
    );
  });

  it('rejects missing DATABASE_URL', () => {
    expect(() => validateEnv({})).toThrow(/DATABASE_URL/);
  });

  it('rejects an invalid NODE_ENV', () => {
    expect(() =>
      validateEnv({ DATABASE_URL: databaseUrl, NODE_ENV: 'staging' }),
    ).toThrow(/NODE_ENV/);
  });
});
