import type { HealthReport, ModuleManifest } from '@app/contracts';
import { CONTRACTS_VERSION } from '@app/contracts';
import { routes } from './routes';

export const manifest: ModuleManifest = {
  name: '__MODULE_NAME__',
  version: '0.1.0',
  contractsVersion: CONTRACTS_VERSION,
  routes,
  emits: [],
  consumes: [],
  useCases: [],
  components: [],
  async health(): Promise<HealthReport> {
    return { status: 'ok' };
  },
  async init(): Promise<void> {
    // wire models, subscriptions, etc.
  },
  async shutdown(): Promise<void> {
    // release resources
  },
};
