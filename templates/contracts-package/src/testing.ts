/**
 * Executable contract tests — run by every module's test:contract script.
 * This is the mechanism that lets small local models implement safely:
 * conformance is verified, not trusted (white paper §8.2).
 */
import { describe, it, expect } from 'vitest';
import type { EntityStateMachine, ModuleManifest } from './index';
import { assertTransition, InvariantViolation } from './index';
import { CONTRACTS_VERSION } from './index';

export function runTransitionTests<S extends string>(m: EntityStateMachine<S>): void {
  describe(`transitions: ${m.entity}`, () => {
    it('refuses every transition not in the allowed set (invariant refusal)', () => {
      for (const from of m.states) for (const to of m.states) {
        const allowed = m.transitions.some(([f, t]) => f === from && t === to);
        if (!allowed) expect(() => assertTransition(m, from, to, 'test')).toThrow(InvariantViolation);
      }
    });
    it('allows every declared transition', () => {
      for (const [from, to] of m.transitions) expect(() => assertTransition(m, from, to, 'test')).not.toThrow();
    });
  });
}

export function runContractTests(manifest: ModuleManifest): void {
  describe(`contract conformance: ${manifest.name}`, () => {
    it('has a kebab-case name', () => {
      expect(manifest.name).toMatch(/^[a-z][a-z0-9-]*$/);
    });
    it('declares the contracts version it was built against', () => {
      expect(manifest.contractsVersion.split('.')[0]).toBe(CONTRACTS_VERSION.split('.')[0]);
    });
    it('prefixes every route with its own namespace', () => {
      for (const r of manifest.routes) {
        expect(r.path.startsWith(`/${manifest.name}/`) || r.path === `/${manifest.name}`).toBe(true);
      }
    });
    it('declares a required role on every route (authorisation as contract)', () => {
      for (const r of manifest.routes) expect(r.requires).toBeTruthy();
    });
    it('declares the use cases it serves', () => {
      for (const uc of manifest.useCases) expect(uc).toMatch(/^UC-\d{3}$/);
    });
    it('names emitted events under its own namespace', () => {
      for (const e of manifest.emits) expect(e.startsWith(`${manifest.name}.`)).toBe(true);
    });
    it('answers health()', async () => {
      const h = await manifest.health();
      expect(['ok', 'degraded', 'down']).toContain(h.status);
    });
    it('initialises and shuts down cleanly', async () => {
      await expect(manifest.init()).resolves.not.toThrow();
      await expect(manifest.shutdown()).resolves.not.toThrow();
    });
  });
}
