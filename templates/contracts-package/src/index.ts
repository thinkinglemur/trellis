/**
 * @app/contracts — the sole coupling surface between modules (FMA P3).
 * Breaking changes: bump major, keep the previous interface available
 * behind a deprecation window. See VERSIONING.md.
 */
import { z } from 'zod';

export const CONTRACTS_VERSION = '0.1.0';

/** Health reporting — every module must answer. */
export type HealthStatus = 'ok' | 'degraded' | 'down';
export interface HealthReport {
  status: HealthStatus;
  details?: string;
}

/** Route registration — modules self-manage routing but declare surface. */
export type ActorRole = 'anonymous' | 'user' | 'admin' | 'system' | (string & {});
export interface ModuleRoute {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;            // must be prefixed with /<module-name>/
  description: string;
  /** Authorisation as contract: the role required to call this route. Contract tests assert refusal without it. */
  requires: ActorRole;
}

/** Data classification — inherited from DATA-MODEL.md. Classified fields never appear in event payloads or logs. */
export type DataClass = 'public' | 'personal' | 'financial' | 'secret';

/** Use-case funnel events (ODPD §12) — every module emits these for the use cases it serves. */
export const UseCaseEvent = z.object({
  type: z.enum(['started', 'step', 'completed', 'failed']),
  useCase: z.string().regex(/^UC-\d{3}$/),
  step: z.number().int().optional(),
  actorId: z.string().optional(),
  correlationId: z.string(),
  occurredAt: z.string().datetime(),
});
export type UseCaseEvent = z.infer<typeof UseCaseEvent>;

/** Event schemas — cross-module communication is events + contracts only. */
export const BaseEvent = z.object({
  id: z.string().uuid(),
  type: z.string(),        // '<module>.<entity>.<verb>' e.g. 'billing.invoice.created'
  occurredAt: z.string().datetime(),
  payload: z.unknown(),
});
export type BaseEvent = z.infer<typeof BaseEvent>;

/**
 * ModuleManifest — the interface every module MUST implement (FMA P2/P3).
 * The contract test suite in ./testing.ts asserts conformance mechanically.
 */
export interface ModuleManifest {
  /** kebab-case, matches directory name under modules/ */
  name: string;
  /** semver of the module itself */
  version: string;
  /** contracts version this module was built against */
  contractsVersion: string;
  /** declared public route surface — anything undeclared is private */
  routes: ModuleRoute[];
  /** event types this module emits */
  emits: string[];
  /** event types this module consumes */
  consumes: string[];
  /** use cases (UC-nnn) this module serves — drives funnel event emission and e2e mapping */
  useCases: string[];
  /** liveness/readiness answer */
  health(): Promise<HealthReport>;
  /** lifecycle hooks */
  init(): Promise<void>;
  shutdown(): Promise<void>;
}
