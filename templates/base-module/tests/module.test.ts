import { describe, it, expect } from 'vitest';
import { manifest } from '../src/manifest';

describe('__MODULE_NAME__', () => {
  it('exposes at least a health route', () => {
    expect(manifest.routes.length).toBeGreaterThan(0);
  });
});
