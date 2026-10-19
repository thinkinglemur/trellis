/**
 * FMA boundary rules (P1/P3): a module may import only from itself,
 * @app/contracts, and approved third-party deps. Module-to-module
 * imports are a CI failure, not a convention.
 *
 * Drop into eslint.config.cjs (flat config) via:
 *   const fmaBoundaries = require('./eslint-boundaries.cjs');
 *   module.exports = [ ...yourConfig, ...fmaBoundaries ];
 */
const fs = require('fs');
const path = require('path');

const MODULES_DIR = path.join(__dirname, 'modules');
const moduleDirs = fs.existsSync(MODULES_DIR)
  ? fs.readdirSync(MODULES_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
  : [];

// Shell exception (ODPD §10.3): modules export components via ./ui; ONLY modules/shell may import them.
const SHELL = 'shell';

// For each module, forbid importing from every *other* module.
module.exports = moduleDirs.map((mod) => ({
  files: [`modules/${mod}/**/*.{ts,tsx}`],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          ...moduleDirs
            .filter((other) => other !== mod)
            .flatMap((other) => [
              ...(mod === SHELL
                ? [{ group: [`@modules/${other}`, `@modules/${other}/!(ui)`, `@modules/${other}/!(ui)/*`],
                     message: `FMA boundary: shell may import only @modules/${other}/ui.` }]
                : []),
              ...(mod === SHELL ? [] : [
              { group: [`@modules/${other}`, `@modules/${other}/*`],
                message: `FMA boundary: modules may not import other modules. Interact via @app/contracts. (attempted: ${other})` },
              { group: [`**/modules/${other}/*`],
                message: `FMA boundary: relative reach into modules/${other} is forbidden.` },
              ]),
            ]),
        ],
      },
    ],
  },
}));
