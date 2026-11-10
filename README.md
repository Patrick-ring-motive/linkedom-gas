# linkedom-gas

A generated, self-contained LinkeDOM bundle for Google Apps Script's V8 runtime and CommonJS consumers. No runtime `require`, npm install, or network access is needed in Apps Script.

## Build

Use Node.js 20 or newer. Run `npm ci`, then `npm run build`. Dependencies are pinned in `package-lock.json`; use `npm install` for the first checkout before a lockfile exists. Run `npm test` to validate the bundle.

The build:

1. Bundles the `buffer` package and installs `globalThis.Buffer` before LinkeDOM initializes.
2. Bundles `linkedom/worker`, which avoids Node-only dependencies such as native canvas.
3. Converts modules to CommonJS and wraps them for Apps Script, which has no native CommonJS loader.
4. Lowers `??=`, `&&=`, `||=`, and `**=` with esbuild. ES2020 syntax, including `??` and `?.`, remains. Older compound operators such as `+=` are already supported and are retained.
5. Generates `index.js` and `THIRD_PARTY_LICENSES.txt` from installed dependencies.

Logical assignment is lowered with short-circuit semantics intact. A literal rewrite from `x ??= y` to `x = x ?? y` would invoke property setters even when no assignment should happen. Computed properties and expressions with side effects are evaluated only as required by the original code.

Edit `src/` or `scripts/build.mjs`, not generated `index.js`. To upgrade upstream, update the dependency versions with npm, rebuild, and test; builds never silently fetch an unpinned latest version.

## Google Apps Script

Copy generated `index.js` into a script file in a V8-enabled Apps Script project. The bundle publishes the LinkeDOM API as `globalThis.exports` and Buffer as `globalThis.Buffer`. It replaces any existing `globalThis.exports` value. Call it from a function after script initialization:

```js
function example() {
  const { document } = globalThis.exports.parseHTML('<html><body><h1>Hello</h1></body></html>');
  Logger.log(document.querySelector('h1').textContent);
}
```

`exports.default` remains the Buffer constructor for compatibility with the previous port. `exports.Buffer` is also available. LinkeDOM names live on `exports`; they are not installed as separate globals.

This is a DOM implementation, not a browser. Browser-only APIs, native canvas rendering, and Apps Script library deployment are not supplied by this npm package. Tests use an isolated Node VM with no Node module loader or browser globals; run a smoke test in Apps Script before production use.

## CommonJS

```js
const { parseHTML, Buffer } = require('linkedom-gas');
const { document } = parseHTML('<p>Hello</p>');
console.log(document.querySelector('p').textContent);
```

Loading the package also sets `globalThis.Buffer` to the bundled polyfill.

## Publish to npm

Package name: `linkedom-gas`. Project license: MIT; bundled dependency notices are in `THIRD_PARTY_LICENSES.txt`.

GitHub Actions publishes stable releases using `.github/workflows/publish.yml`:

1. Create an npm granular access token with publish permission for `linkedom-gas` (including permission to create the package for its first release). Enable bypass 2FA for unattended publishing if required by your npm account policy. Store it as the repository Actions secret `NPM_TOKEN`, never in source control.
2. Commit this project, including `package-lock.json`, to your GitHub repository's default branch. Repository policy must permit this workflow's `GITHUB_TOKEN` to push release commits and tags. If branch protections disallow direct pushes, they need an approved release strategy before this workflow can publish; it does not bypass protections.
3. Open **Actions > Publish to npm > Run workflow**, select the default branch, and choose `patch` (default), `minor`, or `major`.
4. The workflow checks out the latest default branch, increments both package files, builds, tests, packs, commits generated artifacts and version changes, pushes a matching Git tag, then publishes to npm's `latest` tag. For example, a patch release changes `0.1.0` to `0.1.1` and creates `v0.1.1`.

No manual version edits or tag pushes are needed. Normal commits and tag pushes do not trigger publication. Runs are serialized, and runs selected on other branches are skipped. Only trusted maintainers should edit or run the release workflow.

The token is exposed only to the publish step, which publishes the tested tarball with lifecycle scripts disabled. Prerelease versions are rejected. Published npm versions cannot be overwritten. Rotate the token before it expires.

Git changes are pushed before publishing so a rejected Git push cannot publish an unrecorded version. If npm publishing fails after that push, the release commit and tag remain; rerunning this workflow bumps again. Recover the failed version manually from its tag if necessary. Do not delete or reuse a version already published to npm.

Run `npm pack --dry-run` to inspect a release locally. The `prepack` hook rebuilds and tests automatically. No token is needed for local builds or tests.
