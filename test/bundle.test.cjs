const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');
const vm = require('node:vm');
const { parse } = require('acorn');
const { transform } = require('esbuild');

const code = readFileSync(require.resolve('../index.js'), 'utf8');

function checkSyntax(source) {
  const ast = parse(source, { ecmaVersion: 2020, sourceType: 'script' });
  function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'AssignmentExpression') {
      assert.ok(!['??=', '&&=', '||=', '**='].includes(node.operator));
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') visit(value);
    }
  }
  visit(ast);
}

test('bundle uses ES2020 syntax without advanced assignment operators', () => {
  checkSyntax(code);
});

test('Apps Script-like context needs no Node or browser globals', () => {
  const context = vm.createContext({});
  vm.runInContext(code, context, { timeout: 10000 });
  assert.equal(typeof context.require, 'undefined');
  assert.equal(typeof context.module, 'undefined');
  assert.equal(context.exports.default, context.Buffer);
  assert.equal(context.Buffer.from('héllo').toString('base64'), 'aMOpbGxv');
  assert.equal(context.exports.Buffer, context.Buffer);
  const { document } = context.exports.parseHTML('<html><body><p class="message">Hello</p></body></html>');
  assert.equal(document.querySelector('.message').textContent, 'Hello');
  document.querySelector('p').textContent = 'Updated';
  assert.match(document.toString(), /Updated/);
  const xml = new context.exports.DOMParser().parseFromString('<root><item id="1"/></root>', 'text/xml');
  assert.equal(xml.querySelector('item').getAttribute('id'), '1');
  const restored = context.exports.parseJSON(context.exports.toJSON(document));
  assert.equal(restored.querySelector('p').textContent, 'Updated');
});

test('CommonJS exposes LinkeDOM and Buffer without replacing global exports', () => {
  const previous = globalThis.exports;
  const api = require('../index.js');
  assert.equal(typeof api.parseHTML, 'function');
  assert.equal(api.default, api.Buffer);
  assert.equal(globalThis.exports, previous);
});

test('lowering preserves single evaluation and short-circuit setter semantics', async () => {
  const source = `
    let reads = 0, writes = 0, keys = 0, objects = 0;
    const object = { get value() { reads++; return 4; }, set value(v) { writes++; } };
    const getObject = () => (objects++, object);
    const getKey = () => (keys++, 'value');
    getObject()[getKey()] ??= 9;
    getObject()[getKey()] ||= 9;
    getObject()[getKey()] &&= 9;
    let x;
    x ??= 2;
    x &&= 3;
    x ||= 4;
    x **= 2;
    globalThis.result = [reads, writes, keys, objects, x];
  `;
  const { code: lowered } = await transform(source, {
    target: 'es2020',
    supported: { 'logical-assignment': false, 'exponent-operator': false },
  });
  checkSyntax(lowered);
  const originalContext = vm.createContext({});
  const loweredContext = vm.createContext({});
  vm.runInContext(source, originalContext);
  vm.runInContext(lowered, loweredContext);
  assert.deepEqual(Array.from(loweredContext.result), Array.from(originalContext.result));
  assert.deepEqual(Array.from(loweredContext.result), [3, 1, 3, 3, 9]);
});
