import Buffer from './buffer.js';

// The worker entry is self-contained and avoids Node-only modules such as canvas.
export * from 'linkedom/worker';
export { Buffer, Buffer as default };
