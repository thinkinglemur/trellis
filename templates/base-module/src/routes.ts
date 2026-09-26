import type { ModuleRoute } from '@app/contracts';

/** Declared public surface — anything not listed here is private. */
export const routes: ModuleRoute[] = [
  { method: 'GET', path: '/__MODULE_NAME__/health', description: 'Module health', requires: 'anonymous' },
];

// Handler implementations live here (framework wiring happens in the host app
// via the manifest — the module never mounts itself globally).
