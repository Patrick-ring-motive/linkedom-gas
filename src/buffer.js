import {
  Buffer
} from 'buffer/';

// Imported before LinkeDOM so its initialization can use Buffer too.
globalThis.Buffer = Buffer;

export default Buffer;
