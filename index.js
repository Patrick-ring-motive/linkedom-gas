"use strict";

globalThis.exports = globalThis.exports ?? {};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Minified by jsDelivr using Terser v5.37.0.
 * Original file: /npm/buffer-polyfill@6.0.3/dist/buffer.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var ur = {},
  G = {};
(G.byteLength = Lr), (G.toByteArray = Mr), (G.fromByteArray = br);
for (
  var S = [],
    R = [],
    Sr = typeof Uint8Array < "u" ? Uint8Array : Array,
    H = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    D = 0,
    _r = H.length; D < _r;
  ++D
)
  (S[D] = H[D]), (R[H.charCodeAt(D)] = D);

function hr(t) {
  var e = t.length;
  if (e % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var r = t.indexOf("=");
  return -1 === r && (r = e), [r, r === e ? 0 : 4 - (r % 4)];
}

function Lr(t) {
  var e = hr(t),
    r = e[0],
    n = e[1];
  return (3 * (r + n)) / 4 - n;
}

function Nr(t, e, r) {
  return (3 * (e + r)) / 4 - r;
}

function Mr(t) {
  var e,
    r,
    n = hr(t),
    o = n[0],
    i = n[1],
    f = new Sr(Nr(t, o, i)),
    s = 0,
    u = i > 0 ? o - 4 : o;
  for (r = 0; r < u; r += 4)
    (e =
      (R[t.charCodeAt(r)] << 18) |
      (R[t.charCodeAt(r + 1)] << 12) |
      (R[t.charCodeAt(r + 2)] << 6) |
      R[t.charCodeAt(r + 3)]),
    (f[s++] = (e >> 16) & 255),
    (f[s++] = (e >> 8) & 255),
    (f[s++] = 255 & e);
  return (
    2 === i &&
    ((e = (R[t.charCodeAt(r)] << 2) | (R[t.charCodeAt(r + 1)] >> 4)),
      (f[s++] = 255 & e)),
    1 === i &&
    ((e =
        (R[t.charCodeAt(r)] << 10) |
        (R[t.charCodeAt(r + 1)] << 4) |
        (R[t.charCodeAt(r + 2)] >> 2)),
      (f[s++] = (e >> 8) & 255),
      (f[s++] = 255 & e)),
    f
  );
}

function kr(t) {
  return S[(t >> 18) & 63] + S[(t >> 12) & 63] + S[(t >> 6) & 63] + S[63 & t];
}

function Dr(t, e, r) {
  for (var n, o = [], i = e; i < r; i += 3)
    (n =
      ((t[i] << 16) & 16711680) + ((t[i + 1] << 8) & 65280) + (255 & t[i + 2])),
    o.push(kr(n));
  return o.join("");
}

function br(t) {
  for (
    var e, r = t.length, n = r % 3, o = [], i = 16383, f = 0, s = r - n; f < s; f += i
  )
    o.push(Dr(t, f, f + i > s ? s : f + i));
  return (
    1 === n ?
    ((e = t[r - 1]), o.push(S[e >> 2] + S[(e << 4) & 63] + "==")) :
    2 === n &&
    ((e = (t[r - 2] << 8) + t[r - 1]),
      o.push(S[e >> 10] + S[(e >> 4) & 63] + S[(e << 2) & 63] + "=")),
    o.join("")
  );
}
(R["-".charCodeAt(0)] = 62), (R["_".charCodeAt(0)] = 63);
var V = {
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
  read: function(t, e, r, n, o) {
    var i,
      f,
      s = 8 * o - n - 1,
      u = (1 << s) - 1,
      h = u >> 1,
      a = -7,
      c = r ? o - 1 : 0,
      p = r ? -1 : 1,
      l = t[e + c];
    for (
      c += p, i = l & ((1 << -a) - 1), l >>= -a, a += s; a > 0; i = 256 * i + t[e + c], c += p, a -= 8
    );
    for (
      f = i & ((1 << -a) - 1), i >>= -a, a += n; a > 0; f = 256 * f + t[e + c], c += p, a -= 8
    );
    if (0 === i) i = 1 - h;
    else {
      if (i === u) return f ? NaN : (1 / 0) * (l ? -1 : 1);
      (f += Math.pow(2, n)), (i -= h);
    }
    return (l ? -1 : 1) * f * Math.pow(2, i - n);
  },
  write: function(t, e, r, n, o, i) {
    var f,
      s,
      u,
      h = 8 * i - o - 1,
      a = (1 << h) - 1,
      c = a >> 1,
      p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
      l = n ? 0 : i - 1,
      y = n ? 1 : -1,
      g = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
    for (
      e = Math.abs(e),
      isNaN(e) || e === 1 / 0 ?
      ((s = isNaN(e) ? 1 : 0), (f = a)) :
      ((f = Math.floor(Math.log(e) / Math.LN2)),
        e * (u = Math.pow(2, -f)) < 1 && (f--, (u *= 2)),
        (e += f + c >= 1 ? p / u : p * Math.pow(2, 1 - c)) * u >= 2 &&
        (f++, (u /= 2)),
        f + c >= a ?
        ((s = 0), (f = a)) :
        f + c >= 1 ?
        ((s = (e * u - 1) * Math.pow(2, o)), (f += c)) :
        ((s = e * Math.pow(2, c - 1) * Math.pow(2, o)), (f = 0))); o >= 8; t[r + l] = 255 & s, l += y, s /= 256, o -= 8
    );
    for (
      f = (f << o) | s, h += o; h > 0; t[r + l] = 255 & f, l += y, f /= 256, h -= 8
    );
    t[r + l - y] |= 128 * g;
  }
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
!(function(t) {
  const e = G,
    r = V,
    n =
    "function" == typeof Symbol && "function" == typeof Symbol.for ?
    Symbol.for("nodejs.util.inspect.custom") :
    null;
  (t.Buffer = f),
  (t.SlowBuffer = function(t) {
    return +t != t && (t = 0), f.alloc(+t);
  }),
  (t.INSPECT_MAX_BYTES = 50);
  const o = 2147483647;

  function i(t) {
    if (t > o)
      throw new RangeError(
        'The value "' + t + '" is invalid for option "size"'
      );
    const e = new Uint8Array(t);
    return Object.setPrototypeOf(e, f.prototype), e;
  }

  function f(t, e, r) {
    if ("number" == typeof t) {
      if ("string" == typeof e)
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return h(t);
    }
    return s(t, e, r);
  }

  function s(t, e, r) {
    if ("string" == typeof t)
      return (function(t, e) {
        if (
          (("string" != typeof e || "" === e) && (e = "utf8"), !f.isEncoding(e))
        )
          throw new TypeError("Unknown encoding: " + e);
        const r = 0 | l(t, e);
        let n = i(r);
        const o = n.write(t, e);
        return o !== r && (n = n.slice(0, o)), n;
      })(t, e);
    if (ArrayBuffer.isView(t))
      return (function(t) {
        if (X(t, Uint8Array)) {
          const e = new Uint8Array(t);
          return c(e.buffer, e.byteOffset, e.byteLength);
        }
        return a(t);
      })(t);
    if (null == t)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof t
      );
    if (
      X(t, ArrayBuffer) ||
      (t && X(t.buffer, ArrayBuffer)) ||
      (typeof SharedArrayBuffer < "u" &&
        (X(t, SharedArrayBuffer) || (t && X(t.buffer, SharedArrayBuffer))))
    )
      return c(t, e, r);
    if ("number" == typeof t)
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const n = t.valueOf && t.valueOf();
    if (null != n && n !== t) return f.from(n, e, r);
    const o = (function(t) {
      if (f.isBuffer(t)) {
        const e = 0 | p(t.length),
          r = i(e);
        return 0 === r.length || t.copy(r, 0, 0, e), r;
      }
      if (void 0 !== t.length)
        return "number" != typeof t.length || J(t.length) ? i(0) : a(t);
      if ("Buffer" === t.type && Array.isArray(t.data)) return a(t.data);
    })(t);
    if (o) return o;
    if (
      typeof Symbol < "u" &&
      null != Symbol.toPrimitive &&
      "function" == typeof t[Symbol.toPrimitive]
    )
      return f.from(t[Symbol.toPrimitive]("string"), e, r);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
      typeof t
    );
  }

  function u(t) {
    if ("number" != typeof t)
      throw new TypeError('"size" argument must be of type number');
    if (t < 0)
      throw new RangeError(
        'The value "' + t + '" is invalid for option "size"'
      );
  }

  function h(t) {
    return u(t), i(t < 0 ? 0 : 0 | p(t));
  }

  function a(t) {
    const e = t.length < 0 ? 0 : 0 | p(t.length),
      r = i(e);
    for (let n = 0; n < e; n += 1) r[n] = 255 & t[n];
    return r;
  }

  function c(t, e, r) {
    if (e < 0 || t.byteLength < e)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (t.byteLength < e + (r || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let n;
    return (
      (n =
        void 0 === e && void 0 === r ?
        new Uint8Array(t) :
        void 0 === r ?
        new Uint8Array(t, e) :
        new Uint8Array(t, e, r)),
      Object.setPrototypeOf(n, f.prototype),
      n
    );
  }

  function p(t) {
    if (t >= o)
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
        o.toString(16) +
        " bytes"
      );
    return 0 | t;
  }

  function l(t, e) {
    if (f.isBuffer(t)) return t.length;
    if (ArrayBuffer.isView(t) || X(t, ArrayBuffer)) return t.byteLength;
    if ("string" != typeof t)
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
        typeof t
      );
    const r = t.length,
      n = arguments.length > 2 && !0 === arguments[2];
    if (!n && 0 === r) return 0;
    let o = !1;
    for (;;)
      switch (e) {
        case "ascii":
        case "latin1":
        case "binary":
          return r;
        case "utf8":
        case "utf-8":
          return H(t).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return 2 * r;
        case "hex":
          return r >>> 1;
        case "base64":
          return q(t).length;
        default:
          if (o) return n ? -1 : H(t).length;
          (e = ("" + e).toLowerCase()), (o = !0);
      }
  }

  function y(t, e, r) {
    let n = !1;
    if (
      ((void 0 === e || e < 0) && (e = 0),
        e > this.length ||
        ((void 0 === r || r > this.length) && (r = this.length), r <= 0) ||
        (r >>>= 0) <= (e >>>= 0))
    )
      return "";
    for (t || (t = "utf8");;)
      switch (t) {
        case "hex":
          return T(this, e, r);
        case "utf8":
        case "utf-8":
          return U(this, e, r);
        case "ascii":
          return R(this, e, r);
        case "latin1":
        case "binary":
          return S(this, e, r);
        case "base64":
          return I(this, e, r);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return O(this, e, r);
        default:
          if (n) throw new TypeError("Unknown encoding: " + t);
          (t = (t + "").toLowerCase()), (n = !0);
      }
  }

  function g(t, e, r) {
    const n = t[e];
    (t[e] = t[r]), (t[r] = n);
  }

  function w(t, e, r, n, o) {
    if (0 === t.length) return -1;
    if (
      ("string" == typeof r ?
        ((n = r), (r = 0)) :
        r > 2147483647 ?
        (r = 2147483647) :
        r < -2147483648 && (r = -2147483648),
        J((r = +r)) && (r = o ? 0 : t.length - 1),
        r < 0 && (r = t.length + r),
        r >= t.length)
    ) {
      if (o) return -1;
      r = t.length - 1;
    } else if (r < 0) {
      if (!o) return -1;
      r = 0;
    }
    if (("string" == typeof e && (e = f.from(e, n)), f.isBuffer(e)))
      return 0 === e.length ? -1 : d(t, e, r, n, o);
    if ("number" == typeof e)
      return (
        (e &= 255),
        "function" == typeof Uint8Array.prototype.indexOf ?
        o ?
        Uint8Array.prototype.indexOf.call(t, e, r) :
        Uint8Array.prototype.lastIndexOf.call(t, e, r) :
        d(t, [e], r, n, o)
      );
    throw new TypeError("val must be string, number or Buffer");
  }

  function d(t, e, r, n, o) {
    let i,
      f = 1,
      s = t.length,
      u = e.length;
    if (
      void 0 !== n &&
      ("ucs2" === (n = String(n).toLowerCase()) ||
        "ucs-2" === n ||
        "utf16le" === n ||
        "utf-16le" === n)
    ) {
      if (t.length < 2 || e.length < 2) return -1;
      (f = 2), (s /= 2), (u /= 2), (r /= 2);
    }

    function h(t, e) {
      return 1 === f ? t[e] : t.readUInt16BE(e * f);
    }
    if (o) {
      let n = -1;
      for (i = r; i < s; i++)
        if (h(t, i) === h(e, -1 === n ? 0 : i - n)) {
          if ((-1 === n && (n = i), i - n + 1 === u)) return n * f;
        } else - 1 !== n && (i -= i - n), (n = -1);
    } else
      for (r + u > s && (r = s - u), i = r; i >= 0; i--) {
        let r = !0;
        for (let n = 0; n < u; n++)
          if (h(t, i + n) !== h(e, n)) {
            r = !1;
            break;
          }
        if (r) return i;
      }
    return -1;
  }

  function b(t, e, r, n) {
    r = Number(r) || 0;
    const o = t.length - r;
    n ? (n = Number(n)) > o && (n = o) : (n = o);
    const i = e.length;
    let f;
    for (n > i / 2 && (n = i / 2), f = 0; f < n; ++f) {
      const n = parseInt(e.substr(2 * f, 2), 16);
      if (J(n)) return f;
      t[r + f] = n;
    }
    return f;
  }

  function B(t, e, r, n) {
    return W(H(e, t.length - r), t, r, n);
  }

  function E(t, e, r, n) {
    return W(
      (function(t) {
        const e = [];
        for (let r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
        return e;
      })(e),
      t,
      r,
      n
    );
  }

  function m(t, e, r, n) {
    return W(q(e), t, r, n);
  }

  function A(t, e, r, n) {
    return W(
      (function(t, e) {
        let r, n, o;
        const i = [];
        for (let f = 0; f < t.length && !((e -= 2) < 0); ++f)
          (r = t.charCodeAt(f)),
          (n = r >> 8),
          (o = r % 256),
          i.push(o),
          i.push(n);
        return i;
      })(e, t.length - r),
      t,
      r,
      n
    );
  }

  function I(t, r, n) {
    return 0 === r && n === t.length ?
      e.fromByteArray(t) :
      e.fromByteArray(t.slice(r, n));
  }

  function U(t, e, r) {
    r = Math.min(t.length, r);
    const n = [];
    let o = e;
    for (; o < r;) {
      const e = t[o];
      let i = null,
        f = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
      if (o + f <= r) {
        let r, n, s, u;
        switch (f) {
          case 1:
            e < 128 && (i = e);
            break;
          case 2:
            (r = t[o + 1]),
            128 == (192 & r) &&
              ((u = ((31 & e) << 6) | (63 & r)), u > 127 && (i = u));
            break;
          case 3:
            (r = t[o + 1]),
            (n = t[o + 2]),
            128 == (192 & r) &&
              128 == (192 & n) &&
              ((u = ((15 & e) << 12) | ((63 & r) << 6) | (63 & n)),
                u > 2047 && (u < 55296 || u > 57343) && (i = u));
            break;
          case 4:
            (r = t[o + 1]),
            (n = t[o + 2]),
            (s = t[o + 3]),
            128 == (192 & r) &&
              128 == (192 & n) &&
              128 == (192 & s) &&
              ((u =
                  ((15 & e) << 18) |
                  ((63 & r) << 12) |
                  ((63 & n) << 6) |
                  (63 & s)),
                u > 65535 && u < 1114112 && (i = u));
        }
      }
      null === i ?
        ((i = 65533), (f = 1)) :
        i > 65535 &&
        ((i -= 65536),
          n.push(((i >>> 10) & 1023) | 55296),
          (i = 56320 | (1023 & i))),
        n.push(i),
        (o += f);
    }
    return (function(t) {
      const e = t.length;
      if (e <= v) return String.fromCharCode.apply(String, t);
      let r = "",
        n = 0;
      for (; n < e;)
        r += String.fromCharCode.apply(String, t.slice(n, (n += v)));
      return r;
    })(n);
  }
  (t.kMaxLength = o),
  (f.TYPED_ARRAY_SUPPORT = (function() {
    try {
      const t = new Uint8Array(1),
        e = {
          foo: function() {
            return 42;
          }
        };
      return (
        Object.setPrototypeOf(e, Uint8Array.prototype),
        Object.setPrototypeOf(t, e),
        42 === t.foo()
      );
    } catch {
      return !1;
    }
  })()),
  !f.TYPED_ARRAY_SUPPORT &&
    typeof console < "u" &&
    "function" == typeof console.error &&
    console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    ),
    Object.defineProperty(f.prototype, "parent", {
      enumerable: !0,
      get: function() {
        if (f.isBuffer(this)) return this.buffer;
      }
    }),
    Object.defineProperty(f.prototype, "offset", {
      enumerable: !0,
      get: function() {
        if (f.isBuffer(this)) return this.byteOffset;
      }
    }),
    (f.poolSize = 8192),
    (f.from = function(t, e, r) {
      return s(t, e, r);
    }),
    Object.setPrototypeOf(f.prototype, Uint8Array.prototype),
    Object.setPrototypeOf(f, Uint8Array),
    (f.alloc = function(t, e, r) {
      return (function(t, e, r) {
        return (
          u(t),
          t <= 0 ?
          i(t) :
          void 0 !== e ?
          "string" == typeof r ?
          i(t).fill(e, r) :
          i(t).fill(e) :
          i(t)
        );
      })(t, e, r);
    }),
    (f.allocUnsafe = function(t) {
      return h(t);
    }),
    (f.allocUnsafeSlow = function(t) {
      return h(t);
    }),
    (f.isBuffer = function(t) {
      return null != t && !0 === t._isBuffer && t !== f.prototype;
    }),
    (f.compare = function(t, e) {
      if (
        (X(t, Uint8Array) && (t = f.from(t, t.offset, t.byteLength)),
          X(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)),
          !f.isBuffer(t) || !f.isBuffer(e))
      )
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (t === e) return 0;
      let r = t.length,
        n = e.length;
      for (let o = 0, i = Math.min(r, n); o < i; ++o)
        if (t[o] !== e[o]) {
          (r = t[o]), (n = e[o]);
          break;
        }
      return r < n ? -1 : n < r ? 1 : 0;
    }),
    (f.isEncoding = function(t) {
      switch (String(t).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }),
    (f.concat = function(t, e) {
      if (!Array.isArray(t))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (0 === t.length) return f.alloc(0);
      let r;
      if (void 0 === e)
        for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
      const n = f.allocUnsafe(e);
      let o = 0;
      for (r = 0; r < t.length; ++r) {
        let e = t[r];
        if (X(e, Uint8Array))
          o + e.length > n.length ?
          (f.isBuffer(e) || (e = f.from(e)), e.copy(n, o)) :
          Uint8Array.prototype.set.call(n, e, o);
        else {
          if (!f.isBuffer(e))
            throw new TypeError('"list" argument must be an Array of Buffers');
          e.copy(n, o);
        }
        o += e.length;
      }
      return n;
    }),
    (f.byteLength = l),
    (f.prototype._isBuffer = !0),
    (f.prototype.swap16 = function() {
      const t = this.length;
      if (t % 2 != 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let e = 0; e < t; e += 2) g(this, e, e + 1);
      return this;
    }),
    (f.prototype.swap32 = function() {
      const t = this.length;
      if (t % 4 != 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let e = 0; e < t; e += 4) g(this, e, e + 3), g(this, e + 1, e + 2);
      return this;
    }),
    (f.prototype.swap64 = function() {
      const t = this.length;
      if (t % 8 != 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let e = 0; e < t; e += 8)
        g(this, e, e + 7),
        g(this, e + 1, e + 6),
        g(this, e + 2, e + 5),
        g(this, e + 3, e + 4);
      return this;
    }),
    (f.prototype.toString = function() {
      const t = this.length;
      return 0 === t ?
        "" :
        0 === arguments.length ?
        U(this, 0, t) :
        y.apply(this, arguments);
    }),
    (f.prototype.toLocaleString = f.prototype.toString),
    (f.prototype.equals = function(t) {
      if (!f.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
      return this === t || 0 === f.compare(this, t);
    }),
    (f.prototype.inspect = function() {
      let e = "";
      const r = t.INSPECT_MAX_BYTES;
      return (
        (e = this.toString("hex", 0, r)
          .replace(/(.{2})/g, "$1 ")
          .trim()),
        this.length > r && (e += " ... "),
        "<Buffer " + e + ">"
      );
    }),
    n && (f.prototype[n] = f.prototype.inspect),
    (f.prototype.compare = function(t, e, r, n, o) {
      if (
        (X(t, Uint8Array) && (t = f.from(t, t.offset, t.byteLength)),
          !f.isBuffer(t))
      )
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
          typeof t
        );
      if (
        (void 0 === e && (e = 0),
          void 0 === r && (r = t ? t.length : 0),
          void 0 === n && (n = 0),
          void 0 === o && (o = this.length),
          e < 0 || r > t.length || n < 0 || o > this.length)
      )
        throw new RangeError("out of range index");
      if (n >= o && e >= r) return 0;
      if (n >= o) return -1;
      if (e >= r) return 1;
      if (this === t) return 0;
      let i = (o >>>= 0) - (n >>>= 0),
        s = (r >>>= 0) - (e >>>= 0);
      const u = Math.min(i, s),
        h = this.slice(n, o),
        a = t.slice(e, r);
      for (let t = 0; t < u; ++t)
        if (h[t] !== a[t]) {
          (i = h[t]), (s = a[t]);
          break;
        }
      return i < s ? -1 : s < i ? 1 : 0;
    }),
    (f.prototype.includes = function(t, e, r) {
      return -1 !== this.indexOf(t, e, r);
    }),
    (f.prototype.indexOf = function(t, e, r) {
      return w(this, t, e, r, !0);
    }),
    (f.prototype.lastIndexOf = function(t, e, r) {
      return w(this, t, e, r, !1);
    }),
    (f.prototype.write = function(t, e, r, n) {
      if (void 0 === e)(n = "utf8"), (r = this.length), (e = 0);
      else if (void 0 === r && "string" == typeof e)
        (n = e), (r = this.length), (e = 0);
      else {
        if (!isFinite(e))
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        (e >>>= 0),
        isFinite(r) ?
          ((r >>>= 0), void 0 === n && (n = "utf8")) :
          ((n = r), (r = void 0));
      }
      const o = this.length - e;
      if (
        ((void 0 === r || r > o) && (r = o),
          (t.length > 0 && (r < 0 || e < 0)) || e > this.length)
      )
        throw new RangeError("Attempt to write outside buffer bounds");
      n || (n = "utf8");
      let i = !1;
      for (;;)
        switch (n) {
          case "hex":
            return b(this, t, e, r);
          case "utf8":
          case "utf-8":
            return B(this, t, e, r);
          case "ascii":
          case "latin1":
          case "binary":
            return E(this, t, e, r);
          case "base64":
            return m(this, t, e, r);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return A(this, t, e, r);
          default:
            if (i) throw new TypeError("Unknown encoding: " + n);
            (n = ("" + n).toLowerCase()), (i = !0);
        }
    }),
    (f.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    });
  const v = 4096;

  function R(t, e, r) {
    let n = "";
    r = Math.min(t.length, r);
    for (let o = e; o < r; ++o) n += String.fromCharCode(127 & t[o]);
    return n;
  }

  function S(t, e, r) {
    let n = "";
    r = Math.min(t.length, r);
    for (let o = e; o < r; ++o) n += String.fromCharCode(t[o]);
    return n;
  }

  function T(t, e, r) {
    const n = t.length;
    (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
    let o = "";
    for (let n = e; n < r; ++n) o += Z[t[n]];
    return o;
  }

  function O(t, e, r) {
    const n = t.slice(e, r);
    let o = "";
    for (let t = 0; t < n.length - 1; t += 2)
      o += String.fromCharCode(n[t] + 256 * n[t + 1]);
    return o;
  }

  function L(t, e, r) {
    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
    if (t + e > r)
      throw new RangeError("Trying to access beyond buffer length");
  }

  function _(t, e, r, n, o, i) {
    if (!f.isBuffer(t))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (e > o || e < i)
      throw new RangeError('"value" argument is out of bounds');
    if (r + n > t.length) throw new RangeError("Index out of range");
  }

  function C(t, e, r, n, o) {
    j(e, n, o, t, r, 7);
    let i = Number(e & BigInt(4294967295));
    (t[r++] = i),
    (i >>= 8),
    (t[r++] = i),
    (i >>= 8),
    (t[r++] = i),
    (i >>= 8),
    (t[r++] = i);
    let f = Number((e >> BigInt(32)) & BigInt(4294967295));
    return (
      (t[r++] = f),
      (f >>= 8),
      (t[r++] = f),
      (f >>= 8),
      (t[r++] = f),
      (f >>= 8),
      (t[r++] = f),
      r
    );
  }

  function x(t, e, r, n, o) {
    j(e, n, o, t, r, 7);
    let i = Number(e & BigInt(4294967295));
    (t[r + 7] = i),
    (i >>= 8),
    (t[r + 6] = i),
    (i >>= 8),
    (t[r + 5] = i),
    (i >>= 8),
    (t[r + 4] = i);
    let f = Number((e >> BigInt(32)) & BigInt(4294967295));
    return (
      (t[r + 3] = f),
      (f >>= 8),
      (t[r + 2] = f),
      (f >>= 8),
      (t[r + 1] = f),
      (f >>= 8),
      (t[r] = f),
      r + 8
    );
  }

  function M(t, e, r, n, o, i) {
    if (r + n > t.length) throw new RangeError("Index out of range");
    if (r < 0) throw new RangeError("Index out of range");
  }

  function $(t, e, n, o, i) {
    return (
      (e = +e),
      (n >>>= 0),
      i || M(t, 0, n, 4),
      r.write(t, e, n, o, 23, 4),
      n + 4
    );
  }

  function N(t, e, n, o, i) {
    return (
      (e = +e),
      (n >>>= 0),
      i || M(t, 0, n, 8),
      r.write(t, e, n, o, 52, 8),
      n + 8
    );
  }
  (f.prototype.slice = function(t, e) {
    const r = this.length;
    (t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
      (e = void 0 === e ? r : ~~e) < 0 ?
      (e += r) < 0 && (e = 0) :
      e > r && (e = r),
      e < t && (e = t);
    const n = this.subarray(t, e);
    return Object.setPrototypeOf(n, f.prototype), n;
  }),
  (f.prototype.readUintLE = f.prototype.readUIntLE =
    function(t, e, r) {
      (t >>>= 0), (e >>>= 0), r || L(t, e, this.length);
      let n = this[t],
        o = 1,
        i = 0;
      for (; ++i < e && (o *= 256);) n += this[t + i] * o;
      return n;
    }),
  (f.prototype.readUintBE = f.prototype.readUIntBE =
    function(t, e, r) {
      (t >>>= 0), (e >>>= 0), r || L(t, e, this.length);
      let n = this[t + --e],
        o = 1;
      for (; e > 0 && (o *= 256);) n += this[t + --e] * o;
      return n;
    }),
  (f.prototype.readUint8 = f.prototype.readUInt8 =
    function(t, e) {
      return (t >>>= 0), e || L(t, 1, this.length), this[t];
    }),
  (f.prototype.readUint16LE = f.prototype.readUInt16LE =
    function(t, e) {
      return (
        (t >>>= 0), e || L(t, 2, this.length), this[t] | (this[t + 1] << 8)
      );
    }),
  (f.prototype.readUint16BE = f.prototype.readUInt16BE =
    function(t, e) {
      return (
        (t >>>= 0), e || L(t, 2, this.length), (this[t] << 8) | this[t + 1]
      );
    }),
  (f.prototype.readUint32LE = f.prototype.readUInt32LE =
    function(t, e) {
      return (
        (t >>>= 0),
        e || L(t, 4, this.length),
        (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
        16777216 * this[t + 3]
      );
    }),
  (f.prototype.readUint32BE = f.prototype.readUInt32BE =
    function(t, e) {
      return (
        (t >>>= 0),
        e || L(t, 4, this.length),
        16777216 * this[t] +
        ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
      );
    }),
  (f.prototype.readBigUInt64LE = K(function(t) {
    F((t >>>= 0), "offset");
    const e = this[t],
      r = this[t + 7];
    (void 0 === e || void 0 === r) && z(t, this.length - 8);
    const n = e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24,
      o = this[++t] + 256 * this[++t] + 65536 * this[++t] + r * 2 ** 24;
    return BigInt(n) + (BigInt(o) << BigInt(32));
  })),
  (f.prototype.readBigUInt64BE = K(function(t) {
    F((t >>>= 0), "offset");
    const e = this[t],
      r = this[t + 7];
    (void 0 === e || void 0 === r) && z(t, this.length - 8);
    const n = e * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + this[++t],
      o = this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r;
    return (BigInt(n) << BigInt(32)) + BigInt(o);
  })),
  (f.prototype.readIntLE = function(t, e, r) {
    (t >>>= 0), (e >>>= 0), r || L(t, e, this.length);
    let n = this[t],
      o = 1,
      i = 0;
    for (; ++i < e && (o *= 256);) n += this[t + i] * o;
    return (o *= 128), n >= o && (n -= Math.pow(2, 8 * e)), n;
  }),
  (f.prototype.readIntBE = function(t, e, r) {
    (t >>>= 0), (e >>>= 0), r || L(t, e, this.length);
    let n = e,
      o = 1,
      i = this[t + --n];
    for (; n > 0 && (o *= 256);) i += this[t + --n] * o;
    return (o *= 128), i >= o && (i -= Math.pow(2, 8 * e)), i;
  }),
  (f.prototype.readInt8 = function(t, e) {
    return (
      (t >>>= 0),
      e || L(t, 1, this.length),
      128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
    );
  }),
  (f.prototype.readInt16LE = function(t, e) {
    (t >>>= 0), e || L(t, 2, this.length);
    const r = this[t] | (this[t + 1] << 8);
    return 32768 & r ? 4294901760 | r : r;
  }),
  (f.prototype.readInt16BE = function(t, e) {
    (t >>>= 0), e || L(t, 2, this.length);
    const r = this[t + 1] | (this[t] << 8);
    return 32768 & r ? 4294901760 | r : r;
  }),
  (f.prototype.readInt32LE = function(t, e) {
    return (
      (t >>>= 0),
      e || L(t, 4, this.length),
      this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
    );
  }),
  (f.prototype.readInt32BE = function(t, e) {
    return (
      (t >>>= 0),
      e || L(t, 4, this.length),
      (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
    );
  }),
  (f.prototype.readBigInt64LE = K(function(t) {
    F((t >>>= 0), "offset");
    const e = this[t],
      r = this[t + 7];
    (void 0 === e || void 0 === r) && z(t, this.length - 8);
    const n =
      this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (r << 24);
    return (
      (BigInt(n) << BigInt(32)) +
      BigInt(e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24)
    );
  })),
  (f.prototype.readBigInt64BE = K(function(t) {
    F((t >>>= 0), "offset");
    const e = this[t],
      r = this[t + 7];
    (void 0 === e || void 0 === r) && z(t, this.length - 8);
    const n = (e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t];
    return (
      (BigInt(n) << BigInt(32)) +
      BigInt(this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + r)
    );
  })),
  (f.prototype.readFloatLE = function(t, e) {
    return (t >>>= 0), e || L(t, 4, this.length), r.read(this, t, !0, 23, 4);
  }),
  (f.prototype.readFloatBE = function(t, e) {
    return (t >>>= 0), e || L(t, 4, this.length), r.read(this, t, !1, 23, 4);
  }),
  (f.prototype.readDoubleLE = function(t, e) {
    return (t >>>= 0), e || L(t, 8, this.length), r.read(this, t, !0, 52, 8);
  }),
  (f.prototype.readDoubleBE = function(t, e) {
    return (t >>>= 0), e || L(t, 8, this.length), r.read(this, t, !1, 52, 8);
  }),
  (f.prototype.writeUintLE = f.prototype.writeUIntLE =
    function(t, e, r, n) {
      if (((t = +t), (e >>>= 0), (r >>>= 0), !n)) {
        _(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
      }
      let o = 1,
        i = 0;
      for (this[e] = 255 & t; ++i < r && (o *= 256);)
        this[e + i] = (t / o) & 255;
      return e + r;
    }),
  (f.prototype.writeUintBE = f.prototype.writeUIntBE =
    function(t, e, r, n) {
      if (((t = +t), (e >>>= 0), (r >>>= 0), !n)) {
        _(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
      }
      let o = r - 1,
        i = 1;
      for (this[e + o] = 255 & t; --o >= 0 && (i *= 256);)
        this[e + o] = (t / i) & 255;
      return e + r;
    }),
  (f.prototype.writeUint8 = f.prototype.writeUInt8 =
    function(t, e, r) {
      return (
        (t = +t),
        (e >>>= 0),
        r || _(this, t, e, 1, 255, 0),
        (this[e] = 255 & t),
        e + 1
      );
    }),
  (f.prototype.writeUint16LE = f.prototype.writeUInt16LE =
    function(t, e, r) {
      return (
        (t = +t),
        (e >>>= 0),
        r || _(this, t, e, 2, 65535, 0),
        (this[e] = 255 & t),
        (this[e + 1] = t >>> 8),
        e + 2
      );
    }),
  (f.prototype.writeUint16BE = f.prototype.writeUInt16BE =
    function(t, e, r) {
      return (
        (t = +t),
        (e >>>= 0),
        r || _(this, t, e, 2, 65535, 0),
        (this[e] = t >>> 8),
        (this[e + 1] = 255 & t),
        e + 2
      );
    }),
  (f.prototype.writeUint32LE = f.prototype.writeUInt32LE =
    function(t, e, r) {
      return (
        (t = +t),
        (e >>>= 0),
        r || _(this, t, e, 4, 4294967295, 0),
        (this[e + 3] = t >>> 24),
        (this[e + 2] = t >>> 16),
        (this[e + 1] = t >>> 8),
        (this[e] = 255 & t),
        e + 4
      );
    }),
  (f.prototype.writeUint32BE = f.prototype.writeUInt32BE =
    function(t, e, r) {
      return (
        (t = +t),
        (e >>>= 0),
        r || _(this, t, e, 4, 4294967295, 0),
        (this[e] = t >>> 24),
        (this[e + 1] = t >>> 16),
        (this[e + 2] = t >>> 8),
        (this[e + 3] = 255 & t),
        e + 4
      );
    }),
  (f.prototype.writeBigUInt64LE = K(function(t, e = 0) {
    return C(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
  })),
  (f.prototype.writeBigUInt64BE = K(function(t, e = 0) {
    return x(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
  })),
  (f.prototype.writeIntLE = function(t, e, r, n) {
    if (((t = +t), (e >>>= 0), !n)) {
      const n = Math.pow(2, 8 * r - 1);
      _(this, t, e, r, n - 1, -n);
    }
    let o = 0,
      i = 1,
      f = 0;
    for (this[e] = 255 & t; ++o < r && (i *= 256);)
      t < 0 && 0 === f && 0 !== this[e + o - 1] && (f = 1),
      (this[e + o] = (((t / i) | 0) - f) & 255);
    return e + r;
  }),
  (f.prototype.writeIntBE = function(t, e, r, n) {
    if (((t = +t), (e >>>= 0), !n)) {
      const n = Math.pow(2, 8 * r - 1);
      _(this, t, e, r, n - 1, -n);
    }
    let o = r - 1,
      i = 1,
      f = 0;
    for (this[e + o] = 255 & t; --o >= 0 && (i *= 256);)
      t < 0 && 0 === f && 0 !== this[e + o + 1] && (f = 1),
      (this[e + o] = (((t / i) | 0) - f) & 255);
    return e + r;
  }),
  (f.prototype.writeInt8 = function(t, e, r) {
    return (
      (t = +t),
      (e >>>= 0),
      r || _(this, t, e, 1, 127, -128),
      t < 0 && (t = 255 + t + 1),
      (this[e] = 255 & t),
      e + 1
    );
  }),
  (f.prototype.writeInt16LE = function(t, e, r) {
    return (
      (t = +t),
      (e >>>= 0),
      r || _(this, t, e, 2, 32767, -32768),
      (this[e] = 255 & t),
      (this[e + 1] = t >>> 8),
      e + 2
    );
  }),
  (f.prototype.writeInt16BE = function(t, e, r) {
    return (
      (t = +t),
      (e >>>= 0),
      r || _(this, t, e, 2, 32767, -32768),
      (this[e] = t >>> 8),
      (this[e + 1] = 255 & t),
      e + 2
    );
  }),
  (f.prototype.writeInt32LE = function(t, e, r) {
    return (
      (t = +t),
      (e >>>= 0),
      r || _(this, t, e, 4, 2147483647, -2147483648),
      (this[e] = 255 & t),
      (this[e + 1] = t >>> 8),
      (this[e + 2] = t >>> 16),
      (this[e + 3] = t >>> 24),
      e + 4
    );
  }),
  (f.prototype.writeInt32BE = function(t, e, r) {
    return (
      (t = +t),
      (e >>>= 0),
      r || _(this, t, e, 4, 2147483647, -2147483648),
      t < 0 && (t = 4294967295 + t + 1),
      (this[e] = t >>> 24),
      (this[e + 1] = t >>> 16),
      (this[e + 2] = t >>> 8),
      (this[e + 3] = 255 & t),
      e + 4
    );
  }),
  (f.prototype.writeBigInt64LE = K(function(t, e = 0) {
    return C(
      this,
      t,
      e,
      -BigInt("0x8000000000000000"),
      BigInt("0x7fffffffffffffff")
    );
  })),
  (f.prototype.writeBigInt64BE = K(function(t, e = 0) {
    return x(
      this,
      t,
      e,
      -BigInt("0x8000000000000000"),
      BigInt("0x7fffffffffffffff")
    );
  })),
  (f.prototype.writeFloatLE = function(t, e, r) {
    return $(this, t, e, !0, r);
  }),
  (f.prototype.writeFloatBE = function(t, e, r) {
    return $(this, t, e, !1, r);
  }),
  (f.prototype.writeDoubleLE = function(t, e, r) {
    return N(this, t, e, !0, r);
  }),
  (f.prototype.writeDoubleBE = function(t, e, r) {
    return N(this, t, e, !1, r);
  }),
  (f.prototype.copy = function(t, e, r, n) {
    if (!f.isBuffer(t)) throw new TypeError("argument should be a Buffer");
    if (
      (r || (r = 0),
        !n && 0 !== n && (n = this.length),
        e >= t.length && (e = t.length),
        e || (e = 0),
        n > 0 && n < r && (n = r),
        n === r || 0 === t.length || 0 === this.length)
    )
      return 0;
    if (e < 0) throw new RangeError("targetStart out of bounds");
    if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
    if (n < 0) throw new RangeError("sourceEnd out of bounds");
    n > this.length && (n = this.length),
      t.length - e < n - r && (n = t.length - e + r);
    const o = n - r;
    return (
      this === t && "function" == typeof Uint8Array.prototype.copyWithin ?
      this.copyWithin(e, r, n) :
      Uint8Array.prototype.set.call(t, this.subarray(r, n), e),
      o
    );
  }),
  (f.prototype.fill = function(t, e, r, n) {
    if ("string" == typeof t) {
      if (
        ("string" == typeof e ?
          ((n = e), (e = 0), (r = this.length)) :
          "string" == typeof r && ((n = r), (r = this.length)),
          void 0 !== n && "string" != typeof n)
      )
        throw new TypeError("encoding must be a string");
      if ("string" == typeof n && !f.isEncoding(n))
        throw new TypeError("Unknown encoding: " + n);
      if (1 === t.length) {
        const e = t.charCodeAt(0);
        (("utf8" === n && e < 128) || "latin1" === n) && (t = e);
      }
    } else
      "number" == typeof t ?
      (t &= 255) :
      "boolean" == typeof t && (t = Number(t));
    if (e < 0 || this.length < e || this.length < r)
      throw new RangeError("Out of range index");
    if (r <= e) return this;
    let o;
    if (
      ((e >>>= 0),
        (r = void 0 === r ? this.length : r >>> 0),
        t || (t = 0),
        "number" == typeof t)
    )
      for (o = e; o < r; ++o) this[o] = t;
    else {
      const i = f.isBuffer(t) ? t : f.from(t, n),
        s = i.length;
      if (0 === s)
        throw new TypeError(
          'The value "' + t + '" is invalid for argument "value"'
        );
      for (o = 0; o < r - e; ++o) this[o + e] = i[o % s];
    }
    return this;
  });
  const P = {};

  function k(t, e, r) {
    P[t] = class extends r {
      constructor() {
        super(),
          Object.defineProperty(this, "message", {
            value: e.apply(this, arguments),
            writable: !0,
            configurable: !0
          }),
          (this.name = `${this.name} [${t}]`),
          this.stack,
          delete this.name;
      }
      get code() {
        return t;
      }
      set code(t) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: t,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${t}]: ${this.message}`;
      }
    };
  }

  function D(t) {
    let e = "",
      r = t.length;
    const n = "-" === t[0] ? 1 : 0;
    for (; r >= n + 4; r -= 3) e = `_${t.slice(r - 3, r)}${e}`;
    return `${t.slice(0, r)}${e}`;
  }

  function j(t, e, r, n, o, i) {
    if (t > r || t < e) {
      const n = "bigint" == typeof e ? "n" : "";
      let o;
      throw (
        ((o =
            i > 3 ?
            0 === e || e === BigInt(0) ?
            `>= 0${n} and < 2${n} ** ${8 * (i + 1)}${n}` :
            `>= -(2${n} ** ${8 * (i + 1) - 1}${n}) and < 2 ** ${
                  8 * (i + 1) - 1
                }${n}` :
            `>= ${e}${n} and <= ${r}${n}`),
          new P.ERR_OUT_OF_RANGE("value", o, t))
      );
    }!(function(t, e, r) {
      F(e, "offset"),
        (void 0 === t[e] || void 0 === t[e + r]) && z(e, t.length - (r + 1));
    })(n, o, i);
  }

  function F(t, e) {
    if ("number" != typeof t) throw new P.ERR_INVALID_ARG_TYPE(e, "number", t);
  }

  function z(t, e, r) {
    throw Math.floor(t) !== t ?
      (F(t, r), new P.ERR_OUT_OF_RANGE(r || "offset", "an integer", t)) :
      e < 0 ?
      new P.ERR_BUFFER_OUT_OF_BOUNDS() :
      new P.ERR_OUT_OF_RANGE(r || "offset", `>= ${r ? 1 : 0} and <= ${e}`, t);
  }
  k(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(t) {
        return t ?
          `${t} is outside of buffer bounds` :
          "Attempt to access memory outside buffer bounds";
      },
      RangeError
    ),
    k(
      "ERR_INVALID_ARG_TYPE",
      function(t, e) {
        return `The "${t}" argument must be of type number. Received type ${typeof e}`;
      },
      TypeError
    ),
    k(
      "ERR_OUT_OF_RANGE",
      function(t, e, r) {
        let n = `The value of "${t}" is out of range.`,
          o = r;
        return (
          Number.isInteger(r) && Math.abs(r) > 2 ** 32 ?
          (o = D(String(r))) :
          "bigint" == typeof r &&
          ((o = String(r)),
            (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) &&
            (o = D(o)),
            (o += "n")),
          (n += ` It must be ${e}. Received ${o}`),
          n
        );
      },
      RangeError
    );
  const Y = /[^+/0-9A-Za-z-_]/g;

  function H(t, e) {
    let r;
    e = e || 1 / 0;
    const n = t.length;
    let o = null;
    const i = [];
    for (let f = 0; f < n; ++f) {
      if (((r = t.charCodeAt(f)), r > 55295 && r < 57344)) {
        if (!o) {
          if (r > 56319) {
            (e -= 3) > -1 && i.push(239, 191, 189);
            continue;
          }
          if (f + 1 === n) {
            (e -= 3) > -1 && i.push(239, 191, 189);
            continue;
          }
          o = r;
          continue;
        }
        if (r < 56320) {
          (e -= 3) > -1 && i.push(239, 191, 189), (o = r);
          continue;
        }
        r = 65536 + (((o - 55296) << 10) | (r - 56320));
      } else o && (e -= 3) > -1 && i.push(239, 191, 189);
      if (((o = null), r < 128)) {
        if ((e -= 1) < 0) break;
        i.push(r);
      } else if (r < 2048) {
        if ((e -= 2) < 0) break;
        i.push((r >> 6) | 192, (63 & r) | 128);
      } else if (r < 65536) {
        if ((e -= 3) < 0) break;
        i.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
      } else {
        if (!(r < 1114112)) throw new Error("Invalid code point");
        if ((e -= 4) < 0) break;
        i.push(
          (r >> 18) | 240,
          ((r >> 12) & 63) | 128,
          ((r >> 6) & 63) | 128,
          (63 & r) | 128
        );
      }
    }
    return i;
  }

  function q(t) {
    return e.toByteArray(
      (function(t) {
        if ((t = (t = t.split("=")[0]).trim().replace(Y, "")).length < 2)
          return "";
        for (; t.length % 4 != 0;) t += "=";
        return t;
      })(t)
    );
  }

  function W(t, e, r, n) {
    let o;
    for (o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o)
      e[o + r] = t[o];
    return o;
  }

  function X(t, e) {
    return (
      t instanceof e ||
      (null != t &&
        null != t.constructor &&
        null != t.constructor.name &&
        t.constructor.name === e.name)
    );
  }

  function J(t) {
    return t != t;
  }
  const Z = (function() {
    const t = "0123456789abcdef",
      e = new Array(256);
    for (let r = 0; r < 16; ++r) {
      const n = 16 * r;
      for (let o = 0; o < 16; ++o) e[n + o] = t[r] + t[o];
    }
    return e;
  })();

  function K(t) {
    return typeof BigInt > "u" ? Q : t;
  }

  function Q() {
    throw new Error("BigInt not supported");
  }
})(ur);
const Pr = (exports.default = ur.Buffer);
globalThis.Buffer = Pr;
//# sourceMappingURL=/sm/b1d4c0ce7b18f801987dc33ac902cfe01bdf90be5918e4a221f440da81c4f1e9.map

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Attr = Attr;
exports.CDATASection = CDATASection;
exports.CharacterData = CharacterData;
exports.Comment = Comment;
exports.DOMParser = exports.CustomEvent = void 0;
exports.Document = Document;
exports.DocumentFragment = DocumentFragment;
exports.DocumentType = DocumentType;
exports.Element = Element;
exports.InputEvent =
  exports.HTMLVideoElement =
  exports.HTMLUnknownElement =
  exports.HTMLUListElement =
  exports.HTMLTrackElement =
  exports.HTMLTitleElement =
  exports.HTMLTimeElement =
  exports.HTMLTextAreaElement =
  exports.HTMLTemplateElement =
  exports.HTMLTableRowElement =
  exports.HTMLTableElement =
  exports.HTMLTableCellElement =
  exports.HTMLTableCaptionElement =
  exports.HTMLStyleElement =
  exports.HTMLSpanElement =
  exports.HTMLSourceElement =
  exports.HTMLSlotElement =
  exports.HTMLSelectElement =
  exports.HTMLScriptElement =
  exports.HTMLQuoteElement =
  exports.HTMLProgressElement =
  exports.HTMLPreElement =
  exports.HTMLPictureElement =
  exports.HTMLParamElement =
  exports.HTMLParagraphElement =
  exports.HTMLOutputElement =
  exports.HTMLOptionElement =
  exports.HTMLOptGroupElement =
  exports.HTMLObjectElement =
  exports.HTMLOListElement =
  exports.HTMLModElement =
  exports.HTMLMeterElement =
  exports.HTMLMetaElement =
  exports.HTMLMenuElement =
  exports.HTMLMediaElement =
  exports.HTMLMarqueeElement =
  exports.HTMLMapElement =
  exports.HTMLLinkElement =
  exports.HTMLLegendElement =
  exports.HTMLLabelElement =
  exports.HTMLLIElement =
  exports.HTMLInputElement =
  exports.HTMLImageElement =
  exports.HTMLIFrameElement =
  exports.HTMLHtmlElement =
  exports.HTMLHeadingElement =
  exports.HTMLHeadElement =
  exports.HTMLHRElement =
  exports.HTMLFrameSetElement =
  exports.HTMLFrameElement =
  exports.HTMLFormElement =
  exports.HTMLFontElement =
  exports.HTMLFieldSetElement =
  exports.HTMLEmbedElement =
  exports.HTMLElement =
  exports.HTMLDivElement =
  exports.HTMLDirectoryElement =
  exports.HTMLDetailsElement =
  exports.HTMLDataListElement =
  exports.HTMLDataElement =
  exports.HTMLDListElement =
  exports.HTMLClasses =
  exports.HTMLCanvasElement =
  exports.HTMLButtonElement =
  exports.HTMLBodyElement =
  exports.HTMLBaseElement =
  exports.HTMLBRElement =
  exports.HTMLAudioElement =
  exports.HTMLAreaElement =
  exports.HTMLAnchorElement =
  exports.Facades =
  exports.EventTarget =
  exports.Event =
  void 0;
exports.Node = Node;
exports.NodeList = exports.NodeFilter = void 0;
exports.SVGElement = SVGElement;
exports.ShadowRoot = ShadowRoot;
exports.Text = Text;
exports.toJSON =
  exports.parseJSON =
  exports.parseHTML =
  exports.illegalConstructor =
  void 0;
/**
 * Minified by jsDelivr using Terser v5.48.0.
 * Original file: /npm/linkedom@0.18.13/worker.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
const CHANGED = Symbol("changed"),
  CLASS_LIST = Symbol("classList"),
  CUSTOM_ELEMENTS = Symbol("CustomElements"),
  CONTENT = Symbol("content"),
  DATASET = Symbol("dataset"),
  DOCTYPE = Symbol("doctype"),
  DOM_PARSER = Symbol("DOMParser"),
  END = Symbol("end"),
  EVENT_TARGET = Symbol("EventTarget"),
  GLOBALS = Symbol("globals"),
  IMAGE = Symbol("image"),
  MIME = Symbol("mime"),
  MUTATION_OBSERVER = Symbol("MutationObserver"),
  NEXT = Symbol("next"),
  OWNER_ELEMENT = Symbol("ownerElement"),
  PREV = Symbol("prev"),
  PRIVATE = Symbol("private"),
  SHEET = Symbol("sheet"),
  START = Symbol("start"),
  STYLE = Symbol("style"),
  UPGRADE = Symbol("upgrade"),
  VALUE = Symbol("value");
var _a;
const decodeMap = new Map([
    [0, 65533],
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376]
  ]),
  fromCodePoint =
  null !== (_a = String.fromCodePoint) && void 0 !== _a ?
  _a :
  (e) => {
    let t = "";
    return (
      e > 65535 &&
      ((e -= 65536),
        (t += String.fromCharCode(((e >>> 10) & 1023) | 55296)),
        (e = 56320 | (1023 & e))),
      (t += String.fromCharCode(e)),
      t
    );
  };

function replaceCodePoint(e) {
  var t;
  return (e >= 55296 && e <= 57343) || e > 1114111 ?
    65533 :
    null !== (t = decodeMap.get(e)) && void 0 !== t ?
    t :
    e;
}

function decodeBase64(e) {
  const t =
    "function" == typeof atob ?
    atob(e) :
    "function" == typeof Buffer.from ?
    Buffer.from(e, "base64").toString("binary") :
    new Buffer(e, "base64").toString("binary"),
    n = -2 & t.length,
    s = new Uint16Array(n / 2);
  for (let e = 0, r = 0; e < n; e += 2) {
    const n = t.charCodeAt(e),
      i = t.charCodeAt(e + 1);
    s[r++] = n | (i << 8);
  }
  return s;
}
const htmlDecodeTree = decodeBase64(
    "QR08ALkAAgH6AYsDNQR2BO0EPgXZBQEGLAbdBxMISQrvCmQLfQurDKQNLw4fD4YPpA+6D/IPAAAAAAAAAAAAAAAAKhBMEY8TmxUWF2EYLBkxGuAa3RsJHDscWR8YIC8jSCSIJcMl6ie3Ku8rEC0CLjoupS7kLgAIRU1hYmNmZ2xtbm9wcnN0dVQAWgBeAGUAaQBzAHcAfgCBAIQAhwCSAJoAoACsALMAbABpAGcAO4DGAMZAUAA7gCYAJkBjAHUAdABlADuAwQDBQHIiZXZlAAJhAAFpeW0AcgByAGMAO4DCAMJAEGRyAADgNdgE3XIAYQB2AGUAO4DAAMBA8CFoYZFj4SFjcgBhZAAAoFMqAAFncIsAjgBvAG4ABGFmAADgNdg43fAlbHlGdW5jdGlvbgCgYSBpAG4AZwA7gMUAxUAAAWNzpACoAHIAAOA12Jzc6SFnbgCgVCJpAGwAZABlADuAwwDDQG0AbAA7gMQAxEAABGFjZWZvcnN1xQDYANoA7QDxAPYA+QD8AAABY3LJAM8AayNzbGFzaAAAoBYidgHTANUAAKDnKmUAZAAAoAYjeQARZIABY3J0AOAA5QDrAGEidXNlAACgNSLuI291bGxpcwCgLCFhAJJjcgAA4DXYBd1wAGYAAOA12Dnd5SF2ZdhiYwDyAOoAbSJwZXEAAKBOIgAHSE9hY2RlZmhpbG9yc3UXARoBHwE6AVIBVQFiAWQBZgGCAakB6QHtAfIBYwB5ACdkUABZADuAqQCpQIABY3B5ACUBKAE1AfUhdGUGYWmg0iJ0KGFsRGlmZmVyZW50aWFsRAAAoEUhbCJleXMAAKAtIQACYWVpb0EBRAFKAU0B8iFvbgxhZABpAGwAO4DHAMdAcgBjAAhhbiJpbnQAAKAwIm8AdAAKYQABZG5ZAV0BaSJsbGEAuGB0I2VyRG90ALdg8gA5AWkAp2NyImNsZQAAAkRNUFRwAXQBeQF9AW8AdAAAoJkiaSJudXMAAKCWIuwhdXMAoJUiaSJtZXMAAKCXIm8AAAFjc4cBlAFrKndpc2VDb250b3VySW50ZWdyYWwAAKAyImUjQ3VybHkAAAFEUZwBpAFvJXVibGVRdW90ZQAAoB0gdSJvdGUAAKAZIAACbG5wdbABtgHNAdgBbwBuAGWgNyIAoHQqgAFnaXQAvAHBAcUB8iJ1ZW50AKBhIm4AdAAAoC8i7yV1ckludGVncmFsAKAuIgABZnLRAdMBAKACIe8iZHVjdACgECJuLnRlckNsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbAAAoDMi7yFzcwCgLypjAHIAAOA12J7ccABDoNMiYQBwAACgTSKABURKU1phY2VmaW9zAAsCEgIVAhgCGwIsAjQCOQI9AnMCfwNvoEUh9CJyYWhkAKARKWMAeQACZGMAeQAFZGMAeQAPZIABZ3JzACECJQIoAuchZXIAoCEgcgAAoKEhaAB2AACg5CoAAWF5MAIzAvIhb24OYRRkbAB0oAciYQCUY3IAAOA12AfdAAFhZkECawIAAWNtRQJnAvIjaXRpY2FsAAJBREdUUAJUAl8CYwJjInV0ZQC0YG8AdAFZAloC2WJiJGxlQWN1dGUA3WJyImF2ZQBgYGkibGRlANxi7yFuZACgxCJmJWVyZW50aWFsRAAAoEYhcAR9AgAAAAAAAIECjgIAABoDZgAA4DXYO91EoagAhQKJAm8AdAAAoNwgcSJ1YWwAAKBQIuIhbGUAA0NETFJVVpkCqAK1Au8C/wIRA28AbgB0AG8AdQByAEkAbgB0AGUAZwByAGEA7ADEAW8AdAKvAgAAAACwAqhgbiNBcnJvdwAAoNMhAAFlb7kC0AJmAHQAgAFBUlQAwQLGAs0CciJyb3cAAKDQIekkZ2h0QXJyb3cAoNQhZQDlACsCbgBnAAABTFLWAugC5SFmdAABQVLcAuECciJyb3cAAKD4J+kkZ2h0QXJyb3cAoPon6SRnaHRBcnJvdwCg+SdpImdodAAAAUFU9gL7AnIicm93AACg0iFlAGUAAKCoInAAQQIGAwAAAAALA3Iicm93AACg0SFvJHduQXJyb3cAAKDVIWUlcnRpY2FsQmFyAACgJSJuAAADQUJMUlRhJAM2AzoDWgNxA3oDciJyb3cAAKGTIUJVLAMwA2EAcgAAoBMpcCNBcnJvdwAAoPUhciJldmUAEWPlIWZ00gJDAwAASwMAAFIDaSVnaHRWZWN0b3IAAKBQKWUkZVZlY3RvcgAAoF4p5SJjdG9yQqC9IWEAcgAAoFYpaSJnaHQA1AFiAwAAaQNlJGVWZWN0b3IAAKBfKeUiY3RvckKgwSFhAHIAAKBXKWUAZQBBoKQiciJyb3cAAKCnIXIAcgBvAPcAtAIAAWN0gwOHA3IA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YwAAoN8i4SFycnCgtiEAoD0pgKIqImJjZG9zACsVMBU6FT4VQRVyImNhcAAAoEgqAAFhdTQVNxVwAACgRipwAACgSipvAHQAAKCNInIAAKBFKgDgKiIA/gACYWxydksVURVuFXMVcgByAG2gtyEAoDwpeQCAAWV2dwBYFWUVaRVxAHACXxUAAAAAYxVyAGUA4wAXFXUA4wAZFWUAZQAAoM4iZSJkZ2UAAKDPImUAbgA7gKQApEBlI2Fycm93AAABbHJ7FX8V5SFmdACgtiFpImdodAAAoLchZQDkAG0VAAFjaYsVkRVvAG4AaQBuAPQAkwFuAHQAAKAxImwiY3R5AACgLSOACUFIYWJjZGVmaGlqbG9yc3R1d3oAuBW7Fb8V1RXgFegV+RUKFhUWHxZUFlcWZRbFFtsW7xb7FgUXChdyAPIAtAJhAHIAAKBlKQACZ2xyc8YVyhXOFdAV5yFlcgCgICDlIXRoAKA4IfIA9QxoAHagECAAoKMiawHZFd4VYSJyb3cAAKAPKWEA4wBfAgABYXnkFecV8iFvbg9hNGQAoUYhYW/tFfQVAAFnciEC8RVyAACgyiF0InNlcQAAoHcqgAFnbG0A/xUCFgUWO4CwALBAdABhALRjcCJ0eXYAAKCxKQABaXIOFhIW8yFodACgfykA4DXYId1hAHIAAAFschsWHRYAoMMhAKDCIYACYWVnc3YAKBauAjYWOhY+Fm0AAKHEIm9zLhY0Fm4AZABzoMQi9SFpdACgZiZhIm1tYQDdY2kAbgAAoPIiAKH3AGlvQxZRFmQAZQAAgfcAO29KFksW90BuI3RpbWVzAACgxyJuAPgAUBZjAHkAUmRjAG8CXhYAAAAAYhZyAG4AAKAeI28AcAAAoA0jgAJscHR1dwBuFnEWdRaSFp4W7CFhciRgZgAA4DXYVd0AotkCZW1wc30WhBaJFo0WcQBkoFAibwB0AACgUSJpIm51cwAAoDgi7CF1cwCgFCLxInVhcmUAoKEiYgBsAGUAYgBhAHIAdwBlAGQAZwDlANcAbgCAAWFkaAClFqoWtBZyAHIAbwD3APUMbwB3AG4AYQByAHIAbwB3APMA8xVhI3Jwb29uAAABbHK8FsAWZQBmAPQAHBZpAGcAaAD0AB4WYgHJFs8WawBhAHIAbwD3AJILbwLUFgAAAADYFnIAbgAAoB8jbwBwAACgDCOAAWNvdADhFukW7BYAAXJ55RboFgDgNdi53FVkbAAAoPYp8iFvaxFhAAFkcvMW9xZvAHQAAKDxImkA5qC/JVsSAAFhaP8WAhdyAPIANQNhAPIA1wvhIm5nbGUAoKYpAAFjaQ4XEBd5AF9k5yJyYXJyAKD/JwAJRGFjZGVmZ2xtbm9wcXJzdHV4MRc4F0YXWxcyBF4XaRd5F40XrBe0F78X2RcVGCEYLRg1GEAYAAFEbzUXgRZvAPQA+BUAAWNzPBdCF3UAdABlADuA6QDpQPQhZXIAoG4qAAJhaW95TRdQF1YXWhfyIW9uG2FyAGOgViI7gOoA6kDsIW9uAKBVIk1kbwB0ABdhAAFEcmIXZhdvAHQAAKBSIgDgNdgi3XKhmipuF3QXYQB2AGUAO4DoAOhAZKCWKm8AdAAAoJgqgKGZKmlscwCAF4UXhxfuInRlcnMAoOcjAKATIWSglSpvAHQAAKCXKoABYXBzAJMXlheiF2MAcgATYXQAeQBzogUinxcAAAAAoRdlAHQAAKAFInAAMaADIDMBqRerFwCgBCAAoAUgAAFnc7AXsRdLYXAAAKACIAABZ3C4F7sXbwBuABlhZgAA4DXYVt2AAWFscwDFF8sXzxdyAHOg1SJsAACg4yl1AHMAAKBxKmkAAKG1A2x21RfYF28AbgC1Y/VjAAJjc3V24BfoF/0XEBgAAWlv5BdWF3IAYwAAoFYiaQLuFwAAAADwF+0ADQThIW50AAFnbPUX+Rd0AHIAAKCWKuUhc3MAoJUqgAFhZWkAAxgGGAoYbABzAD1gcwB0AACgXyJ2AESgYSJEAACgeCrwImFyc2wAoOUpAAFEYRkYHRhvAHQAAKBTInIAcgAAoHEpgAFjZGkAJxgqGO0XcgAAoC8hbwD0AIwCAAFhaDEYMhi3YzuA8ADwQAABbXI5GD0YbAA7gOsA60BvAACgrCCAAWNpcABGGEgYSxhsACFgcwD0ACwEAAFlb08YVxhjAHQAYQB0AGkAbwDuABoEbgBlAG4AdABpAGEAbADlADME4Ql1GAAAgRgAAIMYiBgAAAAAoRilGAAAqhgAALsYvhjRGAAA1xgnGWwAbABpAG4AZwBkAG8AdABzAGUA8QBlF3kARGRtImFsZQAAoEAmgAFpbHIAjRiRGJ0Y7CFpZwCgA/tpApcYAAAAAJoYZwAAoAD7aQBnAACgBPsA4DXYI93sIWlnAKAB++whaWcA4GYAagCAAWFsdACvGLIYthh0AACgbSZpAGcAAKAC+24AcwAAoLElbwBmAJJh8AHCGAAAxhhmAADgNdhX3QABYWvJGMwYbADsAGsEdqDUIgCg2SphI3J0aW50AACgDSoAAWFv2hgiGQABY3PeGB8ZsQPnGP0YBRkSGRUZAAAdGbID7xjyGPQY9xj5GAAA+xg7gL0AvUAAoFMhO4C8ALxAAKBVIQCgWSEAoFshswEBGQAAAxkAoFQhAKBWIbQCCxkOGQAAAAAQGTuAvgC+QACgVyEAoFwhNQAAoFghtgEZGQAAGxkAoFohAKBdITgAAKBeIWwAAKBEIHcAbgAAoCIjYwByAADgNdi73IAIRWFiY2RlZmdpamxub3JzdHYARhlKGVoZXhlmGWkZkhmWGZkZnRmgGa0ZxhnLGc8Z4BkjGmygZyIAoIwqgAFjbXAAUBlTGVgZ9SF0ZfVhbQBhAOSgswM6FgCghipyImV2ZQAfYQABaXliGWUZcgBjAB1hM2RvAHQAIWGAoWUibHFzAMYEcBl6GfGhZSLOBAAAdhlsAGEAbgD0AN8EgKF+KmNkbACBGYQZjBljAACgqSpvAHQAb6CAKmyggioAoIQqZeDbIgD+cwAAoJQqcgAA4DXYJN3noGsirATtIWVsAKA3IWMAeQBTZIChdyJFYWoApxmpGasZAKCSKgCgpSoAoKQqAAJFYWVztBm2Gb0ZwhkAoGkicABwoIoq8iFveACgiipxoIgq8aCIKrUZaQBtAACg5yJwAGYAAOA12FjdYQB2AOUAYwIAAWNp0xnWGXIAAKAKIW0AAKFzImVs3BneGQCgjioAoJAqAIM+ADtjZGxxco0E6xn0GfgZ/BkBGgABY2nvGfEZAKCnKnIAAKB6Km8AdAAAoNci0CFhcgCglSl1ImVzdAAAoHwqgAJhZGVscwAKGvQZFhrVBCAa8AEPGgAAFBpwAHIAbwD4AFkZcgAAoHgpcQAAAWxxxAQbGmwAZQBzAPMASRlpAO0A5AQAAWVuJxouGnIjdG5lcXEAAOBpIgD+xQAsGgAFQWFiY2Vma29zeUAaQxpmGmoabRqDGocalhrCGtMacgDyAMwCAAJpbG1yShpOGlAaVBpyAHMA8ABxD2YAvWBpAGwA9AASBQABZHJYGlsaYwB5AEpkAKGUIWN3YBpkGmkAcgAAoEgpAKCtIWEAcgAAoA8h6SFyYyVhgAFhbHIAcxp7Gn8a8iF0c3WgZSZpAHQAAKBlJuwhaXAAoCYg4yFvbgCguSJyAADgNdgl3XMAAAFld4wakRphInJvdwAAoCUpYSJyb3cAAKAmKYACYW1vcHIAnxqjGqcauhq+GnIAcgAAoP8h9CFodACgOyJrAAABbHKsGrMaZSRmdGFycm93AACgqSHpJGdodGFycm93AKCqIWYAAOA12Fnd4iFhcgCgFSCAAWNsdADIGswa0BpyAADgNdi93GEAcwDoAGka8iFvaydhAAFicNca2xr1IWxsAKBDIOghZW4AoBAg4Qr2GgAA/RoAAAgbExsaGwAAIRs7GwAAAAA+G2IbmRuVG6sbAACyG80b0htjAHUAdABlADuA7QDtQAChYyBpeQEbBhtyAGMAO4DuAO5AOGQAAWN4CxsNG3kANWRjAGwAO4ChAKFAAAFmcssCFhsA4DXYJt1yAGEAdgBlADuA7ADsQIChSCFpbm8AJxsyGzYbAAFpbisbLxtuAHQAAKAMKnQAAKAtIuYhaW4AoNwpdABhAACgKSHsIWlnM2GAAWFvcABDG1sbXhuAAWNndABJG0sbWRtyACthgAFlbHAAcQVRG1UbaQBuAOUAyAVhAHIA9AByBWgAMWFmAACgtyJlAGQAtWEAoggiY2ZvdGkbbRt1G3kb4SFyZQCgBSFpAG4AdKAeImkAZQAAoN0pZABvAPQAWxsAoisiY2VscIEbhRuPG5QbYQBsAACguiIAAWdyiRuNG2UAcgDzACMQ4wCCG2EicmhrAACgFyryIW9kAKA8KgACY2dwdJ8boRukG6gbeQBRZG8AbgAvYWYAAOA12FrdYQC5Y3UAZQBzAHQAO4C/AL9AAAFjabUbuRtyAADgNdi+3G4AAKIIIkVkc3bCG8QbyBvQAwCg+SJvAHQAAKD1Inag9CIAoPMiaaBiIOwhZGUpYesB1hsAANkbYwB5AFZkbAA7gO8A70AAA2NmbW9zdeYb7hvyG/Ub+hsFHAABaXnqG+0bcgBjADVhOWRyAADgNdgn3eEhdGg3YnAAZgAA4DXYW93jAf8bAAADHHIAAOA12L/c8iFjeVhk6yFjeVRkAARhY2ZnaGpvcxUcGhwiHCYcKhwtHDAcNRzwIXBhdqC6A/BjAAFleR4cIRzkIWls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ZmdobG1vcHJzdHV3CiwNLBEsHSwnLDEsQCxLLFIsYix6LIQsjyzLLOgs7Sz/LAotcgDyAAkDYQByAACgYykAAWNyFSwbLHUAdABlADuA+gD6QPIACQ1yAOMBIywAACUseQBeZHYAZQBtYQABaXkrLDAscgBjADuA+wD7QENkgAFhYmgANyw6LD0scgDyANEO7CFhY3FhYQDyAOAOAAFpckQsSCzzIWh0AKB+KQDgNdgy3XIAYQB2AGUAO4D5APlAYQFWLF8scgAAAWxyWixcLACgvyEAoL4hbABrAACggCUAAWN0Zix2LG8CbCwAAAAAcyxyAG4AZaAcI3IAAKAcI28AcAAAoA8jcgBpAACg+CUAAWFsfiyBLGMAcgBrYTuAqACoQAABZ3CILIssbwBuAHNhZgAA4DXYZt0AA2FkaGxzdZksniynLLgsuyzFLHIAcgBvAPcACQ1vAHcAbgBhAHIAcgBvAPcA2A5hI3Jwb29uAAABbHKvLLMsZQBmAPQAWyxpAGcAaAD0AF0sdQDzAKYOaQAAocUDaGzBLMIs0mNvAG4AxWPwI2Fycm93cwCgyCGAAWNpdADRLOEs5CxvAtcsAAAAAN4scgBuAGWgHSNyAACgHSNvAHAAAKAOI24AZwBvYXIAaQAAoPklYwByAADgNdjK3IABZGlyAPMs9yz6LG8AdAAAoPAi7CFkZWlhaQBmoLUlAKC0JQABYW0DLQYtcgDyAMosbAA7gPwA/EDhIm5nbGUAoKcpgAdBQkRhY2RlZmxub3Byc3oAJy0qLTAtNC2bLZ0toS2/LcMtxy3TLdgt3C3gLfwtcgDyABADYQByAHag6CoAoOkqYQBzAOgA/gIAAW5yOC08LechcnQAoJwpgANla25wcnN0AJkpSC1NLVQtXi1iLYItYQBwAHAA4QAaHG8AdABoAGkAbgDnAKEXgAFoaXIAoSmzJFotbwBwAPQAdCVooJUh7wD4JgABaXVmLWotZwBtAOEAuygAAWJwbi14LXMjZXRuZXEAceCKIgD+AODLKgD+cyNldG5lcQBx4IsiAP4A4MwqAP4AAWhyhi2KLWUAdADhABIraSNhbmdsZQAAAWxyki2WLeUhZnQAoLIiaSJnaHQAAKCzInkAMmThIXNoAKCiIoABZWxyAKcttC24LWKiKCKuLQAAAACyLWEAcgAAoLsicQAAoFoi7CFpcACg7iIAAWJ0vC1eD2EA8gBfD3IAAOA12DPddAByAOkAlS1zAHUAAAFicM0t0C0A4IIi0iAA4IMi0iBwAGYAAOA12GfdcgBvAPAAWQt0AHIA6QCaLQABY3XkLegtcgAA4DXYy9wAAWJw7C30LW4AAAFFZXUt8S0A4IoiAP5uAAABRWV/LfktAOCLIgD+6SJnemFnAKCaKYADY2Vmb3BycwANLhAuJS4pLiMuLi40LukhcmN1YQABZGkULiEuAAFiZxguHC5hAHIAAKBfKmUAcaAnIgCgWSLlIXJwAKAYIXIAAOA12DTdcABmAADgNdho3WWgQCJhAHQA6ABqD2MAcgAA4DXYzNzjCuQRUC4AAFQuAABYLmIuAAAAAGMubS5wLnQuAAAAAIguki4AAJouJxIqEnQAcgDpAB0ScgAA4DXYNd0AAUFhWy5eLnIA8gDnAnIA8gCTB75jAAFBYWYuaS5yAPIA4AJyAPIAjAdhAPAAeh5pAHMAAKD7IoABZHB0APgReS6DLgABZmx9LoAuAOA12GnddQDzAP8RaQBtAOUABBIAAUFhiy6OLnIA8gDuAnIA8gCaBwABY3GVLgoScgAA4DXYzdwAAXB0nS6hLmwAdQDzACUScgDpACASAARhY2VmaW9zdbEuvC7ELsguzC7PLtQu2S5jAAABdXm2LrsudABlADuA/QD9QE9kAAFpecAuwy5yAGMAd2FLZG4AO4ClAKVAcgAA4DXYNt1jAHkAV2RwAGYAAOA12GrdYwByAADgNdjO3AABY23dLt8ueQBOZGwAO4D/AP9AAAVhY2RlZmhpb3N38y73Lv8uAi8MLxAvEy8YLx0vIi9jInV0ZQB6YQABYXn7Lv4u8iFvbn5hN2RvAHQAfGEAAWV0Bi8KL3QAcgDmAB8QYQC2Y3IAAOA12DfdYwB5ADZk5yJyYXJyAKDdIXAAZgAA4DXYa91jAHIAAOA12M/cAAFqbiYvKC8AoA0gagAAoAwg"
  ),
  xmlDecodeTree = decodeBase64(
    "AAJhZ2xxBwARABMAFQBtAg0AAAAAAA8AcAAmYG8AcwAnYHQAPmB0ADxg9SFvdCJg"
  );
var BinTrieFlags, CharCodes$1;
!(function(e) {
  (e[(e.VALUE_LENGTH = 49152)] = "VALUE_LENGTH"),
  (e[(e.FLAG13 = 8192)] = "FLAG13"),
  (e[(e.BRANCH_LENGTH = 8064)] = "BRANCH_LENGTH"),
  (e[(e.JUMP_TABLE = 127)] = "JUMP_TABLE");
})(BinTrieFlags || (BinTrieFlags = {})),
(function(e) {
  (e[(e.NUM = 35)] = "NUM"),
  (e[(e.SEMI = 59)] = "SEMI"),
  (e[(e.EQUALS = 61)] = "EQUALS"),
  (e[(e.ZERO = 48)] = "ZERO"),
  (e[(e.NINE = 57)] = "NINE"),
  (e[(e.LOWER_A = 97)] = "LOWER_A"),
  (e[(e.LOWER_F = 102)] = "LOWER_F"),
  (e[(e.LOWER_X = 120)] = "LOWER_X"),
  (e[(e.LOWER_Z = 122)] = "LOWER_Z"),
  (e[(e.UPPER_A = 65)] = "UPPER_A"),
  (e[(e.UPPER_F = 70)] = "UPPER_F"),
  (e[(e.UPPER_Z = 90)] = "UPPER_Z");
})(CharCodes$1 || (CharCodes$1 = {}));
const TO_LOWER_BIT = 32;

function isNumber(e) {
  return e >= CharCodes$1.ZERO && e <= CharCodes$1.NINE;
}

function isHexadecimalCharacter(e) {
  return (
    (e >= CharCodes$1.UPPER_A && e <= CharCodes$1.UPPER_F) ||
    (e >= CharCodes$1.LOWER_A && e <= CharCodes$1.LOWER_F)
  );
}

function isAsciiAlphaNumeric(e) {
  return (
    (e >= CharCodes$1.UPPER_A && e <= CharCodes$1.UPPER_Z) ||
    (e >= CharCodes$1.LOWER_A && e <= CharCodes$1.LOWER_Z) ||
    isNumber(e)
  );
}

function isEntityInAttributeInvalidEnd(e) {
  return e === CharCodes$1.EQUALS || isAsciiAlphaNumeric(e);
}
var EntityDecoderState, DecodingMode, CharCodes, State, QuoteType;
!(function(e) {
  (e[(e.EntityStart = 0)] = "EntityStart"),
  (e[(e.NumericStart = 1)] = "NumericStart"),
  (e[(e.NumericDecimal = 2)] = "NumericDecimal"),
  (e[(e.NumericHex = 3)] = "NumericHex"),
  (e[(e.NamedEntity = 4)] = "NamedEntity");
})(EntityDecoderState || (EntityDecoderState = {})),
(function(e) {
  (e[(e.Legacy = 0)] = "Legacy"),
  (e[(e.Strict = 1)] = "Strict"),
  (e[(e.Attribute = 2)] = "Attribute");
})(DecodingMode || (DecodingMode = {}));
class EntityDecoder {
  constructor(e, t, n) {
    (this.decodeTree = e),
    (this.emitCodePoint = t),
    (this.errors = n),
    (this.state = EntityDecoderState.EntityStart),
    (this.consumed = 1),
    (this.result = 0),
    (this.treeIndex = 0),
    (this.excess = 1),
    (this.decodeMode = DecodingMode.Strict),
    (this.runConsumed = 0);
  }
  startEntity(e) {
    (this.decodeMode = e),
    (this.state = EntityDecoderState.EntityStart),
    (this.result = 0),
    (this.treeIndex = 0),
    (this.excess = 1),
    (this.consumed = 1),
    (this.runConsumed = 0);
  }
  write(e, t) {
    switch (this.state) {
      case EntityDecoderState.EntityStart:
        return e.charCodeAt(t) === CharCodes$1.NUM ?
          ((this.state = EntityDecoderState.NumericStart),
            (this.consumed += 1),
            this.stateNumericStart(e, t + 1)) :
          ((this.state = EntityDecoderState.NamedEntity),
            this.stateNamedEntity(e, t));
      case EntityDecoderState.NumericStart:
        return this.stateNumericStart(e, t);
      case EntityDecoderState.NumericDecimal:
        return this.stateNumericDecimal(e, t);
      case EntityDecoderState.NumericHex:
        return this.stateNumericHex(e, t);
      case EntityDecoderState.NamedEntity:
        return this.stateNamedEntity(e, t);
    }
  }
  stateNumericStart(e, t) {
    return t >= e.length ?
      -1 :
      (32 | e.charCodeAt(t)) === CharCodes$1.LOWER_X ?
      ((this.state = EntityDecoderState.NumericHex),
        (this.consumed += 1),
        this.stateNumericHex(e, t + 1)) :
      ((this.state = EntityDecoderState.NumericDecimal),
        this.stateNumericDecimal(e, t));
  }
  stateNumericHex(e, t) {
    for (; t < e.length;) {
      const n = e.charCodeAt(t);
      if (!isNumber(n) && !isHexadecimalCharacter(n))
        return this.emitNumericEntity(n, 3);
      {
        const e =
          n <= CharCodes$1.NINE ?
          n - CharCodes$1.ZERO :
          (32 | n) - CharCodes$1.LOWER_A + 10;
        (this.result = 16 * this.result + e), this.consumed++, t++;
      }
    }
    return -1;
  }
  stateNumericDecimal(e, t) {
    for (; t < e.length;) {
      const n = e.charCodeAt(t);
      if (!isNumber(n)) return this.emitNumericEntity(n, 2);
      (this.result = 10 * this.result + (n - CharCodes$1.ZERO)),
      this.consumed++,
        t++;
    }
    return -1;
  }
  emitNumericEntity(e, t) {
    var n;
    if (this.consumed <= t)
      return (
        null === (n = this.errors) ||
        void 0 === n ||
        n.absenceOfDigitsInNumericCharacterReference(this.consumed),
        0
      );
    if (e === CharCodes$1.SEMI) this.consumed += 1;
    else if (this.decodeMode === DecodingMode.Strict) return 0;
    return (
      this.emitCodePoint(replaceCodePoint(this.result), this.consumed),
      this.errors &&
      (e !== CharCodes$1.SEMI &&
        this.errors.missingSemicolonAfterCharacterReference(),
        this.errors.validateNumericCharacterReference(this.result)),
      this.consumed
    );
  }
  stateNamedEntity(e, t) {
    const {
      decodeTree: n
    } = this;
    let s = n[this.treeIndex],
      r = (s & BinTrieFlags.VALUE_LENGTH) >> 14;
    for (; t < e.length;) {
      if (0 === r && 0 !== (s & BinTrieFlags.FLAG13)) {
        const i = (s & BinTrieFlags.BRANCH_LENGTH) >> 7;
        if (0 === this.runConsumed) {
          const n = s & BinTrieFlags.JUMP_TABLE;
          if (e.charCodeAt(t) !== n)
            return 0 === this.result ? 0 : this.emitNotTerminatedNamedEntity();
          t++, this.excess++, this.runConsumed++;
        }
        for (; this.runConsumed < i;) {
          if (t >= e.length) return -1;
          const s = this.runConsumed - 1,
            r = n[this.treeIndex + 1 + (s >> 1)],
            i = s % 2 == 0 ? 255 & r : (r >> 8) & 255;
          if (e.charCodeAt(t) !== i)
            return (
              (this.runConsumed = 0),
              0 === this.result ? 0 : this.emitNotTerminatedNamedEntity()
            );
          t++, this.excess++, this.runConsumed++;
        }
        (this.runConsumed = 0),
        (this.treeIndex += 1 + (i >> 1)),
        (s = n[this.treeIndex]),
        (r = (s & BinTrieFlags.VALUE_LENGTH) >> 14);
      }
      if (t >= e.length) break;
      const i = e.charCodeAt(t);
      if (i === CharCodes$1.SEMI && 0 !== r && 0 !== (s & BinTrieFlags.FLAG13))
        return this.emitNamedEntityData(
          this.treeIndex,
          r,
          this.consumed + this.excess
        );
      if (
        ((this.treeIndex = determineBranch(
            n,
            s,
            this.treeIndex + Math.max(1, r),
            i
          )),
          this.treeIndex < 0)
      )
        return 0 === this.result ||
          (this.decodeMode === DecodingMode.Attribute &&
            (0 === r || isEntityInAttributeInvalidEnd(i))) ?
          0 :
          this.emitNotTerminatedNamedEntity();
      if (
        ((s = n[this.treeIndex]),
          (r = (s & BinTrieFlags.VALUE_LENGTH) >> 14),
          0 !== r)
      ) {
        if (i === CharCodes$1.SEMI)
          return this.emitNamedEntityData(
            this.treeIndex,
            r,
            this.consumed + this.excess
          );
        this.decodeMode !== DecodingMode.Strict &&
          0 === (s & BinTrieFlags.FLAG13) &&
          ((this.result = this.treeIndex),
            (this.consumed += this.excess),
            (this.excess = 0));
      }
      t++, this.excess++;
    }
    return -1;
  }
  emitNotTerminatedNamedEntity() {
    var e;
    const {
      result: t,
      decodeTree: n
    } = this,
    s = (n[t] & BinTrieFlags.VALUE_LENGTH) >> 14;
    return (
      this.emitNamedEntityData(t, s, this.consumed),
      null === (e = this.errors) ||
      void 0 === e ||
      e.missingSemicolonAfterCharacterReference(),
      this.consumed
    );
  }
  emitNamedEntityData(e, t, n) {
    const {
      decodeTree: s
    } = this;
    return (
      this.emitCodePoint(
        1 === t ?
        s[e] & ~(BinTrieFlags.VALUE_LENGTH | BinTrieFlags.FLAG13) :
        s[e + 1],
        n
      ),
      3 === t && this.emitCodePoint(s[e + 2], n),
      n
    );
  }
  end() {
    var e;
    switch (this.state) {
      case EntityDecoderState.NamedEntity:
        return 0 === this.result ||
          (this.decodeMode === DecodingMode.Attribute &&
            this.result !== this.treeIndex) ?
          0 :
          this.emitNotTerminatedNamedEntity();
      case EntityDecoderState.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case EntityDecoderState.NumericHex:
        return this.emitNumericEntity(0, 3);
      case EntityDecoderState.NumericStart:
        return (
          null === (e = this.errors) ||
          void 0 === e ||
          e.absenceOfDigitsInNumericCharacterReference(this.consumed),
          0
        );
      case EntityDecoderState.EntityStart:
        return 0;
    }
  }
}

function determineBranch(e, t, n, s) {
  const r = (t & BinTrieFlags.BRANCH_LENGTH) >> 7,
    i = t & BinTrieFlags.JUMP_TABLE;
  if (0 === r) return 0 !== i && s === i ? n : -1;
  if (i) {
    const t = s - i;
    return t < 0 || t >= r ? -1 : e[n + t] - 1;
  }
  const o = (r + 1) >> 1;
  let A = 0,
    a = r - 1;
  for (; A <= a;) {
    const t = (A + a) >>> 1,
      r = (e[n + (t >> 1)] >> (8 * (1 & t))) & 255;
    if (r < s) A = t + 1;
    else {
      if (!(r > s)) return e[n + o + t];
      a = t - 1;
    }
  }
  return -1;
}

function isWhitespace$1(e) {
  return (
    e === CharCodes.Space ||
    e === CharCodes.NewLine ||
    e === CharCodes.Tab ||
    e === CharCodes.FormFeed ||
    e === CharCodes.CarriageReturn
  );
}

function isEndOfTagSection(e) {
  return e === CharCodes.Slash || e === CharCodes.Gt || isWhitespace$1(e);
}

function isASCIIAlpha(e) {
  return (
    (e >= CharCodes.LowerA && e <= CharCodes.LowerZ) ||
    (e >= CharCodes.UpperA && e <= CharCodes.UpperZ)
  );
}!(function(e) {
  (e[(e.Tab = 9)] = "Tab"),
  (e[(e.NewLine = 10)] = "NewLine"),
  (e[(e.FormFeed = 12)] = "FormFeed"),
  (e[(e.CarriageReturn = 13)] = "CarriageReturn"),
  (e[(e.Space = 32)] = "Space"),
  (e[(e.ExclamationMark = 33)] = "ExclamationMark"),
  (e[(e.Number = 35)] = "Number"),
  (e[(e.Amp = 38)] = "Amp"),
  (e[(e.SingleQuote = 39)] = "SingleQuote"),
  (e[(e.DoubleQuote = 34)] = "DoubleQuote"),
  (e[(e.Dash = 45)] = "Dash"),
  (e[(e.Slash = 47)] = "Slash"),
  (e[(e.Zero = 48)] = "Zero"),
  (e[(e.Nine = 57)] = "Nine"),
  (e[(e.Semi = 59)] = "Semi"),
  (e[(e.Lt = 60)] = "Lt"),
  (e[(e.Eq = 61)] = "Eq"),
  (e[(e.Gt = 62)] = "Gt"),
  (e[(e.Questionmark = 63)] = "Questionmark"),
  (e[(e.UpperA = 65)] = "UpperA"),
  (e[(e.LowerA = 97)] = "LowerA"),
  (e[(e.UpperF = 70)] = "UpperF"),
  (e[(e.LowerF = 102)] = "LowerF"),
  (e[(e.UpperZ = 90)] = "UpperZ"),
  (e[(e.LowerZ = 122)] = "LowerZ"),
  (e[(e.LowerX = 120)] = "LowerX"),
  (e[(e.OpeningSquareBracket = 91)] = "OpeningSquareBracket");
})(CharCodes || (CharCodes = {})),
(function(e) {
  (e[(e.Text = 1)] = "Text"),
  (e[(e.BeforeTagName = 2)] = "BeforeTagName"),
  (e[(e.InTagName = 3)] = "InTagName"),
  (e[(e.InSelfClosingTag = 4)] = "InSelfClosingTag"),
  (e[(e.BeforeClosingTagName = 5)] = "BeforeClosingTagName"),
  (e[(e.InClosingTagName = 6)] = "InClosingTagName"),
  (e[(e.AfterClosingTagName = 7)] = "AfterClosingTagName"),
  (e[(e.BeforeAttributeName = 8)] = "BeforeAttributeName"),
  (e[(e.InAttributeName = 9)] = "InAttributeName"),
  (e[(e.AfterAttributeName = 10)] = "AfterAttributeName"),
  (e[(e.BeforeAttributeValue = 11)] = "BeforeAttributeValue"),
  (e[(e.InAttributeValueDq = 12)] = "InAttributeValueDq"),
  (e[(e.InAttributeValueSq = 13)] = "InAttributeValueSq"),
  (e[(e.InAttributeValueNq = 14)] = "InAttributeValueNq"),
  (e[(e.BeforeDeclaration = 15)] = "BeforeDeclaration"),
  (e[(e.InDeclaration = 16)] = "InDeclaration"),
  (e[(e.InProcessingInstruction = 17)] = "InProcessingInstruction"),
  (e[(e.BeforeComment = 18)] = "BeforeComment"),
  (e[(e.CDATASequence = 19)] = "CDATASequence"),
  (e[(e.InSpecialComment = 20)] = "InSpecialComment"),
  (e[(e.InCommentLike = 21)] = "InCommentLike"),
  (e[(e.BeforeSpecialS = 22)] = "BeforeSpecialS"),
  (e[(e.BeforeSpecialT = 23)] = "BeforeSpecialT"),
  (e[(e.SpecialStartSequence = 24)] = "SpecialStartSequence"),
  (e[(e.InSpecialTag = 25)] = "InSpecialTag"),
  (e[(e.InEntity = 26)] = "InEntity");
})(State || (State = {})),
(function(e) {
  (e[(e.NoValue = 0)] = "NoValue"),
  (e[(e.Unquoted = 1)] = "Unquoted"),
  (e[(e.Single = 2)] = "Single"),
  (e[(e.Double = 3)] = "Double");
})(QuoteType || (QuoteType = {}));
const Sequences = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  CdataEnd: new Uint8Array([93, 93, 62]),
  CommentEnd: new Uint8Array([45, 45, 62]),
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  TextareaEnd: new Uint8Array([60, 47, 116, 101, 120, 116, 97, 114, 101, 97]),
  XmpEnd: new Uint8Array([60, 47, 120, 109, 112])
};
class Tokenizer {
  constructor({
    xmlMode: e = !1,
    decodeEntities: t = !0
  }, n) {
    (this.cbs = n),
    (this.state = State.Text),
    (this.buffer = ""),
    (this.sectionStart = 0),
    (this.index = 0),
    (this.entityStart = 0),
    (this.baseState = State.Text),
    (this.isSpecial = !1),
    (this.running = !0),
    (this.offset = 0),
    (this.currentSequence = void 0),
    (this.sequenceIndex = 0),
    (this.xmlMode = e),
    (this.decodeEntities = t),
    (this.entityDecoder = new EntityDecoder(
      e ? xmlDecodeTree : htmlDecodeTree,
      (e, t) => this.emitCodePoint(e, t)
    ));
  }
  reset() {
    (this.state = State.Text),
    (this.buffer = ""),
    (this.sectionStart = 0),
    (this.index = 0),
    (this.baseState = State.Text),
    (this.currentSequence = void 0),
    (this.running = !0),
    (this.offset = 0);
  }
  write(e) {
    (this.offset += this.buffer.length), (this.buffer = e), this.parse();
  }
  end() {
    this.running && this.finish();
  }
  pause() {
    this.running = !1;
  }
  resume() {
    (this.running = !0),
    this.index < this.buffer.length + this.offset && this.parse();
  }
  stateText(e) {
    e === CharCodes.Lt ||
      (!this.decodeEntities && this.fastForwardTo(CharCodes.Lt)) ?
      (this.index > this.sectionStart &&
        this.cbs.ontext(this.sectionStart, this.index),
        (this.state = State.BeforeTagName),
        (this.sectionStart = this.index)) :
      this.decodeEntities && e === CharCodes.Amp && this.startEntity();
  }
  stateSpecialStartSequence(e) {
    const t = this.sequenceIndex === this.currentSequence.length;
    if (
      t ?
      isEndOfTagSection(e) :
      (32 | e) === this.currentSequence[this.sequenceIndex]
    ) {
      if (!t) return void this.sequenceIndex++;
    } else this.isSpecial = !1;
    (this.sequenceIndex = 0),
    (this.state = State.InTagName),
    this.stateInTagName(e);
  }
  stateInSpecialTag(e) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (e === CharCodes.Gt || isWhitespace$1(e)) {
        const t = this.index - this.currentSequence.length;
        if (this.sectionStart < t) {
          const e = this.index;
          (this.index = t),
          this.cbs.ontext(this.sectionStart, t),
            (this.index = e);
        }
        return (
          (this.isSpecial = !1),
          (this.sectionStart = t + 2),
          void this.stateInClosingTagName(e)
        );
      }
      this.sequenceIndex = 0;
    }
    (32 | e) === this.currentSequence[this.sequenceIndex] ?
      (this.sequenceIndex += 1) :
      0 === this.sequenceIndex ?
      this.currentSequence === Sequences.TitleEnd ?
      this.decodeEntities && e === CharCodes.Amp && this.startEntity() :
      this.fastForwardTo(CharCodes.Lt) && (this.sequenceIndex = 1) :
      (this.sequenceIndex = Number(e === CharCodes.Lt));
  }
  stateCDATASequence(e) {
    e === Sequences.Cdata[this.sequenceIndex] ?
      ++this.sequenceIndex === Sequences.Cdata.length &&
      ((this.state = State.InCommentLike),
        (this.currentSequence = Sequences.CdataEnd),
        (this.sequenceIndex = 0),
        (this.sectionStart = this.index + 1)) :
      ((this.sequenceIndex = 0),
        (this.state = State.InDeclaration),
        this.stateInDeclaration(e));
  }
  fastForwardTo(e) {
    for (; ++this.index < this.buffer.length + this.offset;)
      if (this.buffer.charCodeAt(this.index - this.offset) === e) return !0;
    return (this.index = this.buffer.length + this.offset - 1), !1;
  }
  stateInCommentLike(e) {
    e === this.currentSequence[this.sequenceIndex] ?
      ++this.sequenceIndex === this.currentSequence.length &&
      (this.currentSequence === Sequences.CdataEnd ?
        this.cbs.oncdata(this.sectionStart, this.index, 2) :
        this.cbs.oncomment(this.sectionStart, this.index, 2),
        (this.sequenceIndex = 0),
        (this.sectionStart = this.index + 1),
        (this.state = State.Text)) :
      0 === this.sequenceIndex ?
      this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) :
      e !== this.currentSequence[this.sequenceIndex - 1] &&
      (this.sequenceIndex = 0);
  }
  isTagStartChar(e) {
    return this.xmlMode ? !isEndOfTagSection(e) : isASCIIAlpha(e);
  }
  startSpecial(e, t) {
    (this.isSpecial = !0),
    (this.currentSequence = e),
    (this.sequenceIndex = t),
    (this.state = State.SpecialStartSequence);
  }
  stateBeforeTagName(e) {
    if (e === CharCodes.ExclamationMark)
      (this.state = State.BeforeDeclaration),
      (this.sectionStart = this.index + 1);
    else if (e === CharCodes.Questionmark)
      (this.state = State.InProcessingInstruction),
      (this.sectionStart = this.index + 1);
    else if (this.isTagStartChar(e)) {
      const t = 32 | e;
      (this.sectionStart = this.index),
      this.xmlMode ?
        (this.state = State.InTagName) :
        t === Sequences.ScriptEnd[2] ?
        (this.state = State.BeforeSpecialS) :
        t === Sequences.TitleEnd[2] || t === Sequences.XmpEnd[2] ?
        (this.state = State.BeforeSpecialT) :
        (this.state = State.InTagName);
    } else
      e === CharCodes.Slash ?
      (this.state = State.BeforeClosingTagName) :
      ((this.state = State.Text), this.stateText(e));
  }
  stateInTagName(e) {
    isEndOfTagSection(e) &&
      (this.cbs.onopentagname(this.sectionStart, this.index),
        (this.sectionStart = -1),
        (this.state = State.BeforeAttributeName),
        this.stateBeforeAttributeName(e));
  }
  stateBeforeClosingTagName(e) {
    isWhitespace$1(e) ||
      (e === CharCodes.Gt ?
        (this.state = State.Text) :
        ((this.state = this.isTagStartChar(e) ?
            State.InClosingTagName :
            State.InSpecialComment),
          (this.sectionStart = this.index)));
  }
  stateInClosingTagName(e) {
    (e === CharCodes.Gt || isWhitespace$1(e)) &&
    (this.cbs.onclosetag(this.sectionStart, this.index),
      (this.sectionStart = -1),
      (this.state = State.AfterClosingTagName),
      this.stateAfterClosingTagName(e));
  }
  stateAfterClosingTagName(e) {
    (e === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) &&
    ((this.state = State.Text), (this.sectionStart = this.index + 1));
  }
  stateBeforeAttributeName(e) {
    e === CharCodes.Gt ?
      (this.cbs.onopentagend(this.index),
        this.isSpecial ?
        ((this.state = State.InSpecialTag), (this.sequenceIndex = 0)) :
        (this.state = State.Text),
        (this.sectionStart = this.index + 1)) :
      e === CharCodes.Slash ?
      (this.state = State.InSelfClosingTag) :
      isWhitespace$1(e) ||
      ((this.state = State.InAttributeName),
        (this.sectionStart = this.index));
  }
  stateInSelfClosingTag(e) {
    e === CharCodes.Gt ?
      (this.cbs.onselfclosingtag(this.index),
        (this.state = State.Text),
        (this.sectionStart = this.index + 1),
        (this.isSpecial = !1)) :
      isWhitespace$1(e) ||
      ((this.state = State.BeforeAttributeName),
        this.stateBeforeAttributeName(e));
  }
  stateInAttributeName(e) {
    (e === CharCodes.Eq || isEndOfTagSection(e)) &&
    (this.cbs.onattribname(this.sectionStart, this.index),
      (this.sectionStart = this.index),
      (this.state = State.AfterAttributeName),
      this.stateAfterAttributeName(e));
  }
  stateAfterAttributeName(e) {
    e === CharCodes.Eq ?
      (this.state = State.BeforeAttributeValue) :
      e === CharCodes.Slash || e === CharCodes.Gt ?
      (this.cbs.onattribend(QuoteType.NoValue, this.sectionStart),
        (this.sectionStart = -1),
        (this.state = State.BeforeAttributeName),
        this.stateBeforeAttributeName(e)) :
      isWhitespace$1(e) ||
      (this.cbs.onattribend(QuoteType.NoValue, this.sectionStart),
        (this.state = State.InAttributeName),
        (this.sectionStart = this.index));
  }
  stateBeforeAttributeValue(e) {
    e === CharCodes.DoubleQuote ?
      ((this.state = State.InAttributeValueDq),
        (this.sectionStart = this.index + 1)) :
      e === CharCodes.SingleQuote ?
      ((this.state = State.InAttributeValueSq),
        (this.sectionStart = this.index + 1)) :
      isWhitespace$1(e) ||
      ((this.sectionStart = this.index),
        (this.state = State.InAttributeValueNq),
        this.stateInAttributeValueNoQuotes(e));
  }
  handleInAttributeValue(e, t) {
    e === t || (!this.decodeEntities && this.fastForwardTo(t)) ?
      (this.cbs.onattribdata(this.sectionStart, this.index),
        (this.sectionStart = -1),
        this.cbs.onattribend(
          t === CharCodes.DoubleQuote ? QuoteType.Double : QuoteType.Single,
          this.index + 1
        ),
        (this.state = State.BeforeAttributeName)) :
      this.decodeEntities && e === CharCodes.Amp && this.startEntity();
  }
  stateInAttributeValueDoubleQuotes(e) {
    this.handleInAttributeValue(e, CharCodes.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(e) {
    this.handleInAttributeValue(e, CharCodes.SingleQuote);
  }
  stateInAttributeValueNoQuotes(e) {
    isWhitespace$1(e) || e === CharCodes.Gt ?
      (this.cbs.onattribdata(this.sectionStart, this.index),
        (this.sectionStart = -1),
        this.cbs.onattribend(QuoteType.Unquoted, this.index),
        (this.state = State.BeforeAttributeName),
        this.stateBeforeAttributeName(e)) :
      this.decodeEntities && e === CharCodes.Amp && this.startEntity();
  }
  stateBeforeDeclaration(e) {
    e === CharCodes.OpeningSquareBracket ?
      ((this.state = State.CDATASequence), (this.sequenceIndex = 0)) :
      (this.state =
        e === CharCodes.Dash ? State.BeforeComment : State.InDeclaration);
  }
  stateInDeclaration(e) {
    (e === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) &&
    (this.cbs.ondeclaration(this.sectionStart, this.index),
      (this.state = State.Text),
      (this.sectionStart = this.index + 1));
  }
  stateInProcessingInstruction(e) {
    (e === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) &&
    (this.cbs.onprocessinginstruction(this.sectionStart, this.index),
      (this.state = State.Text),
      (this.sectionStart = this.index + 1));
  }
  stateBeforeComment(e) {
    e === CharCodes.Dash ?
      ((this.state = State.InCommentLike),
        (this.currentSequence = Sequences.CommentEnd),
        (this.sequenceIndex = 2),
        (this.sectionStart = this.index + 1)) :
      (this.state = State.InDeclaration);
  }
  stateInSpecialComment(e) {
    (e === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) &&
    (this.cbs.oncomment(this.sectionStart, this.index, 0),
      (this.state = State.Text),
      (this.sectionStart = this.index + 1));
  }
  stateBeforeSpecialS(e) {
    const t = 32 | e;
    t === Sequences.ScriptEnd[3] ?
      this.startSpecial(Sequences.ScriptEnd, 4) :
      t === Sequences.StyleEnd[3] ?
      this.startSpecial(Sequences.StyleEnd, 4) :
      ((this.state = State.InTagName), this.stateInTagName(e));
  }
  stateBeforeSpecialT(e) {
    switch (32 | e) {
      case Sequences.TitleEnd[3]:
        this.startSpecial(Sequences.TitleEnd, 4);
        break;
      case Sequences.TextareaEnd[3]:
        this.startSpecial(Sequences.TextareaEnd, 4);
        break;
      case Sequences.XmpEnd[3]:
        this.startSpecial(Sequences.XmpEnd, 4);
        break;
      default:
        (this.state = State.InTagName), this.stateInTagName(e);
    }
  }
  startEntity() {
    (this.baseState = this.state),
    (this.state = State.InEntity),
    (this.entityStart = this.index),
    this.entityDecoder.startEntity(
      this.xmlMode ?
      DecodingMode.Strict :
      this.baseState === State.Text ||
      this.baseState === State.InSpecialTag ?
      DecodingMode.Legacy :
      DecodingMode.Attribute
    );
  }
  stateInEntity() {
    const e = this.index - this.offset,
      t = this.entityDecoder.write(this.buffer, e);
    if (t >= 0)(this.state = this.baseState), 0 === t && (this.index -= 1);
    else {
      if (e < this.buffer.length && this.buffer.charCodeAt(e) === CharCodes.Amp)
        return (this.state = this.baseState), void(this.index -= 1);
      this.index = this.offset + this.buffer.length - 1;
    }
  }
  cleanup() {
    this.running &&
      this.sectionStart !== this.index &&
      (this.state === State.Text ||
        (this.state === State.InSpecialTag && 0 === this.sequenceIndex) ?
        (this.cbs.ontext(this.sectionStart, this.index),
          (this.sectionStart = this.index)) :
        (this.state !== State.InAttributeValueDq &&
          this.state !== State.InAttributeValueSq &&
          this.state !== State.InAttributeValueNq) ||
        (this.cbs.onattribdata(this.sectionStart, this.index),
          (this.sectionStart = this.index)));
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  parse() {
    for (; this.shouldContinue();) {
      const e = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case State.Text:
          this.stateText(e);
          break;
        case State.SpecialStartSequence:
          this.stateSpecialStartSequence(e);
          break;
        case State.InSpecialTag:
          this.stateInSpecialTag(e);
          break;
        case State.CDATASequence:
          this.stateCDATASequence(e);
          break;
        case State.InAttributeValueDq:
          this.stateInAttributeValueDoubleQuotes(e);
          break;
        case State.InAttributeName:
          this.stateInAttributeName(e);
          break;
        case State.InCommentLike:
          this.stateInCommentLike(e);
          break;
        case State.InSpecialComment:
          this.stateInSpecialComment(e);
          break;
        case State.BeforeAttributeName:
          this.stateBeforeAttributeName(e);
          break;
        case State.InTagName:
          this.stateInTagName(e);
          break;
        case State.InClosingTagName:
          this.stateInClosingTagName(e);
          break;
        case State.BeforeTagName:
          this.stateBeforeTagName(e);
          break;
        case State.AfterAttributeName:
          this.stateAfterAttributeName(e);
          break;
        case State.InAttributeValueSq:
          this.stateInAttributeValueSingleQuotes(e);
          break;
        case State.BeforeAttributeValue:
          this.stateBeforeAttributeValue(e);
          break;
        case State.BeforeClosingTagName:
          this.stateBeforeClosingTagName(e);
          break;
        case State.AfterClosingTagName:
          this.stateAfterClosingTagName(e);
          break;
        case State.BeforeSpecialS:
          this.stateBeforeSpecialS(e);
          break;
        case State.BeforeSpecialT:
          this.stateBeforeSpecialT(e);
          break;
        case State.InAttributeValueNq:
          this.stateInAttributeValueNoQuotes(e);
          break;
        case State.InSelfClosingTag:
          this.stateInSelfClosingTag(e);
          break;
        case State.InDeclaration:
          this.stateInDeclaration(e);
          break;
        case State.BeforeDeclaration:
          this.stateBeforeDeclaration(e);
          break;
        case State.BeforeComment:
          this.stateBeforeComment(e);
          break;
        case State.InProcessingInstruction:
          this.stateInProcessingInstruction(e);
          break;
        case State.InEntity:
          this.stateInEntity();
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    this.state === State.InEntity &&
      (this.entityDecoder.end(), (this.state = this.baseState)),
      this.handleTrailingData(),
      this.cbs.onend();
  }
  handleTrailingData() {
    const e = this.buffer.length + this.offset;
    this.sectionStart >= e ||
      (this.state === State.InCommentLike ?
        this.currentSequence === Sequences.CdataEnd ?
        this.cbs.oncdata(this.sectionStart, e, 0) :
        this.cbs.oncomment(this.sectionStart, e, 0) :
        this.state === State.InTagName ||
        this.state === State.BeforeAttributeName ||
        this.state === State.BeforeAttributeValue ||
        this.state === State.AfterAttributeName ||
        this.state === State.InAttributeName ||
        this.state === State.InAttributeValueSq ||
        this.state === State.InAttributeValueDq ||
        this.state === State.InAttributeValueNq ||
        this.state === State.InClosingTagName ||
        this.cbs.ontext(this.sectionStart, e));
  }
  emitCodePoint(e, t) {
    this.baseState !== State.Text && this.baseState !== State.InSpecialTag ?
      (this.sectionStart < this.entityStart &&
        this.cbs.onattribdata(this.sectionStart, this.entityStart),
        (this.sectionStart = this.entityStart + t),
        (this.index = this.sectionStart - 1),
        this.cbs.onattribentity(e)) :
      (this.sectionStart < this.entityStart &&
        this.cbs.ontext(this.sectionStart, this.entityStart),
        (this.sectionStart = this.entityStart + t),
        (this.index = this.sectionStart - 1),
        this.cbs.ontextentity(e, this.sectionStart));
  }
}
const formTags = new Set([
    "input",
    "option",
    "optgroup",
    "select",
    "button",
    "datalist",
    "textarea"
  ]),
  pTag = new Set(["p"]),
  tableSectionTags = new Set(["thead", "tbody"]),
  ddtTags = new Set(["dd", "dt"]),
  rtpTags = new Set(["rt", "rp"]),
  openImpliesClose = new Map([
    ["tr", new Set(["tr", "th", "td"])],
    ["th", new Set(["th"])],
    ["td", new Set(["thead", "th", "td"])],
    ["body", new Set(["head", "link", "script"])],
    ["li", new Set(["li"])],
    ["p", pTag],
    ["h1", pTag],
    ["h2", pTag],
    ["h3", pTag],
    ["h4", pTag],
    ["h5", pTag],
    ["h6", pTag],
    ["select", formTags],
    ["input", formTags],
    ["output", formTags],
    ["button", formTags],
    ["datalist", formTags],
    ["textarea", formTags],
    ["option", new Set(["option"])],
    ["optgroup", new Set(["optgroup", "option"])],
    ["dd", ddtTags],
    ["dt", ddtTags],
    ["address", pTag],
    ["article", pTag],
    ["aside", pTag],
    ["blockquote", pTag],
    ["details", pTag],
    ["div", pTag],
    ["dl", pTag],
    ["fieldset", pTag],
    ["figcaption", pTag],
    ["figure", pTag],
    ["footer", pTag],
    ["form", pTag],
    ["header", pTag],
    ["hr", pTag],
    ["main", pTag],
    ["nav", pTag],
    ["ol", pTag],
    ["pre", pTag],
    ["section", pTag],
    ["table", pTag],
    ["ul", pTag],
    ["rt", rtpTags],
    ["rp", rtpTags],
    ["tbody", tableSectionTags],
    ["tfoot", tableSectionTags]
  ]),
  voidElements$1 = new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ]),
  foreignContextElements = new Set(["math", "svg"]),
  htmlIntegrationElements = new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignobject",
    "desc",
    "title"
  ]),
  reNameEnd = /\s|\//;
let Parser$1 = class {
  constructor(e, t = {}) {
    var n, s, r, i, o, A;
    (this.options = t),
    (this.startIndex = 0),
    (this.endIndex = 0),
    (this.openTagStart = 0),
    (this.tagname = ""),
    (this.attribname = ""),
    (this.attribvalue = ""),
    (this.attribs = null),
    (this.stack = []),
    (this.buffers = []),
    (this.bufferOffset = 0),
    (this.writeIndex = 0),
    (this.ended = !1),
    (this.cbs = null != e ? e : {}),
    (this.htmlMode = !this.options.xmlMode),
    (this.lowerCaseTagNames =
      null !== (n = t.lowerCaseTags) && void 0 !== n ? n : this.htmlMode),
    (this.lowerCaseAttributeNames =
      null !== (s = t.lowerCaseAttributeNames) && void 0 !== s ?
      s :
      this.htmlMode),
    (this.recognizeSelfClosing =
      null !== (r = t.recognizeSelfClosing) && void 0 !== r ?
      r :
      !this.htmlMode),
    (this.tokenizer = new(
      null !== (i = t.Tokenizer) && void 0 !== i ? i : Tokenizer
    )(this.options, this)),
    (this.foreignContext = [!this.htmlMode]),
    null === (A = (o = this.cbs).onparserinit) ||
      void 0 === A ||
      A.call(o, this);
  }
  ontext(e, t) {
    var n, s;
    const r = this.getSlice(e, t);
    (this.endIndex = t - 1),
    null === (s = (n = this.cbs).ontext) || void 0 === s || s.call(n, r),
      (this.startIndex = t);
  }
  ontextentity(e, t) {
    var n, s;
    (this.endIndex = t - 1),
    null === (s = (n = this.cbs).ontext) ||
      void 0 === s ||
      s.call(n, fromCodePoint(e)),
      (this.startIndex = t);
  }
  isVoidElement(e) {
    return this.htmlMode && voidElements$1.has(e);
  }
  onopentagname(e, t) {
    this.endIndex = t;
    let n = this.getSlice(e, t);
    this.lowerCaseTagNames && (n = n.toLowerCase()), this.emitOpenTag(n);
  }
  emitOpenTag(e) {
    var t, n, s, r;
    (this.openTagStart = this.startIndex), (this.tagname = e);
    const i = this.htmlMode && openImpliesClose.get(e);
    if (i)
      for (; this.stack.length > 0 && i.has(this.stack[0]);) {
        const e = this.stack.shift();
        null === (n = (t = this.cbs).onclosetag) ||
          void 0 === n ||
          n.call(t, e, !0);
      }
    this.isVoidElement(e) ||
      (this.stack.unshift(e),
        this.htmlMode &&
        (foreignContextElements.has(e) ?
          this.foreignContext.unshift(!0) :
          htmlIntegrationElements.has(e) && this.foreignContext.unshift(!1))),
      null === (r = (s = this.cbs).onopentagname) ||
      void 0 === r ||
      r.call(s, e),
      this.cbs.onopentag && (this.attribs = {});
  }
  endOpenTag(e) {
    var t, n;
    (this.startIndex = this.openTagStart),
    this.attribs &&
      (null === (n = (t = this.cbs).onopentag) ||
        void 0 === n ||
        n.call(t, this.tagname, this.attribs, e),
        (this.attribs = null)),
      this.cbs.onclosetag &&
      this.isVoidElement(this.tagname) &&
      this.cbs.onclosetag(this.tagname, !0),
      (this.tagname = "");
  }
  onopentagend(e) {
    (this.endIndex = e), this.endOpenTag(!1), (this.startIndex = e + 1);
  }
  onclosetag(e, t) {
    var n, s, r, i, o, A, a, l;
    this.endIndex = t;
    let c = this.getSlice(e, t);
    if (
      (this.lowerCaseTagNames && (c = c.toLowerCase()),
        this.htmlMode &&
        (foreignContextElements.has(c) || htmlIntegrationElements.has(c)) &&
        this.foreignContext.shift(),
        this.isVoidElement(c))
    )
      this.htmlMode &&
      "br" === c &&
      (null === (i = (r = this.cbs).onopentagname) ||
        void 0 === i ||
        i.call(r, "br"),
        null === (A = (o = this.cbs).onopentag) ||
        void 0 === A ||
        A.call(o, "br", {}, !0),
        null === (l = (a = this.cbs).onclosetag) ||
        void 0 === l ||
        l.call(a, "br", !1));
    else {
      const e = this.stack.indexOf(c);
      if (-1 !== e)
        for (let t = 0; t <= e; t++) {
          const r = this.stack.shift();
          null === (s = (n = this.cbs).onclosetag) ||
            void 0 === s ||
            s.call(n, r, t !== e);
        }
      else
        this.htmlMode &&
        "p" === c &&
        (this.emitOpenTag("p"), this.closeCurrentTag(!0));
    }
    this.startIndex = t + 1;
  }
  onselfclosingtag(e) {
    (this.endIndex = e),
    this.recognizeSelfClosing || this.foreignContext[0] ?
      (this.closeCurrentTag(!1), (this.startIndex = e + 1)) :
      this.onopentagend(e);
  }
  closeCurrentTag(e) {
    var t, n;
    const s = this.tagname;
    this.endOpenTag(e),
      this.stack[0] === s &&
      (null === (n = (t = this.cbs).onclosetag) ||
        void 0 === n ||
        n.call(t, s, !e),
        this.stack.shift());
  }
  onattribname(e, t) {
    this.startIndex = e;
    const n = this.getSlice(e, t);
    this.attribname = this.lowerCaseAttributeNames ? n.toLowerCase() : n;
  }
  onattribdata(e, t) {
    this.attribvalue += this.getSlice(e, t);
  }
  onattribentity(e) {
    this.attribvalue += fromCodePoint(e);
  }
  onattribend(e, t) {
    var n, s;
    (this.endIndex = t),
    null === (s = (n = this.cbs).onattribute) ||
      void 0 === s ||
      s.call(
        n,
        this.attribname,
        this.attribvalue,
        e === QuoteType.Double ?
        '"' :
        e === QuoteType.Single ?
        "'" :
        e === QuoteType.NoValue ?
        void 0 :
        null
      ),
      this.attribs &&
      !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) &&
      (this.attribs[this.attribname] = this.attribvalue),
      (this.attribvalue = "");
  }
  getInstructionName(e) {
    const t = e.search(reNameEnd);
    let n = t < 0 ? e : e.substr(0, t);
    return this.lowerCaseTagNames && (n = n.toLowerCase()), n;
  }
  ondeclaration(e, t) {
    this.endIndex = t;
    const n = this.getSlice(e, t);
    if (this.cbs.onprocessinginstruction) {
      const e = this.getInstructionName(n);
      this.cbs.onprocessinginstruction(`!${e}`, `!${n}`);
    }
    this.startIndex = t + 1;
  }
  onprocessinginstruction(e, t) {
    this.endIndex = t;
    const n = this.getSlice(e, t);
    if (this.cbs.onprocessinginstruction) {
      const e = this.getInstructionName(n);
      this.cbs.onprocessinginstruction(`?${e}`, `?${n}`);
    }
    this.startIndex = t + 1;
  }
  oncomment(e, t, n) {
    var s, r, i, o;
    (this.endIndex = t),
    null === (r = (s = this.cbs).oncomment) ||
      void 0 === r ||
      r.call(s, this.getSlice(e, t - n)),
      null === (o = (i = this.cbs).oncommentend) || void 0 === o || o.call(i),
      (this.startIndex = t + 1);
  }
  oncdata(e, t, n) {
    var s, r, i, o, A, a, l, c, u, h;
    this.endIndex = t;
    const d = this.getSlice(e, t - n);
    !this.htmlMode || this.options.recognizeCDATA ?
      (null === (r = (s = this.cbs).oncdatastart) ||
        void 0 === r ||
        r.call(s),
        null === (o = (i = this.cbs).ontext) || void 0 === o || o.call(i, d),
        null === (a = (A = this.cbs).oncdataend) || void 0 === a || a.call(A)) :
      (null === (c = (l = this.cbs).oncomment) ||
        void 0 === c ||
        c.call(l, `[CDATA[${d}]]`),
        null === (h = (u = this.cbs).oncommentend) ||
        void 0 === h ||
        h.call(u)),
      (this.startIndex = t + 1);
  }
  onend() {
    var e, t;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let e = 0; e < this.stack.length; e++)
        this.cbs.onclosetag(this.stack[e], !0);
    }
    null === (t = (e = this.cbs).onend) || void 0 === t || t.call(e);
  }
  reset() {
    var e, t, n, s;
    null === (t = (e = this.cbs).onreset) || void 0 === t || t.call(e),
      this.tokenizer.reset(),
      (this.tagname = ""),
      (this.attribname = ""),
      (this.attribs = null),
      (this.stack.length = 0),
      (this.startIndex = 0),
      (this.endIndex = 0),
      null === (s = (n = this.cbs).onparserinit) ||
      void 0 === s ||
      s.call(n, this),
      (this.buffers.length = 0),
      (this.foreignContext.length = 0),
      this.foreignContext.unshift(!this.htmlMode),
      (this.bufferOffset = 0),
      (this.writeIndex = 0),
      (this.ended = !1);
  }
  parseComplete(e) {
    this.reset(), this.end(e);
  }
  getSlice(e, t) {
    for (; e - this.bufferOffset >= this.buffers[0].length;)
      this.shiftBuffer();
    let n = this.buffers[0].slice(e - this.bufferOffset, t - this.bufferOffset);
    for (; t - this.bufferOffset > this.buffers[0].length;)
      this.shiftBuffer(),
      (n += this.buffers[0].slice(0, t - this.bufferOffset));
    return n;
  }
  shiftBuffer() {
    (this.bufferOffset += this.buffers[0].length),
    this.writeIndex--,
      this.buffers.shift();
  }
  write(e) {
    var t, n;
    this.ended ?
      null === (n = (t = this.cbs).onerror) ||
      void 0 === n ||
      n.call(t, new Error(".write() after done!")) :
      (this.buffers.push(e),
        this.tokenizer.running && (this.tokenizer.write(e), this.writeIndex++));
  }
  end(e) {
    var t, n;
    this.ended ?
      null === (n = (t = this.cbs).onerror) ||
      void 0 === n ||
      n.call(t, new Error(".end() after done!")) :
      (e && this.write(e), (this.ended = !0), this.tokenizer.end());
  }
  pause() {
    this.tokenizer.pause();
  }
  resume() {
    for (
      this.tokenizer.resume(); this.tokenizer.running && this.writeIndex < this.buffers.length;

    )
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    this.ended && this.tokenizer.end();
  }
  parseChunk(e) {
    this.write(e);
  }
  done(e) {
    this.end(e);
  }
};
var HTMLParser2 = Object.freeze({
  __proto__: null,
  Parser: Parser$1,
  get QuoteType() {
    return QuoteType;
  },
  Tokenizer: Tokenizer
});
const NODE_END = -1,
  ELEMENT_NODE = 1,
  ATTRIBUTE_NODE = 2,
  TEXT_NODE = 3,
  CDATA_SECTION_NODE = 4,
  COMMENT_NODE = 8,
  DOCUMENT_NODE = 9,
  DOCUMENT_TYPE_NODE = 10,
  DOCUMENT_FRAGMENT_NODE = 11,
  BLOCK_ELEMENTS = new Set([
    "ARTICLE",
    "ASIDE",
    "BLOCKQUOTE",
    "BODY",
    "BR",
    "BUTTON",
    "CANVAS",
    "CAPTION",
    "COL",
    "COLGROUP",
    "DD",
    "DIV",
    "DL",
    "DT",
    "EMBED",
    "FIELDSET",
    "FIGCAPTION",
    "FIGURE",
    "FOOTER",
    "FORM",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "LI",
    "UL",
    "OL",
    "P"
  ]),
  SHOW_ALL = -1,
  SHOW_ELEMENT = 1,
  SHOW_TEXT = 4,
  SHOW_CDATA_SECTION = 8,
  SHOW_COMMENT = 128,
  DOCUMENT_POSITION_DISCONNECTED = 1,
  DOCUMENT_POSITION_PRECEDING = 2,
  DOCUMENT_POSITION_FOLLOWING = 4,
  DOCUMENT_POSITION_CONTAINS = 8,
  DOCUMENT_POSITION_CONTAINED_BY = 16,
  DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32,
  SVG_NAMESPACE = "http://www.w3.org/2000/svg",
  {
    assign: assign,
    create: create$1,
    defineProperties: defineProperties,
    entries: entries,
    keys: keys,
    setPrototypeOf: setPrototypeOf
  } = Object,
  $String = String,
  getEnd = (e) => (1 === e.nodeType ? e[END] : e),
  ignoreCase = ({
    ownerDocument: e
  }) => e[MIME].ignoreCase,
  knownAdjacent = (e, t) => {
    (e[NEXT] = t), (t[PREV] = e);
  },
  knownBoundaries = (e, t, n) => {
    knownAdjacent(e, t), knownAdjacent(getEnd(t), n);
  },
  knownSegment = (e, t, n, s) => {
    knownAdjacent(e, t), knownAdjacent(getEnd(n), s);
  },
  knownSiblings = (e, t, n) => {
    knownAdjacent(e, t), knownAdjacent(t, n);
  },
  localCase = ({
    localName: e,
    ownerDocument: t
  }) =>
  t[MIME].ignoreCase ? e.toUpperCase() : e,
  setAdjacent = (e, t) => {
    e && (e[NEXT] = t), t && (t[PREV] = e);
  },
  htmlToFragment = (e, t) => {
    const n = e.createDocumentFragment(),
      s = e.createElement("");
    s.innerHTML = t;
    const {
      firstChild: r,
      lastChild: i
    } = s;
    if (r) {
      knownSegment(n, r, i, n[END]);
      let e = r;
      do {
        e.parentNode = n;
      } while (e !== i && (e = getEnd(e)[NEXT]));
    }
    return n;
  },
  shadowRoots = new WeakMap();
let reactive = !1;
const Classes = new WeakMap(),
  customElements = new WeakMap(),
  attributeChangedCallback$1 = (e, t, n, s) => {
    reactive &&
      customElements.has(e) &&
      e.attributeChangedCallback &&
      e.constructor.observedAttributes.includes(t) &&
      e.attributeChangedCallback(t, n, s);
  },
  createTrigger = (e, t) => (n) => {
    if (customElements.has(n)) {
      const s = customElements.get(n);
      s.connected !== t &&
        n.isConnected === t &&
        ((s.connected = t), e in n && n[e]());
    }
  },
  triggerConnected = createTrigger("connectedCallback", !0),
  connectedCallback = (e) => {
    if (reactive) {
      triggerConnected(e),
        shadowRoots.has(e) && (e = shadowRoots.get(e).shadowRoot);
      let {
        [NEXT]: t, [END]: n
      } = e;
      for (; t !== n;) 1 === t.nodeType && triggerConnected(t), (t = t[NEXT]);
    }
  },
  triggerDisconnected = createTrigger("disconnectedCallback", !1),
  disconnectedCallback = (e) => {
    if (reactive) {
      triggerDisconnected(e),
        shadowRoots.has(e) && (e = shadowRoots.get(e).shadowRoot);
      let {
        [NEXT]: t, [END]: n
      } = e;
      for (; t !== n;)
        1 === t.nodeType && triggerDisconnected(t), (t = t[NEXT]);
    }
  };
class CustomElementRegistry {
  constructor(e) {
    (this.ownerDocument = e),
    (this.registry = new Map()),
    (this.waiting = new Map()),
    (this.active = !1);
  }
  define(e, t, n = {}) {
    const {
      ownerDocument: s,
      registry: r,
      waiting: i
    } = this;
    if (r.has(e)) throw new Error("unable to redefine " + e);
    if (Classes.has(t))
      throw new Error("unable to redefine the same class: " + t);
    this.active = reactive = !0;
    const {
      extends: o
    } = n;
    Classes.set(t, {
      ownerDocument: s,
      options: {
        is: o ? e : ""
      },
      localName: o || e
    });
    const A = o ?
      (t) => t.localName === o && t.getAttribute("is") === e :
      (t) => t.localName === e;
    if (
      (r.set(e, {
          Class: t,
          check: A
        }),
        i.has(e))
    ) {
      for (const n of i.get(e)) n(t);
      i.delete(e);
    }
    s.querySelectorAll(o ? `${o}[is="${e}"]` : e).forEach(this.upgrade, this);
  }
  upgrade(e) {
    if (customElements.has(e)) return;
    const {
      ownerDocument: t,
      registry: n
    } = this,
    s = e.getAttribute("is") || e.localName;
    if (n.has(s)) {
      const {
        Class: r,
        check: i
      } = n.get(s);
      if (i(e)) {
        const {
          attributes: n,
          isConnected: i
        } = e;
        for (const t of n) e.removeAttributeNode(t);
        const o = entries(e);
        for (const [t] of o) delete e[t];
        setPrototypeOf(e, r.prototype),
          (t[UPGRADE] = {
            element: e,
            values: o
          }),
          new r(t, s),
          customElements.set(e, {
            connected: i
          });
        for (const t of n) e.setAttributeNode(t);
        i && e.connectedCallback && e.connectedCallback();
      }
    }
  }
  whenDefined(e) {
    const {
      registry: t,
      waiting: n
    } = this;
    return new Promise((s) => {
      t.has(e) ?
        s(t.get(e).Class) :
        (n.has(e) || n.set(e, []), n.get(e).push(s));
    });
  }
  get(e) {
    const t = this.registry.get(e);
    return t && t.Class;
  }
  getName(e) {
    if (Classes.has(e)) {
      const {
        localName: t
      } = Classes.get(e);
      return t;
    }
    return null;
  }
}
const {
  Parser: Parser
} = HTMLParser2,
append$2 = (e, t, n) => {
    const s = e[END];
    return (
      (t.parentNode = e),
      knownBoundaries(s[PREV], t, s),
      n && 1 === t.nodeType && connectedCallback(t),
      t
    );
  },
  attribute = (e, t, n, s, r) => {
    (n[VALUE] = s),
    (n.ownerElement = e),
    knownSiblings(t[PREV], n, t),
      "class" === n.name && (e.className = s),
      r && attributeChangedCallback$1(e, n.name, null, s);
  },
  parseFromString = (e, t, n) => {
    const {
      active: s,
      registry: r
    } = e[CUSTOM_ELEMENTS];
    let i = e,
      o = null,
      A = !1;
    const a = new Parser({
      onprocessinginstruction(t, n) {
        "!doctype" === t.toLowerCase() &&
          (e.doctype = n.slice(t.length).trim());
      },
      onopentag(n, A) {
        let a = !0;
        if (t)
          if (o)
            (i = append$2(i, e.createElementNS(SVG_NAMESPACE, n), s)),
            (i.ownerSVGElement = o),
            (a = !1);
          else if ("svg" === n || "SVG" === n)
          (o = e.createElementNS(SVG_NAMESPACE, n)),
          (i = append$2(i, o, s)),
          (a = !1);
        else if (s) {
          const e = n.includes("-") ? n : A.is || "";
          if (e && r.has(e)) {
            const {
              Class: t
            } = r.get(e);
            (i = append$2(i, new t(), s)), delete A.is, (a = !1);
          }
        }
        a && (i = append$2(i, e.createElement(n), !1));
        let l = i[END];
        for (const t of keys(A))
          attribute(i, l, e.createAttribute(t), A[t], s);
      },
      oncomment(t) {
        append$2(i, e.createComment(t), s);
      },
      ontext(t) {
        append$2(i, A ? e.createCDATASection(t) : e.createTextNode(t), s);
      },
      oncdatastart() {
        A = !0;
      },
      oncdataend() {
        A = !1;
      },
      onclosetag() {
        t && i === o && (o = null), (i = i.parentNode);
      }
    }, {
      lowerCaseAttributeNames: !1,
      decodeEntities: !0,
      xmlMode: !t
    });
    return a.write(n), a.end(), e;
  },
  htmlClasses = new Map(),
  registerHTMLClass = (e, t) => {
    for (const n of [].concat(e))
      htmlClasses.set(n, t), htmlClasses.set(n.toUpperCase(), t);
  },
  loopSegment = ({
    [NEXT]: e,
    [END]: t
  }, n) => {
    for (; e !== t;) {
      switch (e.nodeType) {
        case 2:
          attrAsJSON(e, n);
          break;
        case 3:
        case 8:
        case 4:
          characterDataAsJSON(e, n);
          break;
        case 1:
          elementAsJSON(e, n), (e = getEnd(e));
          break;
        case 10:
          documentTypeAsJSON(e, n);
      }
      e = e[NEXT];
    }
    const s = n.length - 1,
      r = n[s];
    "number" == typeof r && r < 0 ? (n[s] += -1) : n.push(-1);
  },
  attrAsJSON = (e, t) => {
    t.push(2, e.name);
    const n = e[VALUE].trim();
    n && t.push(n);
  },
  characterDataAsJSON = (e, t) => {
    const n = e[VALUE];
    n.trim() && t.push(e.nodeType, n);
  },
  nonElementAsJSON = (e, t) => {
    t.push(e.nodeType), loopSegment(e, t);
  },
  documentTypeAsJSON = ({
    name: e,
    publicId: t,
    systemId: n
  }, s) => {
    s.push(10, e), t && s.push(t), n && s.push(n);
  },
  elementAsJSON = (e, t) => {
    t.push(1, e.localName), loopSegment(e, t);
  },
  createRecord = (e, t, n, s, r, i, o) => ({
    type: e,
    target: t,
    addedNodes: s,
    removedNodes: r,
    attributeName: i,
    oldValue: o,
    previousSibling: n?.previousSibling || null,
    nextSibling: n?.nextSibling || null
  }),
  queueAttribute = (e, t, n, s, r, i) => {
    if (!s || s.includes(n)) {
      const {
        callback: s,
        records: o,
        scheduled: A
      } = e;
      o.push(createRecord("attributes", t, null, [], [], n, r ? i : void 0)),
        A ||
        ((e.scheduled = !0),
          Promise.resolve().then(() => {
            (e.scheduled = !1), s(o.splice(0), e);
          }));
    }
  },
  attributeChangedCallback = (e, t, n) => {
    const {
      ownerDocument: s
    } = e, {
      active: r,
      observers: i
    } = s[MUTATION_OBSERVER];
    if (r)
      for (const r of i)
        for (const [
            i,
            {
              childList: o,
              subtree: A,
              attributes: a,
              attributeFilter: l,
              attributeOldValue: c
            }
          ] of r.nodes)
          if (o) {
            if (
              (A && (i === s || i.contains(e))) ||
              (!A && i.children.includes(e))
            ) {
              queueAttribute(r, e, t, l, c, n);
              break;
            }
          } else if (a && i === e) {
      queueAttribute(r, e, t, l, c, n);
      break;
    }
  },
  moCallback = (e, t) => {
    const {
      ownerDocument: n
    } = e, {
      active: s,
      observers: r
    } = n[MUTATION_OBSERVER];
    if (s)
      for (const s of r)
        for (const [
            r,
            {
              subtree: i,
              childList: o,
              characterData: A
            }
          ] of s.nodes)
          if (
            o &&
            ((t && (r === t || (i && r.contains(t)))) ||
              (!t &&
                ((i && (r === n || r.contains(e))) ||
                  (!i && r[A ? "childNodes" : "children"].includes(e)))))
          ) {
            const {
              callback: n,
              records: i,
              scheduled: o
            } = s;
            i.push(createRecord("childList", r, e, t ? [] : [e], t ? [e] : [])),
              o ||
              ((s.scheduled = !0),
                Promise.resolve().then(() => {
                  (s.scheduled = !1), n(i.splice(0), s);
                }));
            break;
          }
  };
class MutationObserverClass {
  constructor(e) {
    const t = new Set();
    (this.observers = t),
    (this.active = !1),
    (this.class = class {
      constructor(e) {
        (this.callback = e),
        (this.nodes = new Map()),
        (this.records = []),
        (this.scheduled = !1);
      }
      disconnect() {
        this.records.splice(0),
          this.nodes.clear(),
          t.delete(this),
          (e[MUTATION_OBSERVER].active = !!t.size);
      }
      observe(
        n,
        s = {
          subtree: !1,
          childList: !1,
          attributes: !1,
          attributeFilter: null,
          attributeOldValue: !1,
          characterData: !1
        }
      ) {
        ("attributeOldValue" in s || "attributeFilter" in s) &&
        (s.attributes = !0),
        (s.childList = !!s.childList),
        (s.subtree = !!s.subtree),
        this.nodes.set(n, s),
          t.add(this),
          (e[MUTATION_OBSERVER].active = !0);
      }
      takeRecords() {
        return this.records.splice(0);
      }
    });
  }
}
const emptyAttributes = new Set([
    "allowfullscreen",
    "allowpaymentrequest",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "class",
    "contenteditable",
    "controls",
    "default",
    "defer",
    "disabled",
    "draggable",
    "formnovalidate",
    "hidden",
    "id",
    "ismap",
    "itemscope",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "selected",
    "style",
    "truespeed"
  ]),
  setAttribute = (e, t) => {
    const {
      [VALUE]: n, name: s
    } = t;
    (t.ownerElement = e),
    knownSiblings(e, t, e[NEXT]),
      "class" === s && (e.className = n),
      attributeChangedCallback(e, s, null),
      attributeChangedCallback$1(e, s, null, n);
  },
  removeAttribute = (e, t) => {
    const {
      [VALUE]: n, name: s
    } = t;
    knownAdjacent(t[PREV], t[NEXT]),
      (t.ownerElement = t[PREV] = t[NEXT] = null),
      "class" === s && (e[CLASS_LIST] = null),
      attributeChangedCallback(e, s, n),
      attributeChangedCallback$1(e, s, n, null);
  },
  booleanAttribute = {
    get: (e, t) => e.hasAttribute(t),
    set(e, t, n) {
      n ? e.setAttribute(t, "") : e.removeAttribute(t);
    }
  },
  numericAttribute = {
    get: (e, t) => parseFloat(e.getAttribute(t) || 0),
    set(e, t, n) {
      e.setAttribute(t, n);
    }
  },
  stringAttribute = {
    get: (e, t) => e.getAttribute(t) || "",
    set(e, t, n) {
      e.setAttribute(t, n);
    }
  },
  wm = new WeakMap();

function dispatch(e, t) {
  return (
    "function" == typeof t ? t.call(e.target, e) : t.handleEvent(e),
    e._stopImmediatePropagationFlag
  );
}

function invokeListeners({
  currentTarget: e,
  target: t
}) {
  const n = wm.get(e);
  if (n && n.has(this.type)) {
    const s = n.get(this.type);
    (this.eventPhase = e === t ? this.AT_TARGET : this.BUBBLING_PHASE),
    (this.currentTarget = e),
    (this.target = t);
    for (const [e, t] of s)
      if ((t && t.once && s.delete(e), dispatch(this, e))) break;
    return delete this.currentTarget, delete this.target, this.cancelBubble;
  }
}
class DOMEventTarget {
  constructor() {
    wm.set(this, new Map());
  }
  _getParent() {
    return null;
  }
  addEventListener(e, t, n) {
    const s = wm.get(this);
    s.has(e) || s.set(e, new Map()), s.get(e).set(t, n);
  }
  removeEventListener(e, t) {
    const n = wm.get(this);
    if (n.has(e)) {
      const s = n.get(e);
      s.delete(t) && !s.size && n.delete(e);
    }
  }
  dispatchEvent(e) {
    let t = this;
    for (e.eventPhase = e.CAPTURING_PHASE; t;)
      t.dispatchEvent &&
      e._path.push({
        currentTarget: t,
        target: this
      }),
      (t = e.bubbles && t._getParent && t._getParent());
    return (
      e._path.some(invokeListeners, e),
      (e._path = []),
      (e.eventPhase = e.NONE),
      !e.defaultPrevented
    );
  }
}
exports.EventTarget = DOMEventTarget;
class NodeList extends Array {
  item(e) {
    return e < this.length ? this[e] : null;
  }
}
exports.NodeList = NodeList;
const getParentNodeCount = ({
  parentNode: e
}) => {
  let t = 0;
  for (; e;) t++, (e = e.parentNode);
  return t;
};
let Node$1 = class extends DOMEventTarget {
  static get ELEMENT_NODE() {
    return 1;
  }
  static get ATTRIBUTE_NODE() {
    return 2;
  }
  static get TEXT_NODE() {
    return 3;
  }
  static get CDATA_SECTION_NODE() {
    return 4;
  }
  static get COMMENT_NODE() {
    return 8;
  }
  static get DOCUMENT_NODE() {
    return 9;
  }
  static get DOCUMENT_FRAGMENT_NODE() {
    return 11;
  }
  static get DOCUMENT_TYPE_NODE() {
    return 10;
  }
  constructor(e, t, n) {
    super(),
      (this.ownerDocument = e),
      (this.localName = t),
      (this.nodeType = n),
      (this.parentNode = null),
      (this[NEXT] = null),
      (this[PREV] = null);
  }
  get ELEMENT_NODE() {
    return 1;
  }
  get ATTRIBUTE_NODE() {
    return 2;
  }
  get TEXT_NODE() {
    return 3;
  }
  get CDATA_SECTION_NODE() {
    return 4;
  }
  get COMMENT_NODE() {
    return 8;
  }
  get DOCUMENT_NODE() {
    return 9;
  }
  get DOCUMENT_FRAGMENT_NODE() {
    return 11;
  }
  get DOCUMENT_TYPE_NODE() {
    return 10;
  }
  get baseURI() {
    const e = 9 === this.nodeType ? this : this.ownerDocument;
    if (e) {
      const t = e.querySelector("base");
      if (t) return t.getAttribute("href");
      const {
        location: n
      } = e.defaultView;
      if (n) return n.href;
    }
    return null;
  }
  get isConnected() {
    return !1;
  }
  get nodeName() {
    return this.localName;
  }
  get parentElement() {
    return null;
  }
  get previousSibling() {
    return null;
  }
  get previousElementSibling() {
    return null;
  }
  get nextSibling() {
    return null;
  }
  get nextElementSibling() {
    return null;
  }
  get childNodes() {
    return new NodeList();
  }
  get firstChild() {
    return null;
  }
  get lastChild() {
    return null;
  }
  get nodeValue() {
    return null;
  }
  set nodeValue(e) {}
  get textContent() {
    return null;
  }
  set textContent(e) {}
  normalize() {}
  cloneNode() {
    return null;
  }
  contains() {
    return !1;
  }
  insertBefore(e, t) {
    return e;
  }
  appendChild(e) {
    return e;
  }
  replaceChild(e, t) {
    return t;
  }
  removeChild(e) {
    return e;
  }
  toString() {
    return "";
  }
  hasChildNodes() {
    return !!this.lastChild;
  }
  isSameNode(e) {
    return this === e;
  }
  compareDocumentPosition(e) {
    let t = 0;
    if (this !== e) {
      let n = getParentNodeCount(this),
        s = getParentNodeCount(e);
      if (n < s)(t += 4), this.contains(e) && (t += 16);
      else if (s < n)(t += 2), e.contains(this) && (t += 8);
      else if (n && s) {
        const {
          childNodes: n
        } = this.parentNode;
        n.indexOf(this) < n.indexOf(e) ? (t += 4) : (t += 2);
      }
      (n && s) || ((t += 32), (t += 1));
    }
    return t;
  }
  isEqualNode(e) {
    if (this === e) return !0;
    if (this.nodeType === e.nodeType) {
      switch (this.nodeType) {
        case 9:
        case 11: {
          const t = this.childNodes,
            n = e.childNodes;
          return (
            t.length === n.length && t.every((e, t) => e.isEqualNode(n[t]))
          );
        }
      }
      return this.toString() === e.toString();
    }
    return !1;
  }
  _getParent() {
    return this.parentNode;
  }
  getRootNode() {
    let e = this;
    for (; e.parentNode;) e = e.parentNode;
    return e;
  }
};
const {
  replace: replace
} = "",
ca = /[<>&\xA0]/g,
  esca = {
    " ": "&#160;",
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;"
  },
  pe = (e) => esca[e],
  escape = (e) => replace.call(e, ca, pe),
  QUOTE = /"/g;
let Attr$1 = class e extends Node$1 {
  constructor(e, t, n = "") {
    super(e, t, 2),
      (this.ownerElement = null),
      (this.name = $String(t)),
      (this[VALUE] = $String(n)),
      (this[CHANGED] = !1);
  }
  get value() {
    return this[VALUE];
  }
  set value(e) {
    const {
      [VALUE]: t, name: n, ownerElement: s
    } = this;
    (this[VALUE] = $String(e)),
    (this[CHANGED] = !0),
    s &&
      (attributeChangedCallback(s, n, t),
        attributeChangedCallback$1(s, n, t, this[VALUE]));
  }
  cloneNode() {
    const {
      ownerDocument: t,
      name: n,
      [VALUE]: s
    } = this;
    return new e(t, n, s);
  }
  toString() {
    const {
      name: e,
      [VALUE]: t
    } = this;
    if (emptyAttributes.has(e) && !t) return ignoreCase(this) ? e : `${e}=""`;
    return `${e}="${(ignoreCase(this) ? t : escape(t)).replace(
      QUOTE,
      "&quot;"
    )}"`;
  }
  toJSON() {
    const e = [];
    return attrAsJSON(this, e), e;
  }
};
const isConnected = ({
    ownerDocument: e,
    parentNode: t
  }) => {
    for (; t;) {
      if (t === e) return !0;
      t = t.parentNode || t.host;
    }
    return !1;
  },
  parentElement = ({
    parentNode: e
  }) => {
    if (e)
      switch (e.nodeType) {
        case 9:
        case 11:
          return null;
      }
    return e;
  },
  previousSibling = ({
    [PREV]: e
  }) => {
    switch (e ? e.nodeType : 0) {
      case -1:
        return e[START];
      case 3:
      case 8:
      case 4:
        return e;
    }
    return null;
  },
  nextSibling = (e) => {
    const t = getEnd(e)[NEXT];
    return t && (-1 === t.nodeType ? null : t);
  },
  nextElementSibling$1 = (e) => {
    let t = nextSibling(e);
    for (; t && 1 !== t.nodeType;) t = nextSibling(t);
    return t;
  },
  previousElementSibling = (e) => {
    let t = previousSibling(e);
    for (; t && 1 !== t.nodeType;) t = previousSibling(t);
    return t;
  },
  asFragment = (e, t) => {
    const n = e.createDocumentFragment();
    return n.append(...t), n;
  },
  before = (e, t) => {
    const {
      ownerDocument: n,
      parentNode: s
    } = e;
    s && s.insertBefore(asFragment(n, t), e);
  },
  after = (e, t) => {
    const {
      ownerDocument: n,
      parentNode: s
    } = e;
    s && s.insertBefore(asFragment(n, t), getEnd(e)[NEXT]);
  },
  replaceWith = (e, t) => {
    const {
      ownerDocument: n,
      parentNode: s
    } = e;
    s &&
      (t.includes(e) && replaceWith(e, [(e = e.cloneNode())]),
        s.insertBefore(asFragment(n, t), e),
        e.remove());
  },
  remove = (e, t, n) => {
    const {
      parentNode: s,
      nodeType: r
    } = t;
    (e || n) && (setAdjacent(e, n), (t[PREV] = null), (getEnd(t)[NEXT] = null)),
    s &&
      ((t.parentNode = null),
        moCallback(t, s),
        1 === r && disconnectedCallback(t));
  };
let CharacterData$1 = class extends Node$1 {
    constructor(e, t, n, s) {
      super(e, t, n), (this[VALUE] = $String(s));
    }
    get isConnected() {
      return isConnected(this);
    }
    get parentElement() {
      return parentElement(this);
    }
    get previousSibling() {
      return previousSibling(this);
    }
    get nextSibling() {
      return nextSibling(this);
    }
    get previousElementSibling() {
      return previousElementSibling(this);
    }
    get nextElementSibling() {
      return nextElementSibling$1(this);
    }
    before(...e) {
      before(this, e);
    }
    after(...e) {
      after(this, e);
    }
    replaceWith(...e) {
      replaceWith(this, e);
    }
    remove() {
      remove(this[PREV], this, this[NEXT]);
    }
    get data() {
      return this[VALUE];
    }
    set data(e) {
      (this[VALUE] = $String(e)), moCallback(this, this.parentNode);
    }
    get nodeValue() {
      return this.data;
    }
    set nodeValue(e) {
      this.data = e;
    }
    get textContent() {
      return this.data;
    }
    set textContent(e) {
      this.data = e;
    }
    get length() {
      return this.data.length;
    }
    substringData(e, t) {
      return this.data.substr(e, t);
    }
    appendData(e) {
      this.data += e;
    }
    insertData(e, t) {
      const {
        data: n
      } = this;
      this.data = n.slice(0, e) + t + n.slice(e);
    }
    deleteData(e, t) {
      const {
        data: n
      } = this;
      this.data = n.slice(0, e) + n.slice(e + t);
    }
    replaceData(e, t, n) {
      const {
        data: s
      } = this;
      this.data = s.slice(0, e) + n + s.slice(e + t);
    }
    toJSON() {
      const e = [];
      return characterDataAsJSON(this, e), e;
    }
  },
  CDATASection$1 = class e extends CharacterData$1 {
    constructor(e, t = "") {
      super(e, "#cdatasection", 4, t);
    }
    cloneNode() {
      const {
        ownerDocument: t,
        [VALUE]: n
      } = this;
      return new e(t, n);
    }
    toString() {
      return `<![CDATA[${this[VALUE]}]]>`;
    }
  },
  Comment$2 = class e extends CharacterData$1 {
    constructor(e, t = "") {
      super(e, "#comment", 8, t);
    }
    cloneNode() {
      const {
        ownerDocument: t,
        [VALUE]: n
      } = this;
      return new e(t, n);
    }
    toString() {
      return `\x3c!--${this[VALUE]}--\x3e`;
    }
  };

function trueFunc() {
  return !0;
}

function falseFunc() {
  return !1;
}
var SelectorType, AttributeAction;
!(function(e) {
  (e.Attribute = "attribute"),
  (e.Pseudo = "pseudo"),
  (e.PseudoElement = "pseudo-element"),
  (e.Tag = "tag"),
  (e.Universal = "universal"),
  (e.Adjacent = "adjacent"),
  (e.Child = "child"),
  (e.Descendant = "descendant"),
  (e.Parent = "parent"),
  (e.Sibling = "sibling"),
  (e.ColumnCombinator = "column-combinator");
})(SelectorType || (SelectorType = {})),
(function(e) {
  (e.Any = "any"),
  (e.Element = "element"),
  (e.End = "end"),
  (e.Equals = "equals"),
  (e.Exists = "exists"),
  (e.Hyphen = "hyphen"),
  (e.Not = "not"),
  (e.Start = "start");
})(AttributeAction || (AttributeAction = {}));
const reName = /^[^#\\]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\u00B0-\uFFFF-])+/,
  reEscape = /\\([\da-f]{1,6}\s?|(\s)|.)/gi;
var CharCode;
!(function(e) {
  (e[(e.LeftParenthesis = 40)] = "LeftParenthesis"),
  (e[(e.RightParenthesis = 41)] = "RightParenthesis"),
  (e[(e.LeftSquareBracket = 91)] = "LeftSquareBracket"),
  (e[(e.RightSquareBracket = 93)] = "RightSquareBracket"),
  (e[(e.Comma = 44)] = "Comma"),
  (e[(e.Period = 46)] = "Period"),
  (e[(e.Colon = 58)] = "Colon"),
  (e[(e.SingleQuote = 39)] = "SingleQuote"),
  (e[(e.DoubleQuote = 34)] = "DoubleQuote"),
  (e[(e.Plus = 43)] = "Plus"),
  (e[(e.Tilde = 126)] = "Tilde"),
  (e[(e.QuestionMark = 63)] = "QuestionMark"),
  (e[(e.ExclamationMark = 33)] = "ExclamationMark"),
  (e[(e.Slash = 47)] = "Slash"),
  (e[(e.Equal = 61)] = "Equal"),
  (e[(e.Dollar = 36)] = "Dollar"),
  (e[(e.Pipe = 124)] = "Pipe"),
  (e[(e.Circumflex = 94)] = "Circumflex"),
  (e[(e.Asterisk = 42)] = "Asterisk"),
  (e[(e.GreaterThan = 62)] = "GreaterThan"),
  (e[(e.LessThan = 60)] = "LessThan"),
  (e[(e.Hash = 35)] = "Hash"),
  (e[(e.LowerI = 105)] = "LowerI"),
  (e[(e.LowerS = 115)] = "LowerS"),
  (e[(e.BackSlash = 92)] = "BackSlash"),
  (e[(e.Space = 32)] = "Space"),
  (e[(e.Tab = 9)] = "Tab"),
  (e[(e.NewLine = 10)] = "NewLine"),
  (e[(e.FormFeed = 12)] = "FormFeed"),
  (e[(e.CarriageReturn = 13)] = "CarriageReturn");
})(CharCode || (CharCode = {}));
const actionTypes = new Map([
    [CharCode.Tilde, AttributeAction.Element],
    [CharCode.Circumflex, AttributeAction.Start],
    [CharCode.Dollar, AttributeAction.End],
    [CharCode.Asterisk, AttributeAction.Any],
    [CharCode.ExclamationMark, AttributeAction.Not],
    [CharCode.Pipe, AttributeAction.Hyphen]
  ]),
  unpackPseudos = new Set([
    "has",
    "not",
    "matches",
    "is",
    "where",
    "host",
    "host-context"
  ]),
  pseudosToPseudoElements = new Set([
    "before",
    "after",
    "first-line",
    "first-letter"
  ]);

function isTraversal$1(e) {
  switch (e.type) {
    case SelectorType.Adjacent:
    case SelectorType.Child:
    case SelectorType.Descendant:
    case SelectorType.Parent:
    case SelectorType.Sibling:
    case SelectorType.ColumnCombinator:
      return !0;
    case SelectorType.Attribute:
    case SelectorType.Pseudo:
    case SelectorType.PseudoElement:
    case SelectorType.Tag:
    case SelectorType.Universal:
      return !1;
  }
}
const stripQuotesFromPseudos = new Set(["contains", "icontains"]);

function funescape(e, t, n) {
  const s = Number.parseInt(t, 16) - 65536;
  return Number.isNaN(s) || n ?
    t :
    s < 0 ?
    String.fromCharCode(s + 65536) :
    String.fromCharCode((s >> 10) | 55296, (1023 & s) | 56320);
}

function unescapeCSS(e) {
  return e.replace(reEscape, funescape);
}

function isQuote(e) {
  return e === CharCode.SingleQuote || e === CharCode.DoubleQuote;
}

function isWhitespace(e) {
  return (
    e === CharCode.Space ||
    e === CharCode.Tab ||
    e === CharCode.NewLine ||
    e === CharCode.FormFeed ||
    e === CharCode.CarriageReturn
  );
}

function parse$3(e) {
  const t = [],
    n = parseSelector(t, `${e}`, 0);
  if (n < e.length) throw new Error(`Unmatched selector: ${e.slice(n)}`);
  return t;
}

function parseSelector(e, t, n) {
  let s = [];

  function r(e) {
    const s = t.slice(n + e).match(reName);
    if (!s) throw new Error(`Expected name, found ${t.slice(n)}`);
    const [r] = s;
    return (n += e + r.length), unescapeCSS(r);
  }

  function i(e) {
    for (n += e; n < t.length && isWhitespace(t.charCodeAt(n));) n++;
  }

  function o() {
    const e = (n += 1);
    for (let s = 1; n < t.length; n++)
      switch (t.charCodeAt(n)) {
        case CharCode.BackSlash:
          n += 1;
          break;
        case CharCode.LeftParenthesis:
          s += 1;
          break;
        case CharCode.RightParenthesis:
          if (((s -= 1), 0 === s)) return unescapeCSS(t.slice(e, n++));
      }
    throw new Error("Parenthesis not matched");
  }

  function A() {
    if (s.length > 0 && isTraversal$1(s[s.length - 1]))
      throw new Error("Did not expect successive traversals.");
  }

  function a(e) {
    s.length > 0 && s[s.length - 1].type === SelectorType.Descendant ?
      (s[s.length - 1].type = e) :
      (A(),
        s.push({
          type: e
        }));
  }

  function l(e, t) {
    s.push({
      type: SelectorType.Attribute,
      name: e,
      action: t,
      value: r(1),
      namespace: null,
      ignoreCase: "quirks"
    });
  }

  function c() {
    if (
      (s.length > 0 &&
        s[s.length - 1].type === SelectorType.Descendant &&
        s.pop(),
        0 === s.length)
    )
      throw new Error("Empty sub-selector");
    e.push(s);
  }
  if ((i(0), t.length === n)) return n;
  e: for (; n < t.length;) {
    const e = t.charCodeAt(n);
    switch (e) {
      case CharCode.Space:
      case CharCode.Tab:
      case CharCode.NewLine:
      case CharCode.FormFeed:
      case CharCode.CarriageReturn:
        (0 !== s.length && s[0].type === SelectorType.Descendant) ||
        (A(),
          s.push({
            type: SelectorType.Descendant
          })),
        i(1);
        break;
      case CharCode.GreaterThan:
        a(SelectorType.Child), i(1);
        break;
      case CharCode.LessThan:
        a(SelectorType.Parent), i(1);
        break;
      case CharCode.Tilde:
        a(SelectorType.Sibling), i(1);
        break;
      case CharCode.Plus:
        a(SelectorType.Adjacent), i(1);
        break;
      case CharCode.Period:
        l("class", AttributeAction.Element);
        break;
      case CharCode.Hash:
        l("id", AttributeAction.Equals);
        break;
      case CharCode.LeftSquareBracket: {
        let e;
        i(1);
        let o = null;
        t.charCodeAt(n) === CharCode.Pipe ?
          (e = r(1)) :
          t.startsWith("*|", n) ?
          ((o = "*"), (e = r(2))) :
          ((e = r(0)),
            t.charCodeAt(n) === CharCode.Pipe &&
            t.charCodeAt(n + 1) !== CharCode.Equal &&
            ((o = e), (e = r(1)))),
          i(0);
        let A = AttributeAction.Exists;
        const a = actionTypes.get(t.charCodeAt(n));
        if (a) {
          if (((A = a), t.charCodeAt(n + 1) !== CharCode.Equal))
            throw new Error("Expected `=`");
          i(2);
        } else
          t.charCodeAt(n) === CharCode.Equal &&
          ((A = AttributeAction.Equals), i(1));
        let l = "",
          c = null;
        if ("exists" !== A) {
          if (isQuote(t.charCodeAt(n))) {
            const e = t.charCodeAt(n),
              s = (n += 1);
            for (; n < t.length && t.charCodeAt(n) !== e;)
              n += t.charCodeAt(n) === CharCode.BackSlash ? 2 : 1;
            if (t.charCodeAt(n) !== e)
              throw new Error("Attribute value didn't end");
            (l = unescapeCSS(t.slice(s, n))), (n += 1);
          } else {
            const e = n;
            for (; n < t.length &&
              !isWhitespace(t.charCodeAt(n)) &&
              t.charCodeAt(n) !== CharCode.RightSquareBracket;

            )
              n += t.charCodeAt(n) === CharCode.BackSlash ? 2 : 1;
            l = unescapeCSS(t.slice(e, n));
          }
          switch ((i(0), 32 | t.charCodeAt(n))) {
            case CharCode.LowerI:
              (c = !0), i(1);
              break;
            case CharCode.LowerS:
              (c = !1), i(1);
          }
        }
        if (t.charCodeAt(n) !== CharCode.RightSquareBracket)
          throw new Error("Attribute selector didn't terminate");
        n += 1;
        const u = {
          type: SelectorType.Attribute,
          name: e,
          action: A,
          value: l,
          namespace: o,
          ignoreCase: c
        };
        s.push(u);
        break;
      }
      case CharCode.Colon: {
        if (t.charCodeAt(n + 1) === CharCode.Colon) {
          s.push({
            type: SelectorType.PseudoElement,
            name: r(2).toLowerCase(),
            data: t.charCodeAt(n) === CharCode.LeftParenthesis ? o() : null
          });
          break;
        }
        const e = r(1).toLowerCase();
        if (pseudosToPseudoElements.has(e)) {
          s.push({
            type: SelectorType.PseudoElement,
            name: e,
            data: null
          });
          break;
        }
        let i = null;
        if (t.charCodeAt(n) === CharCode.LeftParenthesis)
          if (unpackPseudos.has(e)) {
            if (isQuote(t.charCodeAt(n + 1)))
              throw new Error(`Pseudo-selector ${e} cannot be quoted`);
            if (
              ((i = []),
                (n = parseSelector(i, t, n + 1)),
                t.charCodeAt(n) !== CharCode.RightParenthesis)
            )
              throw new Error(`Missing closing parenthesis in :${e} (${t})`);
            n += 1;
          } else {
            if (((i = o()), stripQuotesFromPseudos.has(e))) {
              const e = i.charCodeAt(0);
              e === i.charCodeAt(i.length - 1) &&
                isQuote(e) &&
                (i = i.slice(1, -1));
            }
            i = unescapeCSS(i);
          }
        s.push({
          type: SelectorType.Pseudo,
          name: e,
          data: i
        });
        break;
      }
      case CharCode.Comma:
        c(), (s = []), i(1);
        break;
      default: {
        if (t.startsWith("/*", n)) {
          const e = t.indexOf("*/", n + 2);
          if (-1 === e) throw new Error("Comment was not terminated");
          (n = e + 2), 0 === s.length && i(0);
          break;
        }
        let o,
          A = null;
        if (e === CharCode.Asterisk)(n += 1), (o = "*");
        else if (e === CharCode.Pipe) {
          if (((o = ""), t.charCodeAt(n + 1) === CharCode.Pipe)) {
            a(SelectorType.ColumnCombinator), i(2);
            break;
          }
        } else {
          if (!reName.test(t.slice(n))) break e;
          o = r(0);
        }
        t.charCodeAt(n) === CharCode.Pipe &&
          t.charCodeAt(n + 1) !== CharCode.Pipe &&
          ((A = o),
            t.charCodeAt(n + 1) === CharCode.Asterisk ?
            ((o = "*"), (n += 2)) :
            (o = r(1))),
          s.push(
            "*" === o ?
            {
              type: SelectorType.Universal,
              namespace: A
            } :
            {
              type: SelectorType.Tag,
              name: o,
              namespace: A
            }
          );
      }
    }
  }
  return c(), n;
}
var ElementType;

function isTag$2(e) {
  return (
    e.type === ElementType.Tag ||
    e.type === ElementType.Script ||
    e.type === ElementType.Style
  );
}!(function(e) {
  (e.Root = "root"),
  (e.Text = "text"),
  (e.Directive = "directive"),
  (e.Comment = "comment"),
  (e.Script = "script"),
  (e.Style = "style"),
  (e.Tag = "tag"),
  (e.CDATA = "cdata"),
  (e.Doctype = "doctype");
})(ElementType || (ElementType = {}));
const Root = ElementType.Root,
  Text$2 = ElementType.Text,
  Directive = ElementType.Directive,
  Comment$1 = ElementType.Comment,
  Script = ElementType.Script,
  Style = ElementType.Style,
  Tag = ElementType.Tag,
  CDATA = ElementType.CDATA,
  Doctype = ElementType.Doctype;

function isTag$1(e) {
  return isTag$2(e);
}

function isCDATA(e) {
  return e.type === ElementType.CDATA;
}

function isText(e) {
  return e.type === ElementType.Text;
}

function isComment(e) {
  return e.type === ElementType.Comment;
}

function hasChildren(e) {
  return Object.hasOwn(e, "children");
}

function filter(e, t, n = !0, s = Number.POSITIVE_INFINITY) {
  return find(e, Array.isArray(t) ? t : [t], n, s);
}

function find(e, t, n, s) {
  const r = [],
    i = [Array.isArray(t) ? t : [t]],
    o = [0];
  for (;;) {
    if (o[0] >= i[0].length) {
      if (1 === o.length) return r;
      i.shift(), o.shift();
      continue;
    }
    const t = i[0][o[0]++];
    if (e(t) && (r.push(t), --s <= 0)) return r;
    n &&
      hasChildren(t) &&
      t.children.length > 0 &&
      (o.unshift(0), i.unshift(t.children));
  }
}

function findOne$2(e, t, n = !0) {
  const s = Array.isArray(t) ? t : [t];
  for (const t of s) {
    if (isTag$1(t) && e(t)) return t;
    if (n && hasChildren(t) && t.children.length > 0) {
      const n = findOne$2(e, t.children, !0);
      if (n) return n;
    }
  }
  return null;
}

function existsOne$1(e, t) {
  return (Array.isArray(t) ? t : [t]).some(
    (t) =>
    (isTag$1(t) && e(t)) || (hasChildren(t) && existsOne$1(e, t.children))
  );
}

function findAll$1(e, t) {
  const n = [],
    s = [Array.isArray(t) ? t : [t]],
    r = [0];
  for (;;) {
    if (r[0] >= s[0].length) {
      if (1 === s.length) return n;
      s.shift(), r.shift();
      continue;
    }
    const t = s[0][r[0]++];
    isTag$1(t) && e(t) && n.push(t),
      hasChildren(t) &&
      t.children.length > 0 &&
      (r.unshift(0), s.unshift(t.children));
  }
}
const Checks = {
  tag_name: (e) =>
    "function" == typeof e ?
    (t) => isTag$1(t) && e(t.name) :
    "*" === e ?
    isTag$1 :
    (t) => isTag$1(t) && t.name === e,
  tag_type: (e) =>
    "function" == typeof e ? (t) => e(t.type) : (t) => t.type === e,
  tag_contains: (e) =>
    "function" == typeof e ?
    (t) => isText(t) && e(t.data) :
    (t) => isText(t) && t.data === e
};

function getAttribCheck(e, t) {
  return "function" == typeof t ?
    (n) => isTag$1(n) && t(n.attribs[e]) :
    (n) => isTag$1(n) && n.attribs[e] === t;
}

function combineFuncs(e, t) {
  return (n) => e(n) || t(n);
}

function compileTest(e) {
  const t = Object.keys(e).map((t) => {
    const n = e[t];
    return Object.hasOwn(Checks, t) ? Checks[t](n) : getAttribCheck(t, n);
  });
  return 0 === t.length ? null : t.reduce(combineFuncs);
}

function testElement(e, t) {
  const n = compileTest(e);
  return !n || n(t);
}

function getElements(e, t, n, s = Number.POSITIVE_INFINITY) {
  const r = compileTest(e);
  return r ? filter(r, t, n, s) : [];
}

function getElementById(e, t, n = !0) {
  return (
    Array.isArray(t) || (t = [t]), findOne$2(getAttribCheck("id", e), t, n)
  );
}

function getElementsByTagName(e, t, n = !0, s = Number.POSITIVE_INFINITY) {
  return filter(Checks.tag_name(e), t, n, s);
}

function getElementsByClassName(e, t, n = !0, s = Number.POSITIVE_INFINITY) {
  return filter(getAttribCheck("class", e), t, n, s);
}

function getElementsByTagType(e, t, n = !0, s = Number.POSITIVE_INFINITY) {
  return filter(Checks.tag_type(e), t, n, s);
}
const xmlCodeMap = new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"]
  ]),
  getCodePoint =
  "function" == typeof String.prototype.codePointAt ?
  (e, t) => e.codePointAt(t) :
  (e, t) =>
  55296 == (64512 & e.charCodeAt(t)) ?
  1024 * (e.charCodeAt(t) - 55296) +
  e.charCodeAt(t + 1) -
  56320 +
  65536 :
  e.charCodeAt(t),
  XML_BITSET_VALUE = 1342177476;

function encodeXML(e) {
  let t,
    n = 0;
  const {
    length: s
  } = e;
  for (let r = 0; r < s; r++) {
    const s = e.charCodeAt(r);
    if (s < 128 && (!((1342177476 >>> s) & 1) || s >= 64 || s < 32)) continue;
    if (
      (void 0 === t ?
        (t = e.substring(0, r)) :
        n !== r && (t += e.substring(n, r)),
        s < 64)
    ) {
      (t += xmlCodeMap.get(s)), (n = r + 1);
      continue;
    }
    const i = getCodePoint(e, r);
    (t += `&#x${i.toString(16)};`), i !== s && r++, (n = r + 1);
  }
  return void 0 === t ? e : (n < s && (t += e.substr(n)), t);
}

function getEscaper(e, t) {
  return function(n) {
    let s,
      r = 0,
      i = "";
    for (;
      (s = e.exec(n));)
      r !== s.index && (i += n.substring(r, s.index)),
      (i += t.get(s[0].charCodeAt(0))),
      (r = s.index + 1);
    return i + n.substring(r);
  };
}
const escapeAttribute = getEscaper(
    /["&\u00A0]/g,
    new Map([
      [34, "&quot;"],
      [38, "&amp;"],
      [160, "&nbsp;"]
    ])
  ),
  escapeText = getEscaper(
    /[&<>\u00A0]/g,
    new Map([
      [38, "&amp;"],
      [60, "&lt;"],
      [62, "&gt;"],
      [160, "&nbsp;"]
    ])
  ),
  elementNames = new Map(
    [
      "altGlyph",
      "altGlyphDef",
      "altGlyphItem",
      "animateColor",
      "animateMotion",
      "animateTransform",
      "clipPath",
      "feBlend",
      "feColorMatrix",
      "feComponentTransfer",
      "feComposite",
      "feConvolveMatrix",
      "feDiffuseLighting",
      "feDisplacementMap",
      "feDistantLight",
      "feDropShadow",
      "feFlood",
      "feFuncA",
      "feFuncB",
      "feFuncG",
      "feFuncR",
      "feGaussianBlur",
      "feImage",
      "feMerge",
      "feMergeNode",
      "feMorphology",
      "feOffset",
      "fePointLight",
      "feSpecularLighting",
      "feSpotLight",
      "feTile",
      "feTurbulence",
      "foreignObject",
      "glyphRef",
      "linearGradient",
      "radialGradient",
      "textPath"
    ].map((e) => [e.toLowerCase(), e])
  ),
  attributeNames = new Map(
    [
      "definitionURL",
      "attributeName",
      "attributeType",
      "baseFrequency",
      "baseProfile",
      "calcMode",
      "clipPathUnits",
      "diffuseConstant",
      "edgeMode",
      "filterUnits",
      "glyphRef",
      "gradientTransform",
      "gradientUnits",
      "kernelMatrix",
      "kernelUnitLength",
      "keyPoints",
      "keySplines",
      "keyTimes",
      "lengthAdjust",
      "limitingConeAngle",
      "markerHeight",
      "markerUnits",
      "markerWidth",
      "maskContentUnits",
      "maskUnits",
      "numOctaves",
      "pathLength",
      "patternContentUnits",
      "patternTransform",
      "patternUnits",
      "pointsAtX",
      "pointsAtY",
      "pointsAtZ",
      "preserveAlpha",
      "preserveAspectRatio",
      "primitiveUnits",
      "refX",
      "refY",
      "repeatCount",
      "repeatDur",
      "requiredExtensions",
      "requiredFeatures",
      "specularConstant",
      "specularExponent",
      "spreadMethod",
      "startOffset",
      "stdDeviation",
      "stitchTiles",
      "surfaceScale",
      "systemLanguage",
      "tableValues",
      "targetX",
      "targetY",
      "textLength",
      "viewBox",
      "viewTarget",
      "xChannelSelector",
      "yChannelSelector",
      "zoomAndPan"
    ].map((e) => [e.toLowerCase(), e])
  ),
  unencodedElements = new Set([
    "style",
    "script",
    "xmp",
    "iframe",
    "noembed",
    "noframes",
    "plaintext",
    "noscript"
  ]);

function replaceQuotes(e) {
  return e.replace(/"/g, "&quot;");
}

function formatAttributes(e, t) {
  if (!e) return;
  const n = !1 === (t.encodeEntities ?? t.decodeEntities) ?
    replaceQuotes :
    t.xmlMode || "utf8" !== t.encodeEntities ?
    encodeXML :
    escapeAttribute;
  return Object.keys(e)
    .map((s) => {
      const r = e[s],
        i = null == r ? "" : String(r);
      return (
        "foreign" === t.xmlMode && (s = attributeNames.get(s) ?? s),
        t.emptyAttrs || t.xmlMode || "" !== i ? `${s}="${n(i)}"` : s
      );
    })
    .join(" ");
}
const singleTag = new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);

function render(e, t = {}) {
  const n = "length" in e ? e : [e];
  let s = "",
    r = 0;
  for (; r < n.length;)(s += renderNode(n[r], t)), r++;
  return s;
}

function renderNode(e, t) {
  switch (e.type) {
    case Root:
      return render(e.children, t);
    case Doctype:
    case Directive:
      return renderDirective(e);
    case Comment$1:
      return renderComment(e);
    case CDATA:
      return renderCdata(e);
    case Script:
    case Style:
    case Tag:
      return renderTag(e, t);
    case Text$2:
      return renderText(e, t);
  }
}
const foreignModeIntegrationPoints = new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignObject",
    "desc",
    "title"
  ]),
  foreignElements = new Set(["svg", "math"]);

function renderTag(e, t) {
  "foreign" === t.xmlMode &&
    ((e.name = elementNames.get(e.name) ?? e.name),
      e.parent &&
      foreignModeIntegrationPoints.has(e.parent.name) &&
      (t = {
        ...t,
        xmlMode: !1
      })),
    !t.xmlMode &&
    foreignElements.has(e.name) &&
    (t = {
      ...t,
      xmlMode: "foreign"
    });
  let n = `<${e.name}`;
  const s = formatAttributes(e.attribs, t);
  return (
    s && (n += ` ${s}`),
    0 === e.children.length &&
    (t.xmlMode ?
      !1 !== t.selfClosingTags :
      t.selfClosingTags && singleTag.has(e.name)) ?
    (t.xmlMode || (n += " "), (n += "/>")) :
    ((n += ">"),
      e.children.length > 0 && (n += render(e.children, t)),
      (!t.xmlMode && singleTag.has(e.name)) || (n += `</${e.name}>`)),
    n
  );
}

function renderDirective(e) {
  return `<${e.data}>`;
}

function renderText(e, t) {
  let n = e.data || "";
  return (
    !1 === (t.encodeEntities ?? t.decodeEntities) ||
    (!t.xmlMode && e.parent && unencodedElements.has(e.parent.name)) ||
    (n =
      t.xmlMode || "utf8" !== t.encodeEntities ?
      encodeXML(n) :
      escapeText(n)),
    n
  );
}

function renderCdata(e) {
  return `<![CDATA[${e.children[0].data}]]>`;
}

function renderComment(e) {
  return `\x3c!--${e.data}--\x3e`;
}

function getOuterHTML(e, t) {
  return render(e, t);
}

function getInnerHTML(e, t) {
  return hasChildren(e) ?
    e.children.map((e) => getOuterHTML(e, t)).join("") :
    "";
}

function getText$1(e) {
  return Array.isArray(e) ?
    e.map(getText$1).join("") :
    isTag$1(e) ?
    "br" === e.name ?
    "\n" :
    getText$1(e.children) :
    isCDATA(e) ?
    getText$1(e.children) :
    isText(e) ?
    e.data :
    "";
}

function textContent(e) {
  return Array.isArray(e) ?
    e.map(textContent).join("") :
    hasChildren(e) && !isComment(e) ?
    textContent(e.children) :
    isText(e) ?
    e.data :
    "";
}

function innerText(e) {
  return Array.isArray(e) ?
    e.map(innerText).join("") :
    hasChildren(e) && (e.type === ElementType.Tag || isCDATA(e)) ?
    innerText(e.children) :
    isText(e) ?
    e.data :
    "";
}

function getFeed(e) {
  const t = getOneElement(isValidFeed, e);
  return t ? ("feed" === t.name ? getAtomFeed(t) : getRssFeed(t)) : null;
}

function getAtomFeed(e) {
  const t = e.children,
    n = {
      type: "atom",
      items: getElementsByTagName("entry", t).map((e) => {
        const {
          children: t
        } = e,
        n = {
          media: getMediaElements(t)
        };
        addConditionally(n, "id", "id", t),
          addConditionally(n, "title", "title", t);
        const s = getOneElement("link", t)?.attribs.href;
        s && (n.link = s);
        const r = fetch("summary", t) || fetch("content", t);
        r && (n.description = r);
        const i = fetch("updated", t);
        return i && (n.pubDate = new Date(i)), n;
      })
    };
  addConditionally(n, "id", "id", t), addConditionally(n, "title", "title", t);
  const s = getOneElement("link", t)?.attribs.href;
  s && (n.link = s), addConditionally(n, "description", "subtitle", t);
  const r = fetch("updated", t);
  return (
    r && (n.updated = new Date(r)),
    addConditionally(n, "author", "email", t, !0),
    n
  );
}

function getRssFeed(e) {
  const t = getOneElement("channel", e.children)?.children ?? [],
    n = {
      type: e.name.substr(0, 3),
      id: "",
      items: getElementsByTagName("item", e.children).map((e) => {
        const {
          children: t
        } = e,
        n = {
          media: getMediaElements(t)
        };
        addConditionally(n, "id", "guid", t),
          addConditionally(n, "title", "title", t),
          addConditionally(n, "link", "link", t),
          addConditionally(n, "description", "description", t);
        const s = fetch("pubDate", t) || fetch("dc:date", t);
        return s && (n.pubDate = new Date(s)), n;
      })
    };
  addConditionally(n, "title", "title", t),
    addConditionally(n, "link", "link", t),
    addConditionally(n, "description", "description", t);
  const s = fetch("lastBuildDate", t);
  return (
    s && (n.updated = new Date(s)),
    addConditionally(n, "author", "managingEditor", t, !0),
    n
  );
}
const MEDIA_KEYS_STRING = ["url", "type", "lang"],
  MEDIA_KEYS_INT = [
    "fileSize",
    "bitrate",
    "framerate",
    "samplingrate",
    "channels",
    "duration",
    "height",
    "width"
  ];

function getMediaElements(e) {
  return getElementsByTagName("media:content", e).map((e) => {
    const {
      attribs: t
    } = e,
    n = {
      medium: t.medium,
      isDefault: !!t.isDefault
    };
    for (const e of MEDIA_KEYS_STRING) t[e] && (n[e] = t[e]);
    for (const e of MEDIA_KEYS_INT) t[e] && (n[e] = Number.parseInt(t[e], 10));
    return t.expression && (n.expression = t.expression), n;
  });
}

function getOneElement(e, t) {
  return getElementsByTagName(e, t, !0, 1)[0];
}

function fetch(e, t, n = !1) {
  return textContent(getElementsByTagName(e, t, n, 1)).trim();
}

function addConditionally(e, t, n, s, r = !1) {
  const i = fetch(n, s, r);
  i && (e[t] = i);
}

function isValidFeed(e) {
  return "rss" === e || "feed" === e || "rdf:RDF" === e;
}

function removeSubsets$1(e) {
  let t = e.length;
  for (; --t >= 0;) {
    const n = e[t];
    if (t > 0 && e.lastIndexOf(n, t - 1) >= 0) e.splice(t, 1);
    else
      for (let s = n.parent; s; s = s.parent)
        if (e.includes(s)) {
          e.splice(t, 1);
          break;
        }
  }
  return e;
}
var DocumentPosition;

function compareDocumentPosition(e, t) {
  const n = [],
    s = [];
  if (e === t) return 0;
  let r = hasChildren(e) ? e : e.parent;
  for (; r;) n.unshift(r), (r = r.parent);
  for (r = hasChildren(t) ? t : t.parent; r;) s.unshift(r), (r = r.parent);
  const i = Math.min(n.length, s.length);
  let o = 0;
  for (; o < i && n[o] === s[o];) o++;
  if (0 === o) return DocumentPosition.DISCONNECTED;
  const A = n[o - 1],
    a = A.children,
    l = n[o],
    c = s[o];
  return a.indexOf(l) > a.indexOf(c) ?
    A === t ?
    DocumentPosition.FOLLOWING | DocumentPosition.CONTAINED_BY :
    DocumentPosition.FOLLOWING :
    A === e ?
    DocumentPosition.PRECEDING | DocumentPosition.CONTAINS :
    DocumentPosition.PRECEDING;
}

function uniqueSort(e) {
  return (
    (e = e.filter((e, t, n) => !n.includes(e, t + 1))).sort((e, t) => {
      const n = compareDocumentPosition(e, t);
      return n & DocumentPosition.PRECEDING ?
        -1 :
        n & DocumentPosition.FOLLOWING ?
        1 :
        0;
    }),
    e
  );
}

function removeElement(e) {
  if (
    (e.prev && (e.prev.next = e.next),
      e.next && (e.next.prev = e.prev),
      e.parent)
  ) {
    const t = e.parent.children,
      n = t.lastIndexOf(e); -
    1 !== n && t.splice(n, 1);
  }
  (e.next = null), (e.prev = null), (e.parent = null);
}

function replaceElement(e, t) {
  if (
    ((t.prev = e.prev),
      t.prev && (t.prev.next = t),
      (t.next = e.next),
      t.next && (t.next.prev = t),
      (t.parent = e.parent),
      t.parent)
  ) {
    const {
      children: n
    } = t.parent,
      s = n.lastIndexOf(e);
    if (-1 === s) return;
    (n[s] = t), (e.parent = null);
  }
}

function appendChild(e, t) {
  if (
    (removeElement(t), (t.next = null), (t.parent = e), e.children.push(t) > 1)
  ) {
    const n = e.children[e.children.length - 2];
    (n.next = t), (t.prev = n);
  } else t.prev = null;
}

function append$1(e, t) {
  removeElement(t);
  const {
    parent: n
  } = e,
  s = e.next;
  if (((t.next = s), (t.prev = e), (e.next = t), (t.parent = n), s)) {
    if (((s.prev = t), n)) {
      const e = n.children;
      e.splice(e.lastIndexOf(s), 0, t);
    }
  } else n && n.children.push(t);
}

function prependChild(e, t) {
  if (
    (removeElement(t),
      (t.parent = e),
      (t.prev = null),
      1 === e.children.unshift(t))
  )
    t.next = null;
  else {
    const n = e.children[1];
    (n.prev = t), (t.next = n);
  }
}

function prepend(e, t) {
  removeElement(t);
  const {
    parent: n
  } = e;
  if (n) {
    const s = n.children;
    s.splice(s.indexOf(e), 0, t);
  }
  e.prev && (e.prev.next = t),
    (t.parent = n),
    (t.prev = e.prev),
    (t.next = e),
    (e.prev = t);
}

function getChildren$1(e) {
  return hasChildren(e) ? e.children : [];
}

function getParent$1(e) {
  return e.parent || null;
}

function getSiblings$1(e) {
  const t = getParent$1(e);
  if (null != t) return getChildren$1(t);
  const n = [e];
  let {
    prev: s,
    next: r
  } = e;
  for (; null != s;) n.unshift(s), ({
    prev: s
  } = s);
  for (; null != r;) n.push(r), ({
    next: r
  } = r);
  return n;
}

function getAttributeValue$1(e, t) {
  const {
    attribs: n
  } = e;
  return n?.[t];
}

function hasAttrib$1(e, t) {
  const {
    attribs: n
  } = e;
  return null != n && Object.hasOwn(n, t) && null != n[t];
}

function getName$1(e) {
  return e.name;
}

function nextElementSibling(e) {
  let {
    next: t
  } = e;
  for (; null !== t && !isTag$1(t);)({
    next: t
  } = t);
  return t;
}

function prevElementSibling(e) {
  let {
    prev: t
  } = e;
  for (; null !== t && !isTag$1(t);)({
    prev: t
  } = t);
  return t;
}!(function(e) {
  (e[(e.DISCONNECTED = 1)] = "DISCONNECTED"),
  (e[(e.PRECEDING = 2)] = "PRECEDING"),
  (e[(e.FOLLOWING = 4)] = "FOLLOWING"),
  (e[(e.CONTAINS = 8)] = "CONTAINS"),
  (e[(e.CONTAINED_BY = 16)] = "CONTAINED_BY");
})(DocumentPosition || (DocumentPosition = {}));
var DomUtils = Object.freeze({
  __proto__: null,
  get DocumentPosition() {
    return DocumentPosition;
  },
  append: append$1,
  appendChild: appendChild,
  compareDocumentPosition: compareDocumentPosition,
  existsOne: existsOne$1,
  filter: filter,
  find: find,
  findAll: findAll$1,
  findOne: findOne$2,
  getAttributeValue: getAttributeValue$1,
  getChildren: getChildren$1,
  getElementById: getElementById,
  getElements: getElements,
  getElementsByClassName: getElementsByClassName,
  getElementsByTagName: getElementsByTagName,
  getElementsByTagType: getElementsByTagType,
  getFeed: getFeed,
  getInnerHTML: getInnerHTML,
  getName: getName$1,
  getOuterHTML: getOuterHTML,
  getParent: getParent$1,
  getSiblings: getSiblings$1,
  getText: getText$1,
  hasAttrib: hasAttrib$1,
  innerText: innerText,
  nextElementSibling: nextElementSibling,
  prepend: prepend,
  prependChild: prependChild,
  prevElementSibling: prevElementSibling,
  removeElement: removeElement,
  removeSubsets: removeSubsets$1,
  replaceElement: replaceElement,
  testElement: testElement,
  textContent: textContent,
  uniqueSort: uniqueSort
});
const reChars = /[-[\]{}()*+?.,\\^$|#\s]/g,
  whitespaceRe = /\s/;

function escapeRegex(e) {
  return e.replace(reChars, "\\$&");
}
const caseInsensitiveAttributes = new Set([
  "accept",
  "accept-charset",
  "align",
  "alink",
  "axis",
  "bgcolor",
  "charset",
  "checked",
  "clear",
  "codetype",
  "color",
  "compact",
  "declare",
  "defer",
  "dir",
  "direction",
  "disabled",
  "enctype",
  "face",
  "frame",
  "hreflang",
  "http-equiv",
  "lang",
  "language",
  "link",
  "media",
  "method",
  "multiple",
  "nohref",
  "noresize",
  "noshade",
  "nowrap",
  "readonly",
  "rel",
  "rev",
  "rules",
  "scope",
  "scrolling",
  "selected",
  "shape",
  "target",
  "text",
  "type",
  "valign",
  "valuetype",
  "vlink"
]);

function shouldIgnoreCase(e, t) {
  return "boolean" == typeof e.ignoreCase ?
    e.ignoreCase :
    "quirks" === e.ignoreCase ?
    !!t.quirksMode :
    !t.xmlMode && caseInsensitiveAttributes.has(e.name);
}
const attributeRules = {
  equals(e, t, n) {
    const {
      adapter: s
    } = n, {
      name: r
    } = t;
    let {
      value: i
    } = t;
    return shouldIgnoreCase(t, n) ?
      ((i = i.toLowerCase()),
        (t) => {
          const n = s.getAttributeValue(t, r);
          return (
            null != n && n.length === i.length && n.toLowerCase() === i && e(t)
          );
        }) :
      (t) => s.getAttributeValue(t, r) === i && e(t);
  },
  hyphen(e, t, n) {
    const {
      adapter: s
    } = n, {
      name: r
    } = t;
    let {
      value: i
    } = t;
    const {
      length: o
    } = i;
    return shouldIgnoreCase(t, n) ?
      ((i = i.toLowerCase()),
        function(t) {
          const n = s.getAttributeValue(t, r);
          return (
            null != n &&
            (n.length === o || "-" === n.charAt(o)) &&
            n.substr(0, o).toLowerCase() === i &&
            e(t)
          );
        }) :
      function(t) {
        const n = s.getAttributeValue(t, r);
        return (
          null != n &&
          (n.length === o || "-" === n.charAt(o)) &&
          n.substr(0, o) === i &&
          e(t)
        );
      };
  },
  element(e, t, n) {
    const {
      adapter: s
    } = n, {
      name: r,
      value: i
    } = t;
    if (whitespaceRe.test(i)) return falseFunc;
    const o = new RegExp(
      `(?:^|\\s)${escapeRegex(i)}(?:$|\\s)`,
      shouldIgnoreCase(t, n) ? "i" : ""
    );
    return function(t) {
      const n = s.getAttributeValue(t, r);
      return null != n && n.length >= i.length && o.test(n) && e(t);
    };
  },
  exists: (e, {
      name: t
    }, {
      adapter: n
    }) =>
    (s) =>
    n.hasAttrib(s, t) && e(s),
  start(e, t, n) {
    const {
      adapter: s
    } = n, {
      name: r
    } = t;
    let {
      value: i
    } = t;
    const {
      length: o
    } = i;
    return 0 === o ?
      falseFunc :
      shouldIgnoreCase(t, n) ?
      ((i = i.toLowerCase()),
        (t) => {
          const n = s.getAttributeValue(t, r);
          return (
            null != n &&
            n.length >= o &&
            n.substr(0, o).toLowerCase() === i &&
            e(t)
          );
        }) :
      (t) => !!s.getAttributeValue(t, r)?.startsWith(i) && e(t);
  },
  end(e, t, n) {
    const {
      adapter: s
    } = n, {
      name: r
    } = t;
    let {
      value: i
    } = t;
    const o = -i.length;
    return 0 === o ?
      falseFunc :
      shouldIgnoreCase(t, n) ?
      ((i = i.toLowerCase()),
        (t) => s.getAttributeValue(t, r)?.substr(o).toLowerCase() === i && e(t)) :
      (t) => !!s.getAttributeValue(t, r)?.endsWith(i) && e(t);
  },
  any(e, t, n) {
    const {
      adapter: s
    } = n, {
      name: r,
      value: i
    } = t;
    if ("" === i) return falseFunc;
    if (shouldIgnoreCase(t, n)) {
      const t = new RegExp(escapeRegex(i), "i");
      return function(n) {
        const o = s.getAttributeValue(n, r);
        return null != o && o.length >= i.length && t.test(o) && e(n);
      };
    }
    return (t) => !!s.getAttributeValue(t, r)?.includes(i) && e(t);
  },
  not(e, t, n) {
    const {
      adapter: s
    } = n, {
      name: r
    } = t;
    let {
      value: i
    } = t;
    return "" === i ?
      (t) => !!s.getAttributeValue(t, r) && e(t) :
      shouldIgnoreCase(t, n) ?
      ((i = i.toLowerCase()),
        (t) => {
          const n = s.getAttributeValue(t, r);
          return (
            (null == n || n.length !== i.length || n.toLowerCase() !== i) &&
            e(t)
          );
        }) :
      (t) => s.getAttributeValue(t, r) !== i && e(t);
  }
};

function findOne$1(e, t, n) {
  const {
    adapter: s,
    xmlMode: r = !1
  } = n,
  i = [t],
    o = [0];
  for (;;) {
    if (o[0] >= i[0].length) {
      if (1 === i.length) return null;
      i.shift(), o.shift();
      continue;
    }
    const t = i[0][o[0]++];
    if (s.isTag(t)) {
      if (e(t)) return t;
      if (r || "template" !== s.getName(t)) {
        const e = s.getChildren(t);
        e.length > 0 && (i.unshift(e), o.unshift(0));
      }
    }
  }
}

function getNextSiblings(e, t) {
  const n = t.getSiblings(e);
  if (n.length <= 1) return [];
  const s = n.indexOf(e);
  return -1 === s || s === n.length - 1 ? [] : n.slice(s + 1).filter(t.isTag);
}

function getElementParent(e, t) {
  const n = t.getParent(e);
  return null != n && t.isTag(n) ? n : null;
}
const textControl =
  "input:is([type=text i],[type=search i],[type=url i],[type=tel i],[type=email i],[type=password i],[type=date i],[type=month i],[type=week i],[type=time i],[type=datetime-local i],[type=number i])",
  aliases = {
    "any-link": ":is(a, area, link)[href]",
    link: ":any-link:not(:visited)",
    disabled: ":is(\n        :is(button, input, select, textarea, optgroup, option)[disabled],\n        optgroup[disabled] > option,\n        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)\n    )",
    enabled: ":is(button, input, select, textarea, optgroup, option, fieldset):not(:disabled)",
    checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], :selected)",
    required: ":is(input, select, textarea)[required]",
    optional: ":is(input, select, textarea):not([required])",
    "read-only": `[readonly]:is(textarea, ${textControl})`,
    "read-write": `:not([readonly]):is(textarea, ${textControl})`,
    selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
    checkbox: "[type=checkbox]",
    file: "[type=file]",
    password: "[type=password]",
    radio: "[type=radio]",
    reset: "[type=reset]",
    image: "[type=image]",
    submit: "[type=submit]",
    parent: ":not(:empty)",
    header: ":is(h1, h2, h3, h4, h5, h6)",
    button: ":is(button, input[type=button])",
    input: ":is(input, textarea, select, button)",
    text: "input:is(:not([type!='']), [type=text])"
  };

function compile$1(e) {
  const t = e[0],
    n = e[1] - 1;
  if (n < 0 && t <= 0) return falseFunc;
  if (-1 === t) return (e) => e <= n;
  if (0 === t) return (e) => e === n;
  if (1 === t) return n < 0 ? trueFunc : (e) => e >= n;
  const s = Math.abs(t),
    r = ((n % s) + s) % s;
  return t > 1 ? (e) => e >= n && e % s === r : (e) => e <= n && e % s === r;
}
const whitespace = new Set([9, 10, 12, 13, 32]),
  ZERO = "0".charCodeAt(0),
  NINE = "9".charCodeAt(0);

function parse$2(e) {
  switch ((e = e.trim().toLowerCase())) {
    case "even":
      return [2, 0];
    case "odd":
      return [2, 1];
  }
  let t = 0,
    n = 0,
    s = i(),
    r = o();
  if (
    (t < e.length &&
      "n" === e.charAt(t) &&
      (t++,
        (n = s * (r ?? 1)),
        A(),
        t < e.length ? ((s = i()), A(), (r = o())) : (s = r = 0)),
      null === r || t < e.length)
  )
    throw new Error(`n-th rule couldn't be parsed ('${e}')`);
  return [n, s * r];

  function i() {
    switch (e.charAt(t)) {
      case "-":
        return t++, -1;
      case "+":
        t++;
    }
    return 1;
  }

  function o() {
    const n = t;
    let s = 0;
    for (; t < e.length && e.charCodeAt(t) >= ZERO && e.charCodeAt(t) <= NINE;)
      (s = 10 * s + (e.charCodeAt(t) - ZERO)), t++;
    return t === n ? null : s;
  }

  function A() {
    for (; t < e.length && whitespace.has(e.charCodeAt(t));) t++;
  }
}

function nthCheck(e) {
  return compile$1(parse$2(e));
}

function cacheParentResults(e, {
  adapter: t,
  cacheResults: n
}, s) {
  if (!1 === n || "undefined" == typeof WeakMap) return (t) => e(t) && s(t);
  const r = new WeakMap();

  function i(e) {
    const t = s(e);
    return r.set(e, t), t;
  }
  return function(n) {
    if (!e(n)) return !1;
    if (r.has(n)) return r.get(n) ?? !1;
    let s = n;
    do {
      const e = getElementParent(s, t);
      if (null === e) return i(n);
      s = e;
    } while (!r.has(s));
    return !!r.get(s) && i(n);
  };
}

function copyOptions(e) {
  const {
    context: t,
    rootFunc: n,
    ...s
  } = e;
  return s;
}

function extendedFilter(e, t) {
  if ("*" !== t[0] && t[0] !== e[0]) return !1;
  let n = 1;
  for (let s = 1; s < t.length; s++)
    if ("*" !== t[s]) {
      for (; n < e.length && e[n] !== t[s];)
        if (e[n++].length <= 1) return !1;
      if (n >= e.length) return !1;
      n++;
    }
  return !0;
}
const nthOfRegex = /^(.+?)\s+of\s+(.+)$/is;

function compileNth(e, t) {
  return function(n, s, r, i, o) {
    const {
      adapter: A,
      equals: a
    } = r,
    l = t ? null : s.match(nthOfRegex),
      c = nthCheck(l ? l[1].trim() : s);
    if (c === falseFunc) return falseFunc;
    const u = l && o ? o(parse$3(l[2].trim()), copyOptions(r), i) : void 0;
    if (u === falseFunc) return falseFunc;
    if (c === trueFunc && !u)
      return (e) => null !== getElementParent(e, A) && n(e);
    const h = u ?
      (e, t) => u(t) :
      t ?
      (e, t) => A.getName(t) === A.getName(e) :
      trueFunc;
    return e ?
      function(e) {
        if (u && !u(e)) return !1;
        const t = A.getSiblings(e);
        let s = 0;
        for (let n = t.length - 1; n >= 0; n--) {
          const r = t[n];
          if (a(e, r)) break;
          A.isTag(r) && h(e, r) && s++;
        }
        return c(s) && n(e);
      } :
      function(e) {
        if (u && !u(e)) return !1;
        const t = A.getSiblings(e);
        let s = 0;
        for (const n of t) {
          if (a(e, n)) break;
          A.isTag(n) && h(e, n) && s++;
        }
        return c(s) && n(e);
      };
  };
}
const filters = {
  contains(e, t, n) {
    const {
      getText: s
    } = n.adapter;
    return cacheParentResults(e, n, (e) => s(e).includes(t));
  },
  icontains(e, t, n) {
    const s = t.toLowerCase(),
      {
        getText: r
      } = n.adapter;
    return cacheParentResults(e, n, (e) => r(e).toLowerCase().includes(s));
  },
  "nth-child": compileNth(!1, !1),
  "nth-last-child": compileNth(!0, !1),
  "nth-of-type": compileNth(!1, !0),
  "nth-last-of-type": compileNth(!0, !0),
  root: (e, t, {
      adapter: n
    }) =>
    (t) =>
    null === getElementParent(t, n) && e(t),
  scope(e, t, n, s) {
    const {
      equals: r
    } = n;
    return s && 0 !== s.length ?
      1 === s.length ?
      (t) => r(s[0], t) && e(t) :
      (t) => s.includes(t) && e(t) :
      filters.root(e, t, n);
  },
  lang(e, t, {
    adapter: n
  }) {
    const s = t
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e.length > 0)
      .map((e) =>
        e
        .replace(/^['"]|['"]$/g, "")
        .toLowerCase()
        .split("-")
      );
    return function(t) {
      let r = t;
      for (; null != r;) {
        const i =
          n.getAttributeValue(r, "xml:lang") ?? n.getAttributeValue(r, "lang");
        if (null != i) {
          if (!i) return s.some((e) => "" === e[0]) && e(t);
          const n = i.toLowerCase().split("-");
          return s.some((e) => extendedFilter(n, e)) && e(t);
        }
        const o = n.getParent(r);
        r = null != o && n.isTag(o) ? o : null;
      }
      return s.some((e) => "" === e[0]) && e(t);
    };
  },
  hover: dynamicStatePseudo("isHovered"),
  visited: dynamicStatePseudo("isVisited"),
  active: dynamicStatePseudo("isActive")
};

function dynamicStatePseudo(e) {
  return function(t, n, {
    adapter: s
  }) {
    const r = s[e];
    return "function" != typeof r ?
      falseFunc :
      function(e) {
        return r(e) && t(e);
      };
  };
}
const isDocumentWhiteSpace = /^[ \t\r\n]*$/,
  pseudos = {
    empty(e, {
      adapter: t
    }) {
      const n = t.getChildren(e);
      return (
        n.every((e) => !t.isTag(e)) &&
        n.every((e) => isDocumentWhiteSpace.test(t.getText(e)))
      );
    },
    "first-child"(e, {
      adapter: t,
      equals: n
    }) {
      if (t.prevElementSibling) return null == t.prevElementSibling(e);
      const s = t.getSiblings(e).find((e) => t.isTag(e));
      return null != s && n(e, s);
    },
    "last-child"(e, {
      adapter: t,
      equals: n
    }) {
      const s = t.getSiblings(e);
      for (let r = s.length - 1; r >= 0; r--) {
        if (n(e, s[r])) return !0;
        if (t.isTag(s[r])) break;
      }
      return !1;
    },
    "first-of-type"(e, {
      adapter: t,
      equals: n
    }) {
      const s = t.getSiblings(e),
        r = t.getName(e);
      for (const i of s) {
        if (n(e, i)) return !0;
        if (t.isTag(i) && t.getName(i) === r) break;
      }
      return !1;
    },
    "last-of-type"(e, {
      adapter: t,
      equals: n
    }) {
      const s = t.getSiblings(e),
        r = t.getName(e);
      for (let i = s.length - 1; i >= 0; i--) {
        const o = s[i];
        if (n(e, o)) return !0;
        if (t.isTag(o) && t.getName(o) === r) break;
      }
      return !1;
    },
    "only-of-type"(e, {
      adapter: t,
      equals: n
    }) {
      const s = t.getName(e);
      return t
        .getSiblings(e)
        .every((r) => n(e, r) || !t.isTag(r) || t.getName(r) !== s);
    },
    "only-child": (e, {
        adapter: t,
        equals: n
      }) =>
      t.getSiblings(e).every((s) => n(e, s) || !t.isTag(s))
  };

function verifyPseudoArguments(e, t, n, s) {
  if (null === n) {
    if (e.length > s)
      throw new Error(`Pseudo-class :${t} requires an argument`);
  } else if (e.length === s)
    throw new Error(`Pseudo-class :${t} doesn't have any arguments`);
}

function isTraversal(e) {
  return "_flexibleDescendant" === e.type || isTraversal$1(e);
}

function sortRules(e) {
  const t = e.map(getQuality);
  for (let n = 1; n < e.length; n++) {
    const s = t[n];
    if (!(s < 0))
      for (let r = n; r > 0 && s < t[r - 1]; r--) {
        const n = e[r];
        (e[r] = e[r - 1]), (e[r - 1] = n), (t[r] = t[r - 1]), (t[r - 1] = s);
      }
  }
}

function getAttributeQuality(e) {
  switch (e.action) {
    case AttributeAction.Exists:
      return 10;
    case AttributeAction.Equals:
      return "id" === e.name ? 9 : 8;
    case AttributeAction.Not:
      return 7;
    case AttributeAction.Start:
    case AttributeAction.End:
      return 6;
    case AttributeAction.Any:
      return 5;
    case AttributeAction.Hyphen:
      return 4;
    case AttributeAction.Element:
      return 3;
  }
}

function getQuality(e) {
  switch (e.type) {
    case SelectorType.Universal:
      return 50;
    case SelectorType.Tag:
      return 30;
    case SelectorType.Attribute:
      return Math.floor(getAttributeQuality(e) / (e.ignoreCase ? 2 : 1));
    case SelectorType.Pseudo:
      return e.data ?
        "has" === e.name || "contains" === e.name || "icontains" === e.name ?
        0 :
        Array.isArray(e.data) ?
        Math.max(
          0,
          Math.min(...e.data.map((e) => Math.min(...e.map(getQuality))))
        ) :
        2 :
        3;
    default:
      return -1;
  }
}

function includesScopePseudo(e) {
  return (
    e.type === SelectorType.Pseudo &&
    ("scope" === e.name ||
      (Array.isArray(e.data) &&
        e.data.some((e) => e.some(includesScopePseudo))))
  );
}
const PLACEHOLDER_ELEMENT = {};

function hasDependsOnCurrentElement(e) {
  return e.some(
    (e) => e.length > 0 && (isTraversal(e[0]) || e.some(includesScopePseudo))
  );
}
const is$1 = (e, t, n, s, r) => {
    const i = r(t, copyOptions(n), s);
    return i === trueFunc ?
      e :
      i === falseFunc ?
      falseFunc :
      (t) => i(t) && e(t);
  },
  subselects = {
    is: is$1,
    matches: is$1,
    where: is$1,
    not(e, t, n, s, r) {
      const i = r(t, copyOptions(n), s);
      return i === falseFunc ?
        e :
        i === trueFunc ?
        falseFunc :
        (t) => !i(t) && e(t);
    },
    has(e, t, n, s, r) {
      const {
        adapter: i
      } = n,
      o = copyOptions(n);
      o.relativeSelector = !0;
      const A = t.some((e) => e.some(isTraversal)) ?
        [PLACEHOLDER_ELEMENT] :
        void 0,
        a = hasDependsOnCurrentElement(t),
        l = r(t, o, A);
      if (l === falseFunc) return falseFunc;
      if (A && l !== trueFunc)
        return a ?
          (t) => {
            if (!e(t)) return !1;
            A[0] = t;
            const s = i.getChildren(t);
            return (
              null !==
              findOne$1(
                l,
                l.shouldTestNextSiblings ?
                [...s, ...getNextSiblings(t, i)] :
                s,
                n
              )
            );
          } :
          cacheParentResults(
            e,
            n,
            (e) => ((A[0] = e), null !== findOne$1(l, i.getChildren(e), n))
          );
      const c = (e) => null !== findOne$1(l, i.getChildren(e), n);
      return a ? (t) => e(t) && c(t) : cacheParentResults(e, n, c);
    }
  };

function compilePseudoSelector(e, t, n, s, r) {
  const {
    name: i,
    data: o
  } = t;
  if (Array.isArray(o)) {
    if (!(i in subselects)) throw new Error(`Unknown pseudo-class :${i}(${o})`);
    return subselects[i](e, o, n, s, r);
  }
  const A = n.pseudos?.[i],
    a = "string" == typeof A ? A : aliases[i];
  if ("string" == typeof a) {
    if (null != o) throw new Error(`Pseudo ${i} doesn't have any arguments`);
    const t = parse$3(a);
    return subselects.is(e, t, n, s, r);
  }
  if ("function" == typeof A)
    return verifyPseudoArguments(A, i, o, 1), (t) => A(t, o) && e(t);
  if (i in filters) return filters[i](e, o, n, s, r);
  if (i in pseudos) {
    const t = pseudos[i];
    return verifyPseudoArguments(t, i, o, 2), (s) => t(s, n, o) && e(s);
  }
  throw new Error(`Unknown pseudo-class :${i}`);
}

function compileGeneralSelector(e, t, n, s, r, i) {
  const {
    adapter: o,
    equals: A,
    cacheResults: a
  } = n;
  switch (t.type) {
    case SelectorType.PseudoElement:
      throw new Error("Pseudo-elements are not supported by css-select");
    case SelectorType.ColumnCombinator:
      throw new Error("Column combinators are not yet supported by css-select");
    case SelectorType.Attribute:
      if (null != t.namespace)
        throw new Error(
          "Namespaced attributes are not yet supported by css-select"
        );
      return (
        (n.xmlMode && !n.lowerCaseAttributeNames) ||
        (t.name = t.name.toLowerCase()),
        attributeRules[t.action](e, t, n)
      );
    case SelectorType.Pseudo:
      return compilePseudoSelector(e, t, n, s, r);
    case SelectorType.Tag: {
      if (null != t.namespace)
        throw new Error(
          "Namespaced tag names are not yet supported by css-select"
        );
      let {
        name: s
      } = t;
      return (
        (n.xmlMode && !n.lowerCaseTags) || (s = s.toLowerCase()),
        function(t) {
          return o.getName(t) === s && e(t);
        }
      );
    }
    case SelectorType.Descendant: {
      if (!i || !1 === a || "undefined" == typeof WeakMap)
        return function(t) {
          let n = t;
          for (;
            (n = getElementParent(n, o));)
            if (e(n)) return !0;
          return !1;
        };
      const t = new WeakMap();
      return function(n) {
        let s,
          r = n;
        for (;
          (r = getElementParent(r, o));) {
          const n = t.get(r);
          if (void 0 !== n) return s && (s.matches = n.matches), n.matches;
          if (
            ((s = s ?? {
                matches: !1
              }),
              (s.matches = e(r)),
              t.set(r, s),
              s.matches)
          )
            return !0;
        }
        return !1;
      };
    }
    case "_flexibleDescendant":
      return function(t) {
        let n = t;
        do {
          if (e(n)) return !0;
          n = getElementParent(n, o);
        } while (n);
        return !1;
      };
    case SelectorType.Parent:
      return function(t) {
        return o.getChildren(t).some((t) => o.isTag(t) && e(t));
      };
    case SelectorType.Child:
      return function(t) {
        const n = getElementParent(t, o);
        return null !== n && e(n);
      };
    case SelectorType.Sibling:
      return function(t) {
        const n = o.getSiblings(t);
        for (const s of n) {
          if (A(t, s)) break;
          if (o.isTag(s) && e(s)) return !0;
        }
        return !1;
      };
    case SelectorType.Adjacent:
      return o.prevElementSibling ?
        function(t) {
          const n = o.prevElementSibling(t);
          return null != n && e(n);
        } :
        function(t) {
          const n = o.getSiblings(t);
          let s;
          for (const e of n) {
            if (A(t, e)) break;
            o.isTag(e) && (s = e);
          }
          return !!s && e(s);
        };
    case SelectorType.Universal:
      if (null != t.namespace && "*" !== t.namespace)
        throw new Error(
          "Namespaced universal selectors are not yet supported by css-select"
        );
      return e;
  }
}
const DESCENDANT_TOKEN = {
    type: SelectorType.Descendant
  },
  FLEXIBLE_DESCENDANT_TOKEN = {
    type: "_flexibleDescendant"
  },
  SCOPE_TOKEN = {
    type: SelectorType.Pseudo,
    name: "scope",
    data: null
  };

function absolutize(e, {
  adapter: t
}, n) {
  const s = !!n?.every(
    (e) =>
    e === PLACEHOLDER_ELEMENT ||
    (t.isTag(e) && null !== getElementParent(e, t))
  );
  for (const t of e) {
    if (
      t.length > 0 &&
      isTraversal(t[0]) &&
      t[0].type !== SelectorType.Descendant
    );
    else {
      if (!s || t.some(includesScopePseudo)) continue;
      t.unshift(DESCENDANT_TOKEN);
    }
    t.unshift(SCOPE_TOKEN);
  }
}

function compileToken(e, t, n) {
  for (const t of e) sortRules(t);
  const {
    context: s = n,
    rootFunc: r = trueFunc
  } = t,
  i = Array.isArray(s),
    o = s && (Array.isArray(s) ? s : [s]);
  if (!1 !== t.relativeSelector) absolutize(e, t, o);
  else if (e.some((e) => e.length > 0 && isTraversal(e[0])))
    throw new Error(
      "Relative selectors are not allowed when the `relativeSelector` option is disabled"
    );
  let A = !1,
    a = falseFunc;
  e: for (const n of e) {
    if (n.length >= 2) {
      const [e, t] = n;
      e.type !== SelectorType.Pseudo ||
        "scope" !== e.name ||
        (i && t.type === SelectorType.Descendant ?
          (n[1] = FLEXIBLE_DESCENDANT_TOKEN) :
          (t.type !== SelectorType.Adjacent &&
            t.type !== SelectorType.Sibling) ||
          (A = !0));
    }
    let e = r,
      s = !1;
    for (const r of n) {
      e = compileGeneralSelector(e, r, t, o, compileToken, s);
      if ((0 === getQuality(r) && (s = !0), e === falseFunc)) continue e;
    }
    if (e === r) return r;
    a = a === falseFunc ? e : or(a, e);
  }
  return (a.shouldTestNextSiblings = A), a;
}

function or(e, t) {
  return (n) => e(n) || t(n);
}
const defaultEquals = (e, t) => e === t,
  defaultOptions = {
    adapter: {
      ...DomUtils,
      isTag: isTag$1
    },
    equals: defaultEquals
  };

function convertOptionFormats(e) {
  const t = e ?? defaultOptions;
  return (
    (t.adapter = t.adapter ?? defaultOptions.adapter),
    (t.equals = t.equals ?? t.adapter?.equals ?? defaultEquals),
    t
  );
}

function compile(e, t, n) {
  const s = convertOptionFormats(t),
    r = _compileUnsafe(e, s, n);
  return r === falseFunc ? falseFunc : (e) => s.adapter.isTag(e) && r(e);
}

function _compileUnsafe(e, t, n) {
  return compileToken(
    "string" == typeof e ? parse$3(e) : e,
    convertOptionFormats(t),
    n
  );
}

function is(e, t, n) {
  return ("function" == typeof t ? t : compile(t, n))(e);
}
const {
  isArray: isArray
} = Array,
isTag = ({
    nodeType: e
  }) => 1 === e,
  existsOne = (e, t) =>
  t.some((t) => isTag(t) && (e(t) || existsOne(e, getChildren(t)))),
  getAttributeValue = (e, t) =>
  "class" === t ? e.classList.value : e.getAttribute(t),
  getChildren = ({
    childNodes: e
  }) => e,
  getName = (e) => {
    const {
      localName: t
    } = e;
    return ignoreCase(e) ? t.toLowerCase() : t;
  },
  getParent = ({
    parentNode: e
  }) => e,
  getSiblings = (e) => {
    const {
      parentNode: t
    } = e;
    return t ? getChildren(t) : e;
  },
  getText = (e) =>
  isArray(e) ?
  e.map(getText).join("") :
  isTag(e) ?
  getText(getChildren(e)) :
  3 === e.nodeType ?
  e.data :
  "",
  hasAttrib = (e, t) => e.hasAttribute(t),
  removeSubsets = (e) => {
    let {
      length: t
    } = e;
    for (; t--;) {
      const n = e[t];
      if (t && -1 < e.lastIndexOf(n, t - 1)) e.splice(t, 1);
      else
        for (let {
            parentNode: s
          } = n; s; s = s.parentNode)
          if (e.includes(s)) {
            e.splice(t, 1);
            break;
          }
    }
    return e;
  },
  findAll = (e, t) => {
    const n = [];
    for (const s of t)
      isTag(s) && (e(s) && n.push(s), n.push(...findAll(e, getChildren(s))));
    return n;
  },
  findOne = (e, t) => {
    for (let n of t)
      if (e(n) || (n = findOne(e, getChildren(n)))) return n;
    return null;
  },
  adapter = {
    isTag: isTag,
    existsOne: existsOne,
    getAttributeValue: getAttributeValue,
    getChildren: getChildren,
    getName: getName,
    getParent: getParent,
    getSiblings: getSiblings,
    getText: getText,
    hasAttrib: hasAttrib,
    removeSubsets: removeSubsets,
    findAll: findAll,
    findOne: findOne
  },
  prepareMatch = (e, t) =>
  compile(t, {
    context: t.includes(":scope") ? e : void 0,
    xmlMode: !ignoreCase(e),
    adapter: adapter
  }),
  matches = (e, t) =>
  is(e, t, {
    strict: !0,
    context: t.includes(":scope") ? e : void 0,
    xmlMode: !ignoreCase(e),
    adapter: adapter
  });
let Text$1 = class e extends CharacterData$1 {
  constructor(e, t = "") {
    super(e, "#text", 3, t);
  }
  get wholeText() {
    const e = [];
    let {
      previousSibling: t,
      nextSibling: n
    } = this;
    for (; t && 3 === t.nodeType;)
      e.unshift(t[VALUE]), (t = t.previousSibling);
    for (e.push(this[VALUE]); n && 3 === n.nodeType;)
      e.push(n[VALUE]), (n = n.nextSibling);
    return e.join("");
  }
  cloneNode() {
    const {
      ownerDocument: t,
      [VALUE]: n
    } = this;
    return new e(t, n);
  }
  toString() {
    return escape(this[VALUE]);
  }
};
const isNode = (e) => e instanceof Node$1,
  insert = (e, t, n) => {
    const {
      ownerDocument: s
    } = e;
    for (const r of n) e.insertBefore(isNode(r) ? r : new Text$1(s, r), t);
  };
class ParentNode extends Node$1 {
  constructor(e, t, n) {
    super(e, t, n),
      (this[PRIVATE] = null),
      (this[NEXT] = this[END] = {
        [NEXT]: null,
        [PREV]: this,
        [START]: this,
        nodeType: -1,
        ownerDocument: this.ownerDocument,
        parentNode: null
      });
  }
  get childNodes() {
    const e = new NodeList();
    let {
      firstChild: t
    } = this;
    for (; t;) e.push(t), (t = nextSibling(t));
    return e;
  }
  get children() {
    const e = new NodeList();
    let {
      firstElementChild: t
    } = this;
    for (; t;) e.push(t), (t = nextElementSibling$1(t));
    return e;
  }
  get firstChild() {
    let {
      [NEXT]: e, [END]: t
    } = this;
    for (; 2 === e.nodeType;) e = e[NEXT];
    return e === t ? null : e;
  }
  get firstElementChild() {
    let {
      firstChild: e
    } = this;
    for (; e;) {
      if (1 === e.nodeType) return e;
      e = nextSibling(e);
    }
    return null;
  }
  get lastChild() {
    const e = this[END][PREV];
    switch (e.nodeType) {
      case -1:
        return e[START];
      case 2:
        return null;
    }
    return e === this ? null : e;
  }
  get lastElementChild() {
    let {
      lastChild: e
    } = this;
    for (; e;) {
      if (1 === e.nodeType) return e;
      e = previousSibling(e);
    }
    return null;
  }
  get childElementCount() {
    return this.children.length;
  }
  prepend(...e) {
    insert(this, this.firstChild, e);
  }
  append(...e) {
    insert(this, this[END], e);
  }
  replaceChildren(...e) {
    let {
      [NEXT]: t, [END]: n
    } = this;
    for (; t !== n && 2 === t.nodeType;) t = t[NEXT];
    for (; t !== n;) {
      const e = getEnd(t)[NEXT];
      t.remove(), (t = e);
    }
    e.length && insert(this, n, e);
  }
  getElementsByClassName(e) {
    const t = new NodeList();
    let {
      [NEXT]: n, [END]: s
    } = this;
    for (; n !== s;)
      1 === n.nodeType &&
      n.hasAttribute("class") &&
      n.classList.has(e) &&
      t.push(n),
      (n = n[NEXT]);
    return t;
  }
  getElementsByTagName(e) {
    const t = new NodeList();
    let {
      [NEXT]: n, [END]: s
    } = this;
    for (; n !== s;)
      1 !== n.nodeType ||
      (n.localName !== e && localCase(n) !== e) ||
      t.push(n),
      (n = n[NEXT]);
    return t;
  }
  querySelector(e) {
    const t = prepareMatch(this, e);
    let {
      [NEXT]: n, [END]: s
    } = this;
    for (; n !== s;) {
      if (1 === n.nodeType && t(n)) return n;
      n = 1 === n.nodeType && "template" === n.localName ? n[END] : n[NEXT];
    }
    return null;
  }
  querySelectorAll(e) {
    const t = prepareMatch(this, e),
      n = new NodeList();
    let {
      [NEXT]: s, [END]: r
    } = this;
    for (; s !== r;)
      1 === s.nodeType && t(s) && n.push(s),
      (s = 1 === s.nodeType && "template" === s.localName ? s[END] : s[NEXT]);
    return n;
  }
  appendChild(e) {
    return this.insertBefore(e, this[END]);
  }
  contains(e) {
    let t = e;
    for (; t && t !== this;) t = t.parentNode;
    return t === this;
  }
  insertBefore(e, t = null) {
    if (e === t) return e;
    if (e === this) throw new Error("unable to append a node to itself");
    const n = t || this[END];
    switch (e.nodeType) {
      case 1:
        e.remove(),
          (e.parentNode = this),
          knownBoundaries(n[PREV], e, n),
          moCallback(e, null),
          connectedCallback(e);
        break;
      case 11: {
        let {
          [PRIVATE]: t, firstChild: s, lastChild: r
        } = e;
        if (s) {
          knownSegment(n[PREV], s, r, n),
            knownAdjacent(e, e[END]),
            t && t.replaceChildren();
          do {
            (s.parentNode = this),
            moCallback(s, null),
              1 === s.nodeType && connectedCallback(s);
          } while (s !== r && (s = nextSibling(s)));
        }
        break;
      }
      case 3:
      case 8:
      case 4:
        e.remove();
      default:
        (e.parentNode = this),
        knownSiblings(n[PREV], e, n),
          moCallback(e, null);
    }
    return e;
  }
  normalize() {
    let {
      [NEXT]: e, [END]: t
    } = this;
    for (; e !== t;) {
      const {
        [NEXT]: t, [PREV]: n, nodeType: s
      } = e;
      3 === s &&
        (e[VALUE] ?
          n &&
          3 === n.nodeType &&
          ((n.textContent += e.textContent), e.remove()) :
          e.remove()),
        (e = t);
    }
  }
  removeChild(e) {
    if (e.parentNode !== this) throw new Error("node is not a child");
    return e.remove(), e;
  }
  replaceChild(e, t) {
    const n = getEnd(t)[NEXT];
    return t.remove(), this.insertBefore(e, n), t;
  }
}
class NonElementParentNode extends ParentNode {
  getElementById(e) {
    let {
      [NEXT]: t, [END]: n
    } = this;
    for (; t !== n;) {
      if (1 === t.nodeType && t.id === e) return t;
      t = t[NEXT];
    }
    return null;
  }
  cloneNode(e) {
    const {
      ownerDocument: t,
      constructor: n
    } = this,
    s = new n(t);
    if (e) {
      const {
        [END]: t
      } = s;
      for (const n of this.childNodes) s.insertBefore(n.cloneNode(e), t);
    }
    return s;
  }
  toString() {
    const {
      childNodes: e,
      localName: t
    } = this;
    return `<${t}>${e.join("")}</${t}>`;
  }
  toJSON() {
    const e = [];
    return nonElementAsJSON(this, e), e;
  }
}
let DocumentFragment$1 = class extends NonElementParentNode {
    constructor(e) {
      super(e, "#document-fragment", 11);
    }
  },
  DocumentType$1 = class e extends Node$1 {
    constructor(e, t, n = "", s = "") {
      super(e, "#document-type", 10),
        (this.name = t),
        (this.publicId = n),
        (this.systemId = s);
    }
    cloneNode() {
      const {
        ownerDocument: t,
        name: n,
        publicId: s,
        systemId: r
      } = this;
      return new e(t, n, s, r);
    }
    toString() {
      const {
        name: e,
        publicId: t,
        systemId: n
      } = this,
      s = 0 < t.length,
        r = [e];
      return (
        s && r.push("PUBLIC", `"${t}"`),
        n.length && (s || r.push("SYSTEM"), r.push(`"${n}"`)),
        `<!DOCTYPE ${r.join(" ")}>`
      );
    }
    toJSON() {
      const e = [];
      return documentTypeAsJSON(this, e), e;
    }
  };
const getInnerHtml = (e) => e.childNodes.join(""),
  setInnerHtml = (e, t) => {
    const {
      ownerDocument: n
    } = e, {
      constructor: s
    } = n,
    r = new s();
    r[CUSTOM_ELEMENTS] = n[CUSTOM_ELEMENTS];
    const {
      childNodes: i
    } = parseFromString(r, ignoreCase(e), t);
    e.replaceChildren(...i.map(setOwnerDocument, n));
  };

function setOwnerDocument(e) {
  switch (((e.ownerDocument = this), e.nodeType)) {
    case 1:
    case 11:
      e.childNodes.forEach(setOwnerDocument, this);
  }
  return e;
}
var uhyphen = (e) =>
  e
  .replace(/(([A-Z0-9])([A-Z0-9][a-z]))|(([a-z0-9]+)([A-Z]))/g, "$2$5-$3$6")
  .toLowerCase();
const refs$1 = new WeakMap(),
  key = (e) => `data-${uhyphen(e)}`,
  prop = (e) => e.slice(5).replace(/-([a-z])/g, (e, t) => t.toUpperCase()),
  handler$2 = {
    get(e, t) {
      if (t in e) return refs$1.get(e).getAttribute(key(t));
    },
    set: (e, t, n) => ((e[t] = n), refs$1.get(e).setAttribute(key(t), n), !0),
    deleteProperty: (e, t) => (
      t in e && refs$1.get(e).removeAttribute(key(t)), delete e[t]
    )
  };
class DOMStringMap {
  constructor(e) {
    for (const {
        name: t,
        value: n
      }
      of e.attributes)
      /^data-/.test(t) && (this[prop(t)] = n);
    return refs$1.set(this, e), new Proxy(this, handler$2);
  }
}
setPrototypeOf(DOMStringMap.prototype, null);
const {
  add: add
} = Set.prototype,
  addTokens = (e, t) => {
    for (const n of t) n && add.call(e, n);
  },
  update = ({
    [OWNER_ELEMENT]: e,
    value: t
  }) => {
    const n = e.getAttributeNode("class");
    n
      ?
      (n.value = t) :
      setAttribute(e, new Attr$1(e.ownerDocument, "class", t));
  };
class DOMTokenList extends Set {
  constructor(e) {
    super(), (this[OWNER_ELEMENT] = e);
    const t = e.getAttributeNode("class");
    t && addTokens(this, t.value.split(/\s+/));
  }
  get length() {
    return this.size;
  }
  get value() {
    return [...this].join(" ");
  }
  add(...e) {
    addTokens(this, e), update(this);
  }
  contains(e) {
    return this.has(e);
  }
  remove(...e) {
    for (const t of e) this.delete(t);
    update(this);
  }
  toggle(e, t) {
    if (this.has(e)) {
      if (t) return !0;
      this.delete(e), update(this);
    } else if (t || 1 === arguments.length)
      return super.add(e), update(this), !0;
    return !1;
  }
  replace(e, t) {
    return !!this.has(e) && (this.delete(e), super.add(t), update(this), !0);
  }
  supports() {
    return !0;
  }
}
const refs = new WeakMap(),
  getKeys = (e) => [...e.keys()].filter((e) => e !== PRIVATE),
  updateKeys = (e) => {
    const t = refs.get(e).getAttributeNode("style");
    if ((!t || t[CHANGED] || e.get(PRIVATE) !== t) && (e.clear(), t)) {
      e.set(PRIVATE, t);
      for (const n of t[VALUE].split(/\s*;\s*/)) {
        let [t, ...s] = n.split(":");
        if (s.length > 0) {
          t = t.trim();
          const n = s.join(":").trim();
          t && n && e.set(t, n);
        }
      }
    }
    return t;
  },
  handler$1 = {
    get: (e, t) =>
      t in prototype ?
      e[t] :
      (updateKeys(e),
        "length" === t ?
        getKeys(e).length :
        /^\d+$/.test(t) ?
        getKeys(e)[t] :
        e.get(uhyphen(t)) ?? ""),
    set(e, t, n) {
      if ("cssText" === t) e[t] = n;
      else {
        let s = updateKeys(e);
        if ((null == n ? e.delete(uhyphen(t)) : e.set(uhyphen(t), n), !s)) {
          const t = refs.get(e);
          (s = t.ownerDocument.createAttribute("style")),
          t.setAttributeNode(s),
            e.set(PRIVATE, s);
        }
        (s[CHANGED] = !1), (s[VALUE] = e.toString());
      }
      return !0;
    }
  };
let CSSStyleDeclaration$1 = class extends Map {
  constructor(e) {
    return super(), refs.set(this, e), new Proxy(this, handler$1);
  }
  get cssText() {
    return this.toString();
  }
  set cssText(e) {
    refs.get(this).setAttribute("style", e);
  }
  getPropertyValue(e) {
    const t = this[PRIVATE];
    return handler$1.get(t, e);
  }
  setProperty(e, t) {
    const n = this[PRIVATE];
    handler$1.set(n, e, t);
  }
  removeProperty(e) {
      const t = this[PRIVATE];
      handler$1.set(t, e, null);
    }
    [Symbol.iterator]() {
      const e = this[PRIVATE];
      updateKeys(e);
      const t = getKeys(e),
        {
          length: n
        } = t;
      let s = 0;
      return {
        next() {
          const e = s === n;
          return {
            done: e,
            value: e ? null : t[s++]
          };
        }
      };
    }
  get[PRIVATE]() {
    return this;
  }
  toString() {
    const e = this[PRIVATE];
    updateKeys(e);
    const t = [];
    return e.forEach(push, t), t.join(";");
  }
};
const {
  prototype: prototype
} = CSSStyleDeclaration$1;

function push(e, t) {
  t !== PRIVATE && this.push(`${t}:${e}`);
}
const BUBBLING_PHASE = 3,
  AT_TARGET = 2,
  CAPTURING_PHASE = 1,
  NONE = 0;

function getCurrentTarget(e) {
  return e.currentTarget;
}
class GlobalEvent {
  static get BUBBLING_PHASE() {
    return 3;
  }
  static get AT_TARGET() {
    return 2;
  }
  static get CAPTURING_PHASE() {
    return 1;
  }
  static get NONE() {
    return 0;
  }
  constructor(e, t = {}) {
    (this.type = e),
    (this.bubbles = !!t.bubbles),
    (this.cancelBubble = !1),
    (this._stopImmediatePropagationFlag = !1),
    (this.cancelable = !!t.cancelable),
    (this.eventPhase = this.NONE),
    (this.timeStamp = Date.now()),
    (this.defaultPrevented = !1),
    (this.originalTarget = null),
    (this.returnValue = null),
    (this.srcElement = null),
    (this.target = null),
    (this._path = []);
  }
  get BUBBLING_PHASE() {
    return 3;
  }
  get AT_TARGET() {
    return 2;
  }
  get CAPTURING_PHASE() {
    return 1;
  }
  get NONE() {
    return 0;
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
  composedPath() {
    return this._path.map(getCurrentTarget);
  }
  stopPropagation() {
    this.cancelBubble = !0;
  }
  stopImmediatePropagation() {
    this.stopPropagation(), (this._stopImmediatePropagationFlag = !0);
  }
}
exports.Event = GlobalEvent;
class NamedNodeMap extends Array {
  constructor(e) {
    super(), (this.ownerElement = e);
  }
  getNamedItem(e) {
    return this.ownerElement.getAttributeNode(e);
  }
  setNamedItem(e) {
    this.ownerElement.setAttributeNode(e), this.unshift(e);
  }
  removeNamedItem(e) {
    const t = this.getNamedItem(e);
    this.ownerElement.removeAttribute(e), this.splice(this.indexOf(t), 1);
  }
  item(e) {
    return e < this.length ? this[e] : null;
  }
  getNamedItemNS(e, t) {
    return this.getNamedItem(t);
  }
  setNamedItemNS(e, t) {
    return this.setNamedItem(t);
  }
  removeNamedItemNS(e, t) {
    return this.removeNamedItem(t);
  }
}
let ShadowRoot$1 = class extends NonElementParentNode {
  constructor(e) {
    super(e.ownerDocument, "#shadow-root", 11), (this.host = e);
  }
  get innerHTML() {
    return getInnerHtml(this);
  }
  set innerHTML(e) {
    setInnerHtml(this, e);
  }
};
const attributesHandler = {
    get: (e, t) => (t in e ? e[t] : e.find(({
      name: e
    }) => e === t))
  },
  create = (e, t, n) => {
    if ("ownerSVGElement" in t) {
      const s = e.createElementNS(SVG_NAMESPACE, n);
      return (s.ownerSVGElement = t.ownerSVGElement), s;
    }
    return e.createElement(n);
  },
  isVoid = ({
    localName: e,
    ownerDocument: t
  }) => t[MIME].voidElements.test(e);
let Element$1 = class extends ParentNode {
  constructor(e, t) {
    super(e, t, 1),
      (this[CLASS_LIST] = null),
      (this[DATASET] = null),
      (this[STYLE] = null);
  }
  get isConnected() {
    return isConnected(this);
  }
  get parentElement() {
    return parentElement(this);
  }
  get previousSibling() {
    return previousSibling(this);
  }
  get nextSibling() {
    return nextSibling(this);
  }
  get namespaceURI() {
    return "http://www.w3.org/1999/xhtml";
  }
  get previousElementSibling() {
    return previousElementSibling(this);
  }
  get nextElementSibling() {
    return nextElementSibling$1(this);
  }
  before(...e) {
    before(this, e);
  }
  after(...e) {
    after(this, e);
  }
  replaceWith(...e) {
    replaceWith(this, e);
  }
  remove() {
    remove(this[PREV], this, this[END][NEXT]);
  }
  get id() {
    return stringAttribute.get(this, "id");
  }
  set id(e) {
    stringAttribute.set(this, "id", e);
  }
  get className() {
    return this.classList.value;
  }
  set className(e) {
    const {
      classList: t
    } = this;
    t.clear(), t.add(...$String(e).split(/\s+/));
  }
  get nodeName() {
    return localCase(this);
  }
  get tagName() {
    return localCase(this);
  }
  get classList() {
    return this[CLASS_LIST] || (this[CLASS_LIST] = new DOMTokenList(this));
  }
  get dataset() {
    return this[DATASET] || (this[DATASET] = new DOMStringMap(this));
  }
  getBoundingClientRect() {
    return {
      x: 0,
      y: 0,
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0
    };
  }
  get nonce() {
    return stringAttribute.get(this, "nonce");
  }
  set nonce(e) {
    stringAttribute.set(this, "nonce", e);
  }
  get style() {
    return this[STYLE] || (this[STYLE] = new CSSStyleDeclaration$1(this));
  }
  get tabIndex() {
    return numericAttribute.get(this, "tabindex") || -1;
  }
  set tabIndex(e) {
    numericAttribute.set(this, "tabindex", e);
  }
  get slot() {
    return stringAttribute.get(this, "slot");
  }
  set slot(e) {
    stringAttribute.set(this, "slot", e);
  }
  get innerText() {
    const e = [];
    let {
      [NEXT]: t, [END]: n
    } = this;
    for (; t !== n;)
      3 === t.nodeType ?
      e.push(t.textContent.replace(/\s+/g, " ")) :
      e.length &&
      t[NEXT] != n &&
      BLOCK_ELEMENTS.has(t.tagName) &&
      e.push("\n"),
      (t = t[NEXT]);
    return e.join("");
  }
  get textContent() {
    const e = [];
    let {
      [NEXT]: t, [END]: n
    } = this;
    for (; t !== n;) {
      const n = t.nodeType;
      (3 !== n && 4 !== n) || e.push(t.textContent), (t = t[NEXT]);
    }
    return e.join("");
  }
  set textContent(e) {
    this.replaceChildren(),
      null != e &&
      "" !== e &&
      this.appendChild(new Text$1(this.ownerDocument, e));
  }
  get innerHTML() {
    return getInnerHtml(this);
  }
  set innerHTML(e) {
    setInnerHtml(this, e);
  }
  get outerHTML() {
    return this.toString();
  }
  set outerHTML(e) {
    const t = this.ownerDocument.createElement("");
    (t.innerHTML = e), this.replaceWith(...t.childNodes);
  }
  get attributes() {
    const e = new NamedNodeMap(this);
    let t = this[NEXT];
    for (; 2 === t.nodeType;) e.push(t), (t = t[NEXT]);
    return new Proxy(e, attributesHandler);
  }
  focus() {
    this.dispatchEvent(new GlobalEvent("focus"));
  }
  getAttribute(e) {
    if ("class" === e) return this.className;
    const t = this.getAttributeNode(e);
    return t && (ignoreCase(this) ? t.value : escape(t.value));
  }
  getAttributeNode(e) {
    let t = this[NEXT];
    for (; 2 === t.nodeType;) {
      if (t.name === e) return t;
      t = t[NEXT];
    }
    return null;
  }
  getAttributeNames() {
    const e = new NodeList();
    let t = this[NEXT];
    for (; 2 === t.nodeType;) e.push(t.name), (t = t[NEXT]);
    return e;
  }
  hasAttribute(e) {
    return !!this.getAttributeNode(e);
  }
  hasAttributes() {
    return 2 === this[NEXT].nodeType;
  }
  removeAttribute(e) {
    "class" === e && this[CLASS_LIST] && this[CLASS_LIST].clear();
    let t = this[NEXT];
    for (; 2 === t.nodeType;) {
      if (t.name === e) return void removeAttribute(this, t);
      t = t[NEXT];
    }
  }
  removeAttributeNode(e) {
    let t = this[NEXT];
    for (; 2 === t.nodeType;) {
      if (t === e) return void removeAttribute(this, t);
      t = t[NEXT];
    }
  }
  setAttribute(e, t) {
    if ("class" === e) this.className = t;
    else {
      const n = this.getAttributeNode(e);
      n
        ?
        (n.value = t) :
        setAttribute(this, new Attr$1(this.ownerDocument, e, t));
    }
  }
  setAttributeNode(e) {
    const {
      name: t
    } = e,
    n = this.getAttributeNode(t);
    if (n !== e) {
      n && this.removeAttributeNode(n);
      const {
        ownerElement: t
      } = e;
      t && t.removeAttributeNode(e), setAttribute(this, e);
    }
    return n;
  }
  toggleAttribute(e, t) {
    return this.hasAttribute(e) ?
      !!t || (this.removeAttribute(e), !1) :
      !(!t && 1 !== arguments.length) && (this.setAttribute(e, ""), !0);
  }
  get shadowRoot() {
    if (shadowRoots.has(this)) {
      const {
        mode: e,
        shadowRoot: t
      } = shadowRoots.get(this);
      if ("open" === e) return t;
    }
    return null;
  }
  attachShadow(e) {
    if (shadowRoots.has(this)) throw new Error("operation not supported");
    const t = new ShadowRoot$1(this);
    return (
      shadowRoots.set(this, {
        mode: e.mode,
        shadowRoot: t
      }),
      t
    );
  }
  matches(e) {
    return matches(this, e);
  }
  closest(e) {
    let t = this;
    const n = prepareMatch(t, e);
    for (; t && !n(t);) t = t.parentElement;
    return t;
  }
  insertAdjacentElement(e, t) {
    const {
      parentElement: n
    } = this;
    switch (e) {
      case "beforebegin":
        if (n) {
          n.insertBefore(t, this);
          break;
        }
        return null;
      case "afterbegin":
        this.insertBefore(t, this.firstChild);
        break;
      case "beforeend":
        this.insertBefore(t, null);
        break;
      case "afterend":
        if (n) {
          n.insertBefore(t, this.nextSibling);
          break;
        }
        return null;
    }
    return t;
  }
  insertAdjacentHTML(e, t) {
    this.insertAdjacentElement(e, htmlToFragment(this.ownerDocument, t));
  }
  insertAdjacentText(e, t) {
    const n = this.ownerDocument.createTextNode(t);
    this.insertAdjacentElement(e, n);
  }
  cloneNode(e = !1) {
    const {
      ownerDocument: t,
      localName: n
    } = this,
    s = (e) => {
        (e.parentNode = i), knownAdjacent(o, e), (o = e);
      },
      r = create(t, this, n);
    let i = r,
      o = r,
      {
        [NEXT]: A,
        [END]: a
      } = this;
    for (; A !== a && (e || 2 === A.nodeType);) {
      switch (A.nodeType) {
        case -1:
          knownAdjacent(o, i[END]), (o = i[END]), (i = i.parentNode);
          break;
        case 1: {
          const e = create(t, A, A.localName);
          s(e), (i = e);
          break;
        }
        case 2: {
          const t = A.cloneNode(e);
          (t.ownerElement = i), s(t);
          break;
        }
        case 3:
        case 8:
        case 4:
          s(A.cloneNode(e));
      }
      A = A[NEXT];
    }
    return knownAdjacent(o, r[END]), r;
  }
  toString() {
    const e = [],
      {
        [END]: t
      } = this;
    let n = {
        [NEXT]: this
      },
      s = !1;
    do {
      switch (((n = n[NEXT]), n.nodeType)) {
        case 2: {
          const t = " " + n;
          switch (t) {
            case " id":
            case " class":
            case " style":
              break;
            default:
              e.push(t);
          }
          break;
        }
        case -1: {
          const t = n[START];
          s
            ?
            ("ownerSVGElement" in t ?
              e.push(" />") :
              isVoid(t) ?
              e.push(ignoreCase(t) ? ">" : " />") :
              e.push(`></${t.localName}>`),
              (s = !1)) :
            e.push(`</${t.localName}>`);
          break;
        }
        case 1:
          s && e.push(">"),
            n.toString !== this.toString ?
            (e.push(n.toString()), (n = n[END]), (s = !1)) :
            (e.push(`<${n.localName}`), (s = !0));
          break;
        case 3:
        case 8:
        case 4:
          e.push((s ? ">" : "") + n), (s = !1);
      }
    } while (n !== t);
    return e.join("");
  }
  toJSON() {
    const e = [];
    return elementAsJSON(this, e), e;
  }
  getAttributeNS(e, t) {
    return this.getAttribute(t);
  }
  getElementsByTagNameNS(e, t) {
    return this.getElementsByTagName(t);
  }
  hasAttributeNS(e, t) {
    return this.hasAttribute(t);
  }
  removeAttributeNS(e, t) {
    this.removeAttribute(t);
  }
  setAttributeNS(e, t, n) {
    this.setAttribute(t, n);
  }
  setAttributeNodeNS(e) {
    return this.setAttributeNode(e);
  }
};
const classNames = new WeakMap(),
  handler = {
    get: (e, t) => e[t],
    set: (e, t, n) => ((e[t] = n), !0)
  };
let SVGElement$1 = class extends Element$1 {
  constructor(e, t, n = null) {
    super(e, t), (this.ownerSVGElement = n);
  }
  get className() {
    return (
      classNames.has(this) ||
      classNames.set(
        this,
        new Proxy({
            baseVal: "",
            animVal: ""
          },
          handler
        )
      ),
      classNames.get(this)
    );
  }
  set className(e) {
    const {
      classList: t
    } = this;
    t.clear(), t.add(...$String(e).split(/\s+/));
  }
  get namespaceURI() {
    return "http://www.w3.org/2000/svg";
  }
  getAttribute(e) {
    return "class" === e ?
      [...this.classList].join(" ") :
      super.getAttribute(e);
  }
  setAttribute(e, t) {
    if ("class" === e) this.className = t;
    else if ("style" === e) {
      const {
        className: e
      } = this;
      e.baseVal = e.animVal = t;
    }
    super.setAttribute(e, t);
  }
};
const illegalConstructor = () => {
  throw new TypeError("Illegal constructor");
};
exports.illegalConstructor = illegalConstructor;

function Attr() {
  illegalConstructor();
}

function CDATASection() {
  illegalConstructor();
}

function CharacterData() {
  illegalConstructor();
}

function Comment() {
  illegalConstructor();
}

function DocumentFragment() {
  illegalConstructor();
}

function DocumentType() {
  illegalConstructor();
}

function Element() {
  illegalConstructor();
}

function Node() {
  illegalConstructor();
}

function ShadowRoot() {
  illegalConstructor();
}

function Text() {
  illegalConstructor();
}

function SVGElement() {
  illegalConstructor();
}
setPrototypeOf(Attr, Attr$1),
  (Attr.prototype = Attr$1.prototype),
  setPrototypeOf(CDATASection, CDATASection$1),
  (CDATASection.prototype = CDATASection$1.prototype),
  setPrototypeOf(CharacterData, CharacterData$1),
  (CharacterData.prototype = CharacterData$1.prototype),
  setPrototypeOf(Comment, Comment$2),
  (Comment.prototype = Comment$2.prototype),
  setPrototypeOf(DocumentFragment, DocumentFragment$1),
  (DocumentFragment.prototype = DocumentFragment$1.prototype),
  setPrototypeOf(DocumentType, DocumentType$1),
  (DocumentType.prototype = DocumentType$1.prototype),
  setPrototypeOf(Element, Element$1),
  (Element.prototype = Element$1.prototype),
  setPrototypeOf(Node, Node$1),
  (Node.prototype = Node$1.prototype),
  setPrototypeOf(ShadowRoot, ShadowRoot$1),
  (ShadowRoot.prototype = ShadowRoot$1.prototype),
  setPrototypeOf(Text, Text$1),
  (Text.prototype = Text$1.prototype),
  setPrototypeOf(SVGElement, SVGElement$1),
  (SVGElement.prototype = SVGElement$1.prototype);
const Facades = (exports.Facades = {
    Attr: Attr,
    CDATASection: CDATASection,
    CharacterData: CharacterData,
    Comment: Comment,
    DocumentFragment: DocumentFragment,
    DocumentType: DocumentType,
    Element: Element,
    Node: Node,
    ShadowRoot: ShadowRoot,
    Text: Text,
    SVGElement: SVGElement
  }),
  Level0 = new WeakMap(),
  level0 = {
    get: (e, t) => (Level0.has(e) && Level0.get(e)[t]) || null,
    set(e, t, n) {
      Level0.has(e) || Level0.set(e, {});
      const s = Level0.get(e),
        r = t.slice(2);
      s[t] && e.removeEventListener(r, s[t], !1),
        (s[t] = n) && e.addEventListener(r, n, !1);
    }
  };
class HTMLElement extends Element$1 {
  static get observedAttributes() {
    return [];
  }
  constructor(e = null, t = "") {
    super(e, t);
    const n = !e;
    let s;
    if (n) {
      const {
        constructor: n
      } = this;
      if (!Classes.has(n))
        throw new Error("unable to initialize this Custom Element");
      ({
        ownerDocument: e,
        localName: t,
        options: s
      } = Classes.get(n));
    }
    if (e[UPGRADE]) {
      const {
        element: t,
        values: n
      } = e[UPGRADE];
      e[UPGRADE] = null;
      for (const [e, s] of n) t[e] = s;
      return t;
    }
    n &&
      ((this.ownerDocument = this[END].ownerDocument = e),
        (this.localName = t),
        customElements.set(this, {
          connected: !1
        }),
        s.is && this.setAttribute("is", s.is));
  }
  blur() {
    this.dispatchEvent(new GlobalEvent("blur"));
  }
  click() {
    const e = new GlobalEvent("click", {
      bubbles: !0,
      cancelable: !0
    });
    (e.button = 0), this.dispatchEvent(e);
  }
  get accessKeyLabel() {
    const {
      accessKey: e
    } = this;
    return e && `Alt+Shift+${e}`;
  }
  get isContentEditable() {
    return this.hasAttribute("contenteditable");
  }
  get contentEditable() {
    return booleanAttribute.get(this, "contenteditable");
  }
  set contentEditable(e) {
    booleanAttribute.set(this, "contenteditable", e);
  }
  get draggable() {
    return booleanAttribute.get(this, "draggable");
  }
  set draggable(e) {
    booleanAttribute.set(this, "draggable", e);
  }
  get hidden() {
    return booleanAttribute.get(this, "hidden");
  }
  set hidden(e) {
    booleanAttribute.set(this, "hidden", e);
  }
  get spellcheck() {
    return booleanAttribute.get(this, "spellcheck");
  }
  set spellcheck(e) {
    booleanAttribute.set(this, "spellcheck", e);
  }
  get accessKey() {
    return stringAttribute.get(this, "accesskey");
  }
  set accessKey(e) {
    stringAttribute.set(this, "accesskey", e);
  }
  get dir() {
    return stringAttribute.get(this, "dir");
  }
  set dir(e) {
    stringAttribute.set(this, "dir", e);
  }
  get lang() {
    return stringAttribute.get(this, "lang");
  }
  set lang(e) {
    stringAttribute.set(this, "lang", e);
  }
  get title() {
    return stringAttribute.get(this, "title");
  }
  set title(e) {
    stringAttribute.set(this, "title", e);
  }
  get onabort() {
    return level0.get(this, "onabort");
  }
  set onabort(e) {
    level0.set(this, "onabort", e);
  }
  get onblur() {
    return level0.get(this, "onblur");
  }
  set onblur(e) {
    level0.set(this, "onblur", e);
  }
  get oncancel() {
    return level0.get(this, "oncancel");
  }
  set oncancel(e) {
    level0.set(this, "oncancel", e);
  }
  get oncanplay() {
    return level0.get(this, "oncanplay");
  }
  set oncanplay(e) {
    level0.set(this, "oncanplay", e);
  }
  get oncanplaythrough() {
    return level0.get(this, "oncanplaythrough");
  }
  set oncanplaythrough(e) {
    level0.set(this, "oncanplaythrough", e);
  }
  get onchange() {
    return level0.get(this, "onchange");
  }
  set onchange(e) {
    level0.set(this, "onchange", e);
  }
  get onclick() {
    return level0.get(this, "onclick");
  }
  set onclick(e) {
    level0.set(this, "onclick", e);
  }
  get onclose() {
    return level0.get(this, "onclose");
  }
  set onclose(e) {
    level0.set(this, "onclose", e);
  }
  get oncontextmenu() {
    return level0.get(this, "oncontextmenu");
  }
  set oncontextmenu(e) {
    level0.set(this, "oncontextmenu", e);
  }
  get oncuechange() {
    return level0.get(this, "oncuechange");
  }
  set oncuechange(e) {
    level0.set(this, "oncuechange", e);
  }
  get ondblclick() {
    return level0.get(this, "ondblclick");
  }
  set ondblclick(e) {
    level0.set(this, "ondblclick", e);
  }
  get ondrag() {
    return level0.get(this, "ondrag");
  }
  set ondrag(e) {
    level0.set(this, "ondrag", e);
  }
  get ondragend() {
    return level0.get(this, "ondragend");
  }
  set ondragend(e) {
    level0.set(this, "ondragend", e);
  }
  get ondragenter() {
    return level0.get(this, "ondragenter");
  }
  set ondragenter(e) {
    level0.set(this, "ondragenter", e);
  }
  get ondragleave() {
    return level0.get(this, "ondragleave");
  }
  set ondragleave(e) {
    level0.set(this, "ondragleave", e);
  }
  get ondragover() {
    return level0.get(this, "ondragover");
  }
  set ondragover(e) {
    level0.set(this, "ondragover", e);
  }
  get ondragstart() {
    return level0.get(this, "ondragstart");
  }
  set ondragstart(e) {
    level0.set(this, "ondragstart", e);
  }
  get ondrop() {
    return level0.get(this, "ondrop");
  }
  set ondrop(e) {
    level0.set(this, "ondrop", e);
  }
  get ondurationchange() {
    return level0.get(this, "ondurationchange");
  }
  set ondurationchange(e) {
    level0.set(this, "ondurationchange", e);
  }
  get onemptied() {
    return level0.get(this, "onemptied");
  }
  set onemptied(e) {
    level0.set(this, "onemptied", e);
  }
  get onended() {
    return level0.get(this, "onended");
  }
  set onended(e) {
    level0.set(this, "onended", e);
  }
  get onerror() {
    return level0.get(this, "onerror");
  }
  set onerror(e) {
    level0.set(this, "onerror", e);
  }
  get onfocus() {
    return level0.get(this, "onfocus");
  }
  set onfocus(e) {
    level0.set(this, "onfocus", e);
  }
  get oninput() {
    return level0.get(this, "oninput");
  }
  set oninput(e) {
    level0.set(this, "oninput", e);
  }
  get oninvalid() {
    return level0.get(this, "oninvalid");
  }
  set oninvalid(e) {
    level0.set(this, "oninvalid", e);
  }
  get onkeydown() {
    return level0.get(this, "onkeydown");
  }
  set onkeydown(e) {
    level0.set(this, "onkeydown", e);
  }
  get onkeypress() {
    return level0.get(this, "onkeypress");
  }
  set onkeypress(e) {
    level0.set(this, "onkeypress", e);
  }
  get onkeyup() {
    return level0.get(this, "onkeyup");
  }
  set onkeyup(e) {
    level0.set(this, "onkeyup", e);
  }
  get onload() {
    return level0.get(this, "onload");
  }
  set onload(e) {
    level0.set(this, "onload", e);
  }
  get onloadeddata() {
    return level0.get(this, "onloadeddata");
  }
  set onloadeddata(e) {
    level0.set(this, "onloadeddata", e);
  }
  get onloadedmetadata() {
    return level0.get(this, "onloadedmetadata");
  }
  set onloadedmetadata(e) {
    level0.set(this, "onloadedmetadata", e);
  }
  get onloadstart() {
    return level0.get(this, "onloadstart");
  }
  set onloadstart(e) {
    level0.set(this, "onloadstart", e);
  }
  get onmousedown() {
    return level0.get(this, "onmousedown");
  }
  set onmousedown(e) {
    level0.set(this, "onmousedown", e);
  }
  get onmouseenter() {
    return level0.get(this, "onmouseenter");
  }
  set onmouseenter(e) {
    level0.set(this, "onmouseenter", e);
  }
  get onmouseleave() {
    return level0.get(this, "onmouseleave");
  }
  set onmouseleave(e) {
    level0.set(this, "onmouseleave", e);
  }
  get onmousemove() {
    return level0.get(this, "onmousemove");
  }
  set onmousemove(e) {
    level0.set(this, "onmousemove", e);
  }
  get onmouseout() {
    return level0.get(this, "onmouseout");
  }
  set onmouseout(e) {
    level0.set(this, "onmouseout", e);
  }
  get onmouseover() {
    return level0.get(this, "onmouseover");
  }
  set onmouseover(e) {
    level0.set(this, "onmouseover", e);
  }
  get onmouseup() {
    return level0.get(this, "onmouseup");
  }
  set onmouseup(e) {
    level0.set(this, "onmouseup", e);
  }
  get onmousewheel() {
    return level0.get(this, "onmousewheel");
  }
  set onmousewheel(e) {
    level0.set(this, "onmousewheel", e);
  }
  get onpause() {
    return level0.get(this, "onpause");
  }
  set onpause(e) {
    level0.set(this, "onpause", e);
  }
  get onplay() {
    return level0.get(this, "onplay");
  }
  set onplay(e) {
    level0.set(this, "onplay", e);
  }
  get onplaying() {
    return level0.get(this, "onplaying");
  }
  set onplaying(e) {
    level0.set(this, "onplaying", e);
  }
  get onprogress() {
    return level0.get(this, "onprogress");
  }
  set onprogress(e) {
    level0.set(this, "onprogress", e);
  }
  get onratechange() {
    return level0.get(this, "onratechange");
  }
  set onratechange(e) {
    level0.set(this, "onratechange", e);
  }
  get onreset() {
    return level0.get(this, "onreset");
  }
  set onreset(e) {
    level0.set(this, "onreset", e);
  }
  get onresize() {
    return level0.get(this, "onresize");
  }
  set onresize(e) {
    level0.set(this, "onresize", e);
  }
  get onscroll() {
    return level0.get(this, "onscroll");
  }
  set onscroll(e) {
    level0.set(this, "onscroll", e);
  }
  get onseeked() {
    return level0.get(this, "onseeked");
  }
  set onseeked(e) {
    level0.set(this, "onseeked", e);
  }
  get onseeking() {
    return level0.get(this, "onseeking");
  }
  set onseeking(e) {
    level0.set(this, "onseeking", e);
  }
  get onselect() {
    return level0.get(this, "onselect");
  }
  set onselect(e) {
    level0.set(this, "onselect", e);
  }
  get onshow() {
    return level0.get(this, "onshow");
  }
  set onshow(e) {
    level0.set(this, "onshow", e);
  }
  get onstalled() {
    return level0.get(this, "onstalled");
  }
  set onstalled(e) {
    level0.set(this, "onstalled", e);
  }
  get onsubmit() {
    return level0.get(this, "onsubmit");
  }
  set onsubmit(e) {
    level0.set(this, "onsubmit", e);
  }
  get onsuspend() {
    return level0.get(this, "onsuspend");
  }
  set onsuspend(e) {
    level0.set(this, "onsuspend", e);
  }
  get ontimeupdate() {
    return level0.get(this, "ontimeupdate");
  }
  set ontimeupdate(e) {
    level0.set(this, "ontimeupdate", e);
  }
  get ontoggle() {
    return level0.get(this, "ontoggle");
  }
  set ontoggle(e) {
    level0.set(this, "ontoggle", e);
  }
  get onvolumechange() {
    return level0.get(this, "onvolumechange");
  }
  set onvolumechange(e) {
    level0.set(this, "onvolumechange", e);
  }
  get onwaiting() {
    return level0.get(this, "onwaiting");
  }
  set onwaiting(e) {
    level0.set(this, "onwaiting", e);
  }
  get onauxclick() {
    return level0.get(this, "onauxclick");
  }
  set onauxclick(e) {
    level0.set(this, "onauxclick", e);
  }
  get ongotpointercapture() {
    return level0.get(this, "ongotpointercapture");
  }
  set ongotpointercapture(e) {
    level0.set(this, "ongotpointercapture", e);
  }
  get onlostpointercapture() {
    return level0.get(this, "onlostpointercapture");
  }
  set onlostpointercapture(e) {
    level0.set(this, "onlostpointercapture", e);
  }
  get onpointercancel() {
    return level0.get(this, "onpointercancel");
  }
  set onpointercancel(e) {
    level0.set(this, "onpointercancel", e);
  }
  get onpointerdown() {
    return level0.get(this, "onpointerdown");
  }
  set onpointerdown(e) {
    level0.set(this, "onpointerdown", e);
  }
  get onpointerenter() {
    return level0.get(this, "onpointerenter");
  }
  set onpointerenter(e) {
    level0.set(this, "onpointerenter", e);
  }
  get onpointerleave() {
    return level0.get(this, "onpointerleave");
  }
  set onpointerleave(e) {
    level0.set(this, "onpointerleave", e);
  }
  get onpointermove() {
    return level0.get(this, "onpointermove");
  }
  set onpointermove(e) {
    level0.set(this, "onpointermove", e);
  }
  get onpointerout() {
    return level0.get(this, "onpointerout");
  }
  set onpointerout(e) {
    level0.set(this, "onpointerout", e);
  }
  get onpointerover() {
    return level0.get(this, "onpointerover");
  }
  set onpointerover(e) {
    level0.set(this, "onpointerover", e);
  }
  get onpointerup() {
    return level0.get(this, "onpointerup");
  }
  set onpointerup(e) {
    level0.set(this, "onpointerup", e);
  }
}
exports.HTMLElement = HTMLElement;
const tagName$h = "template";
class HTMLTemplateElement extends HTMLElement {
  constructor(e) {
    super(e, tagName$h);
    const t = this.ownerDocument.createDocumentFragment();
    (this[CONTENT] = t)[PRIVATE] = this;
  }
  get content() {
    if (this.hasChildNodes() && !this[CONTENT].hasChildNodes())
      for (const e of this.childNodes)
        this[CONTENT].appendChild(e.cloneNode(!0));
    return this[CONTENT];
  }
}
exports.HTMLTemplateElement = HTMLTemplateElement;
registerHTMLClass(tagName$h, HTMLTemplateElement);
class HTMLHtmlElement extends HTMLElement {
  constructor(e, t = "html") {
    super(e, t);
  }
}
exports.HTMLHtmlElement = HTMLHtmlElement;
const {
  toString: toString
} = HTMLElement.prototype;
class TextElement extends HTMLElement {
  get innerHTML() {
    return this.textContent;
  }
  set innerHTML(e) {
    this.textContent = e;
  }
  toString() {
    return toString
      .call(this.cloneNode())
      .replace("><", () => `>${this.textContent}<`);
  }
}
const tagName$g = "script";
class HTMLScriptElement extends TextElement {
  constructor(e, t = "script") {
    super(e, t);
  }
  get type() {
    return stringAttribute.get(this, "type");
  }
  set type(e) {
    stringAttribute.set(this, "type", e);
  }
  get src() {
    return stringAttribute.get(this, "src");
  }
  set src(e) {
    stringAttribute.set(this, "src", e);
  }
  get defer() {
    return booleanAttribute.get(this, "defer");
  }
  set defer(e) {
    booleanAttribute.set(this, "defer", e);
  }
  get crossOrigin() {
    return stringAttribute.get(this, "crossorigin");
  }
  set crossOrigin(e) {
    stringAttribute.set(this, "crossorigin", e);
  }
  get nomodule() {
    return booleanAttribute.get(this, "nomodule");
  }
  set nomodule(e) {
    booleanAttribute.set(this, "nomodule", e);
  }
  get referrerPolicy() {
    return stringAttribute.get(this, "referrerpolicy");
  }
  set referrerPolicy(e) {
    stringAttribute.set(this, "referrerpolicy", e);
  }
  get nonce() {
    return stringAttribute.get(this, "nonce");
  }
  set nonce(e) {
    stringAttribute.set(this, "nonce", e);
  }
  get async() {
    return booleanAttribute.get(this, "async");
  }
  set async(e) {
    booleanAttribute.set(this, "async", e);
  }
  get text() {
    return this.textContent;
  }
  set text(e) {
    this.textContent = e;
  }
}
exports.HTMLScriptElement = HTMLScriptElement;
registerHTMLClass("script", HTMLScriptElement);
class HTMLFrameElement extends HTMLElement {
  constructor(e, t = "frame") {
    super(e, t);
  }
}
exports.HTMLFrameElement = HTMLFrameElement;
const tagName$f = "iframe";
class HTMLIFrameElement extends HTMLElement {
  constructor(e, t = "iframe") {
    super(e, t);
  }
  get src() {
    return stringAttribute.get(this, "src");
  }
  set src(e) {
    stringAttribute.set(this, "src", e);
  }
  get srcdoc() {
    return stringAttribute.get(this, "srcdoc");
  }
  set srcdoc(e) {
    stringAttribute.set(this, "srcdoc", e);
  }
  get name() {
    return stringAttribute.get(this, "name");
  }
  set name(e) {
    stringAttribute.set(this, "name", e);
  }
  get allow() {
    return stringAttribute.get(this, "allow");
  }
  set allow(e) {
    stringAttribute.set(this, "allow", e);
  }
  get allowFullscreen() {
    return booleanAttribute.get(this, "allowfullscreen");
  }
  set allowFullscreen(e) {
    booleanAttribute.set(this, "allowfullscreen", e);
  }
  get referrerPolicy() {
    return stringAttribute.get(this, "referrerpolicy");
  }
  set referrerPolicy(e) {
    stringAttribute.set(this, "referrerpolicy", e);
  }
  get loading() {
    return stringAttribute.get(this, "loading");
  }
  set loading(e) {
    stringAttribute.set(this, "loading", e);
  }
}
exports.HTMLIFrameElement = HTMLIFrameElement;
registerHTMLClass("iframe", HTMLIFrameElement);
class HTMLObjectElement extends HTMLElement {
  constructor(e, t = "object") {
    super(e, t);
  }
}
exports.HTMLObjectElement = HTMLObjectElement;
class HTMLHeadElement extends HTMLElement {
  constructor(e, t = "head") {
    super(e, t);
  }
}
exports.HTMLHeadElement = HTMLHeadElement;
class HTMLBodyElement extends HTMLElement {
  constructor(e, t = "body") {
    super(e, t);
  }
}
exports.HTMLBodyElement = HTMLBodyElement;
var hasRequiredStyleSheet,
  lib = {},
  CSSStyleDeclaration = {},
  parse$1 = {},
  CSSStyleSheet = {},
  StyleSheet = {};

function requireStyleSheet() {
  if (hasRequiredStyleSheet) return StyleSheet;
  hasRequiredStyleSheet = 1;
  var e = {
    StyleSheet: function() {
      this.parentStyleSheet = null;
    }
  };
  return (StyleSheet.StyleSheet = e.StyleSheet), StyleSheet;
}
var hasRequiredCSSRule,
  hasRequiredCSSStyleRule,
  hasRequiredCSSStyleSheet,
  CSSStyleRule = {},
  CSSRule = {};

function requireCSSRule() {
  if (hasRequiredCSSRule) return CSSRule;
  hasRequiredCSSRule = 1;
  var e = {
    CSSRule: function() {
      (this.parentRule = null), (this.parentStyleSheet = null);
    }
  };
  return (
    (e.CSSRule.UNKNOWN_RULE = 0),
    (e.CSSRule.STYLE_RULE = 1),
    (e.CSSRule.CHARSET_RULE = 2),
    (e.CSSRule.IMPORT_RULE = 3),
    (e.CSSRule.MEDIA_RULE = 4),
    (e.CSSRule.FONT_FACE_RULE = 5),
    (e.CSSRule.PAGE_RULE = 6),
    (e.CSSRule.KEYFRAMES_RULE = 7),
    (e.CSSRule.KEYFRAME_RULE = 8),
    (e.CSSRule.MARGIN_RULE = 9),
    (e.CSSRule.NAMESPACE_RULE = 10),
    (e.CSSRule.COUNTER_STYLE_RULE = 11),
    (e.CSSRule.SUPPORTS_RULE = 12),
    (e.CSSRule.DOCUMENT_RULE = 13),
    (e.CSSRule.FONT_FEATURE_VALUES_RULE = 14),
    (e.CSSRule.VIEWPORT_RULE = 15),
    (e.CSSRule.REGION_STYLE_RULE = 16),
    (e.CSSRule.prototype = {
      constructor: e.CSSRule
    }),
    (CSSRule.CSSRule = e.CSSRule),
    CSSRule
  );
}

function requireCSSStyleRule() {
  if (hasRequiredCSSStyleRule) return CSSStyleRule;
  hasRequiredCSSStyleRule = 1;
  var e = {
    CSSStyleDeclaration: requireCSSStyleDeclaration().CSSStyleDeclaration,
    CSSRule: requireCSSRule().CSSRule,
    CSSStyleRule: function() {
      e.CSSRule.call(this),
        (this.selectorText = ""),
        (this.style = new e.CSSStyleDeclaration()),
        (this.style.parentRule = this);
    }
  };
  return (
    (e.CSSStyleRule.prototype = new e.CSSRule()),
    (e.CSSStyleRule.prototype.constructor = e.CSSStyleRule),
    (e.CSSStyleRule.prototype.type = 1),
    Object.defineProperty(e.CSSStyleRule.prototype, "cssText", {
      get: function() {
        return this.selectorText ?
          this.selectorText + " {" + this.style.cssText + "}" :
          "";
      },
      set: function(t) {
        var n = e.CSSStyleRule.parse(t);
        (this.style = n.style), (this.selectorText = n.selectorText);
      }
    }),
    (e.CSSStyleRule.parse = function(t) {
      for (
        var n,
          s,
          r,
          i = 0,
          o = "selector",
          A = i,
          a = "",
          l = {
            selector: !0,
            value: !0
          },
          c = new e.CSSStyleRule(),
          u = "";
        (r = t.charAt(i)); i++
      )
        switch (r) {
          case " ":
          case "\t":
          case "\r":
          case "\n":
          case "\f":
            if (l[o])
              switch (t.charAt(i - 1)) {
                case " ":
                case "\t":
                case "\r":
                case "\n":
                case "\f":
                  break;
                default:
                  a += " ";
              }
            break;
          case '"':
            if (((A = i + 1), !(n = t.indexOf('"', A) + 1)))
              throw '" is missing';
            (a += t.slice(i, n)), (i = n - 1);
            break;
          case "'":
            if (((A = i + 1), !(n = t.indexOf("'", A) + 1)))
              throw "' is missing";
            (a += t.slice(i, n)), (i = n - 1);
            break;
          case "/":
            if ("*" === t.charAt(i + 1)) {
              if (((i += 2), -1 === (n = t.indexOf("*/", i))))
                throw new SyntaxError("Missing */");
              i = n + 1;
            } else a += r;
            break;
          case "{":
            "selector" === o &&
              ((c.selectorText = a.trim()), (a = ""), (o = "name"));
            break;
          case ":":
            "name" === o ? ((s = a.trim()), (a = ""), (o = "value")) : (a += r);
            break;
          case "!":
            "value" === o && t.indexOf("!important", i) === i ?
              ((u = "important"), (i += 9)) :
              (a += r);
            break;
          case ";":
            "value" === o
              ?
              (c.style.setProperty(s, a.trim(), u),
                (u = ""),
                (a = ""),
                (o = "name")) :
              (a += r);
            break;
          case "}":
            if ("value" === o)
              c.style.setProperty(s, a.trim(), u), (u = ""), (a = "");
            else {
              if ("name" === o) break;
              a += r;
            }
            o = "selector";
            break;
          default:
            a += r;
        }
      return c;
    }),
    (CSSStyleRule.CSSStyleRule = e.CSSStyleRule),
    CSSStyleRule
  );
}

function requireCSSStyleSheet() {
  if (hasRequiredCSSStyleSheet) return CSSStyleSheet;
  hasRequiredCSSStyleSheet = 1;
  var e = {
    StyleSheet: requireStyleSheet().StyleSheet,
    CSSStyleRule: requireCSSStyleRule().CSSStyleRule,
    CSSStyleSheet: function() {
      e.StyleSheet.call(this), (this.cssRules = []);
    }
  };
  return (
    (e.CSSStyleSheet.prototype = new e.StyleSheet()),
    (e.CSSStyleSheet.prototype.constructor = e.CSSStyleSheet),
    (e.CSSStyleSheet.prototype.insertRule = function(t, n) {
      if (n < 0 || n > this.cssRules.length)
        throw new RangeError("INDEX_SIZE_ERR");
      var s = e.parse(t).cssRules[0];
      return (s.parentStyleSheet = this), this.cssRules.splice(n, 0, s), n;
    }),
    (e.CSSStyleSheet.prototype.deleteRule = function(e) {
      if (e < 0 || e >= this.cssRules.length)
        throw new RangeError("INDEX_SIZE_ERR");
      this.cssRules.splice(e, 1);
    }),
    (e.CSSStyleSheet.prototype.toString = function() {
      for (var e = "", t = this.cssRules, n = 0; n < t.length; n++)
        e += t[n].cssText + "\n";
      return e;
    }),
    (CSSStyleSheet.CSSStyleSheet = e.CSSStyleSheet),
    (e.parse = requireParse().parse),
    CSSStyleSheet
  );
}
var hasRequiredMediaList,
  hasRequiredCSSImportRule,
  CSSImportRule = {},
  MediaList = {};

function requireMediaList() {
  if (hasRequiredMediaList) return MediaList;
  hasRequiredMediaList = 1;
  var e = {
    MediaList: function() {
      this.length = 0;
    }
  };
  return (
    (e.MediaList.prototype = {
      constructor: e.MediaList,
      get mediaText() {
        return Array.prototype.join.call(this, ", ");
      },
      set mediaText(e) {
        for (
          var t = e.split(","), n = (this.length = t.length), s = 0; s < n; s++
        )
          this[s] = t[s].trim();
      },
      appendMedium: function(e) {
        -1 === Array.prototype.indexOf.call(this, e) &&
          ((this[this.length] = e), this.length++);
      },
      deleteMedium: function(e) {
        var t = Array.prototype.indexOf.call(this, e); -
        1 !== t && Array.prototype.splice.call(this, t, 1);
      }
    }),
    (MediaList.MediaList = e.MediaList),
    MediaList
  );
}

function requireCSSImportRule() {
  if (hasRequiredCSSImportRule) return CSSImportRule;
  hasRequiredCSSImportRule = 1;
  var e = {
    CSSRule: requireCSSRule().CSSRule,
    CSSStyleSheet: requireCSSStyleSheet().CSSStyleSheet,
    MediaList: requireMediaList().MediaList,
    CSSImportRule: function() {
      e.CSSRule.call(this),
        (this.href = ""),
        (this.media = new e.MediaList()),
        (this.styleSheet = new e.CSSStyleSheet());
    }
  };
  return (
    (e.CSSImportRule.prototype = new e.CSSRule()),
    (e.CSSImportRule.prototype.constructor = e.CSSImportRule),
    (e.CSSImportRule.prototype.type = 3),
    Object.defineProperty(e.CSSImportRule.prototype, "cssText", {
      get: function() {
        var e = this.media.mediaText;
        return "@import url(" + this.href + ")" + (e ? " " + e : "") + ";";
      },
      set: function(e) {
        for (var t, n, s = 0, r = "", i = "";
          (n = e.charAt(s)); s++)
          switch (n) {
            case " ":
            case "\t":
            case "\r":
            case "\n":
            case "\f":
              "after-import" === r ? (r = "url") : (i += n);
              break;
            case "@":
              r ||
                e.indexOf("@import", s) !== s ||
                ((r = "after-import"), (s += 6), (i = ""));
              break;
            case "u":
              if ("url" === r && e.indexOf("url(", s) === s) {
                if (-1 === (t = e.indexOf(")", s + 1)))
                  throw s + ': ")" not found';
                s += 4;
                var o = e.slice(s, t);
                o[0] === o[o.length - 1] &&
                  (('"' !== o[0] && "'" !== o[0]) || (o = o.slice(1, -1))),
                  (this.href = o),
                  (s = t),
                  (r = "media");
              }
              break;
            case '"':
              if ("url" === r) {
                if (!(t = e.indexOf('"', s + 1))) throw s + ": '\"' not found";
                (this.href = e.slice(s + 1, t)), (s = t), (r = "media");
              }
              break;
            case "'":
              if ("url" === r) {
                if (!(t = e.indexOf("'", s + 1))) throw s + ': "\'" not found';
                (this.href = e.slice(s + 1, t)), (s = t), (r = "media");
              }
              break;
            case ";":
              "media" === r && i && (this.media.mediaText = i.trim());
              break;
            default:
              "media" === r && (i += n);
          }
      }
    }),
    (CSSImportRule.CSSImportRule = e.CSSImportRule),
    CSSImportRule
  );
}
var hasRequiredCSSGroupingRule,
  CSSGroupingRule = {};

function requireCSSGroupingRule() {
  if (hasRequiredCSSGroupingRule) return CSSGroupingRule;
  hasRequiredCSSGroupingRule = 1;
  var e = {
    CSSRule: requireCSSRule().CSSRule,
    CSSGroupingRule: function() {
      e.CSSRule.call(this), (this.cssRules = []);
    }
  };
  return (
    (e.CSSGroupingRule.prototype = new e.CSSRule()),
    (e.CSSGroupingRule.prototype.constructor = e.CSSGroupingRule),
    (e.CSSGroupingRule.prototype.insertRule = function(t, n) {
      if (n < 0 || n > this.cssRules.length)
        throw new RangeError("INDEX_SIZE_ERR");
      var s = e.parse(t).cssRules[0];
      return (s.parentRule = this), this.cssRules.splice(n, 0, s), n;
    }),
    (e.CSSGroupingRule.prototype.deleteRule = function(e) {
      if (e < 0 || e >= this.cssRules.length)
        throw new RangeError("INDEX_SIZE_ERR");
      this.cssRules.splice(e, 1)[0].parentRule = null;
    }),
    (CSSGroupingRule.CSSGroupingRule = e.CSSGroupingRule),
    CSSGroupingRule
  );
}
var hasRequiredCSSConditionRule,
  hasRequiredCSSMediaRule,
  CSSMediaRule = {},
  CSSConditionRule = {};

function requireCSSConditionRule() {
  if (hasRequiredCSSConditionRule) return CSSConditionRule;
  hasRequiredCSSConditionRule = 1;
  var e = {
    CSSRule: requireCSSRule().CSSRule,
    CSSGroupingRule: requireCSSGroupingRule().CSSGroupingRule,
    CSSConditionRule: function() {
      e.CSSGroupingRule.call(this), (this.cssRules = []);
    }
  };
  return (
    (e.CSSConditionRule.prototype = new e.CSSGroupingRule()),
    (e.CSSConditionRule.prototype.constructor = e.CSSConditionRule),
    (e.CSSConditionRule.prototype.conditionText = ""),
    (e.CSSConditionRule.prototype.cssText = ""),
    (CSSConditionRule.CSSConditionRule = e.CSSConditionRule),
    CSSConditionRule
  );
}

function requireCSSMediaRule() {
  if (hasRequiredCSSMediaRule) return CSSMediaRule;
  hasRequiredCSSMediaRule = 1;
  var e = {
    CSSRule: requireCSSRule().CSSRule,
    CSSGroupingRule: requireCSSGroupingRule().CSSGroupingRule,
    CSSConditionRule: requireCSSConditionRule().CSSConditionRule,
    MediaList: requireMediaList().MediaList,
    CSSMediaRule: function() {
      e.CSSConditionRule.call(this), (this.media = new e.MediaList());
    }
  };
  return (
    (e.CSSMediaRule.prototype = new e.CSSConditionRule()),
    (e.CSSMediaRule.prototype.constructor = e.CSSMediaRule),
    (e.CSSMediaRule.prototype.type = 4),
    Object.defineProperties(e.CSSMediaRule.prototype, {
      conditionText: {
        get: function() {
          return this.media.mediaText;
        },
        set: function(e) {
          this.media.mediaText = e;
        },
        configurable: !0,
        enumerable: !0
      },
      cssText: {
        get: function() {
          for (var e = [], t = 0, n = this.cssRules.length; t < n; t++)
            e.push(this.cssRules[t].cssText);
          return "@media " + this.media.mediaText + " {" + e.join("") + "}";
        },
        configurable: !0,
        enumerable: !0
      }
    }),
    (CSSMediaRule.CSSMediaRule = e.CSSMediaRule),
    CSSMediaRule
  );
}
var hasRequiredCSSSupportsRule,
  CSSSupportsRule = {};

function requireCSSSupportsRule() {
  if (hasRequiredCSSSupportsRule) return CSSSupportsRule;
  hasRequiredCSSSupportsRule = 1;
  var e = {
    CSSRule: requireCSSRule().CSSRule,
    CSSGroupingRule: requireCSSGroupingRule().CSSGroupingRule,
    CSSConditionRule: requireCSSConditionRule().CSSConditionRule,
    CSSSupportsRule: function() {
      e.CSSConditionRule.call(this);
    }
  };
  return (
    (e.CSSSupportsRule.prototype = new e.CSSConditionRule()),
    (e.CSSSupportsRule.prototype.constructor = e.CSSSupportsRule),
    (e.CSSSupportsRule.prototype.type = 12),
    Object.defineProperty(e.CSSSupportsRule.prototype, "cssText", {
      get: function() {
        for (var e = [], t = 0, n = this.cssRules.length; t < n; t++)
          e.push(this.cssRules[t].cssText);
        return "@supports " + this.conditionText + " {" + e.join("") + "}";
      }
    }),
    (CSSSupportsRule.CSSSupportsRule = e.CSSSupportsRule),
    CSSSupportsRule
  );
}
var hasRequiredCSSFontFaceRule,
  CSSFontFaceRule = {};

function requireCSSFontFaceRule() {
  if (hasRequiredCSSFontFaceRule) return CSSFontFaceRule;
  hasRequiredCSSFontFaceRule = 1;
  var e = {
    CSSStyleDeclaration: requireCSSStyleDeclaration().CSSStyleDeclaration,
    CSSRule: requireCSSRule().CSSRule,
    CSSFontFaceRule: function() {
      e.CSSRule.call(this),
        (this.style = new e.CSSStyleDeclaration()),
        (this.style.parentRule = this);
    }
  };
  return (
    (e.CSSFontFaceRule.prototype = new e.CSSRule()),
    (e.CSSFontFaceRule.prototype.constructor = e.CSSFontFaceRule),
    (e.CSSFontFaceRule.prototype.type = 5),
    Object.defineProperty(e.CSSFontFaceRule.prototype, "cssText", {
      get: function() {
        return "@font-face {" + this.style.cssText + "}";
      }
    }),
    (CSSFontFaceRule.CSSFontFaceRule = e.CSSFontFaceRule),
    CSSFontFaceRule
  );
}
var hasRequiredCSSHostRule,
  CSSHostRule = {};

function requireCSSHostRule() {
  if (hasRequiredCSSHostRule) return CSSHostRule;
  hasRequiredCSSHostRule = 1;
  var e = {
    CSSRule: requireCSSRule().CSSRule,
    CSSHostRule: function() {
      e.CSSRule.call(this), (this.cssRules = []);
    }
  };
  return (
    (e.CSSHostRule.prototype = new e.CSSRule()),
    (e.CSSHostRule.prototype.constructor = e.CSSHostRule),
    (e.CSSHostRule.prototype.type = 1001),
    Object.defineProperty(e.CSSHostRule.prototype, "cssText", {
      get: function() {
        for (var e = [], t = 0, n = this.cssRules.length; t < n; t++)
          e.push(this.cssRules[t].cssText);
        return "@host {" + e.join("") + "}";
      }
    }),
    (CSSHostRule.CSSHostRule = e.CSSHostRule),
    CSSHostRule
  );
}
var hasRequiredCSSKeyframeRule,
  CSSKeyframeRule = {};

function requireCSSKeyframeRule() {
  if (hasRequiredCSSKeyframeRule) return CSSKeyframeRule;
  hasRequiredCSSKeyframeRule = 1;
  var e = {
    CSSRule: requireCSSRule().CSSRule,
    CSSStyleDeclaration: requireCSSStyleDeclaration().CSSStyleDeclaration,
    CSSKeyframeRule: function() {
      e.CSSRule.call(this),
        (this.keyText = ""),
        (this.style = new e.CSSStyleDeclaration()),
        (this.style.parentRule = this);
    }
  };
  return (
    (e.CSSKeyframeRule.prototype = new e.CSSRule()),
    (e.CSSKeyframeRule.prototype.constructor = e.CSSKeyframeRule),
    (e.CSSKeyframeRule.prototype.type = 8),
    Object.defineProperty(e.CSSKeyframeRule.prototype, "cssText", {
      get: function() {
        return this.keyText + " {" + this.style.cssText + "} ";
      }
    }),
    (CSSKeyframeRule.CSSKeyframeRule = e.CSSKeyframeRule),
    CSSKeyframeRule
  );
}
var hasRequiredCSSKeyframesRule,
  CSSKeyframesRule = {};

function requireCSSKeyframesRule() {
  if (hasRequiredCSSKeyframesRule) return CSSKeyframesRule;
  hasRequiredCSSKeyframesRule = 1;
  var e = {
    CSSRule: requireCSSRule().CSSRule,
    CSSKeyframesRule: function() {
      e.CSSRule.call(this), (this.name = ""), (this.cssRules = []);
    }
  };
  return (
    (e.CSSKeyframesRule.prototype = new e.CSSRule()),
    (e.CSSKeyframesRule.prototype.constructor = e.CSSKeyframesRule),
    (e.CSSKeyframesRule.prototype.type = 7),
    Object.defineProperty(e.CSSKeyframesRule.prototype, "cssText", {
      get: function() {
        for (var e = [], t = 0, n = this.cssRules.length; t < n; t++)
          e.push("  " + this.cssRules[t].cssText);
        return (
          "@" +
          (this._vendorPrefix || "") +
          "keyframes " +
          this.name +
          " { \n" +
          e.join("\n") +
          "\n}"
        );
      }
    }),
    (CSSKeyframesRule.CSSKeyframesRule = e.CSSKeyframesRule),
    CSSKeyframesRule
  );
}
var hasRequiredCSSValue,
  hasRequiredCSSValueExpression,
  CSSValueExpression = {},
  CSSValue = {};

function requireCSSValue() {
  if (hasRequiredCSSValue) return CSSValue;
  hasRequiredCSSValue = 1;
  var e = {
    CSSValue: function() {}
  };
  return (
    (e.CSSValue.prototype = {
      constructor: e.CSSValue,
      set cssText(e) {
        var t = this._getConstructorName();
        throw new Error(
          'DOMException: property "cssText" of "' +
          t +
          '" is readonly and can not be replaced with "' +
          e +
          '"!'
        );
      },
      get cssText() {
        var e = this._getConstructorName();
        throw new Error('getter "cssText" of "' + e + '" is not implemented!');
      },
      _getConstructorName: function() {
        return this.constructor.toString().match(/function\s([^\(]+)/)[1];
      }
    }),
    (CSSValue.CSSValue = e.CSSValue),
    CSSValue
  );
}

function requireCSSValueExpression() {
  if (hasRequiredCSSValueExpression) return CSSValueExpression;
  hasRequiredCSSValueExpression = 1;
  var e = {
    CSSValue: requireCSSValue().CSSValue,
    CSSValueExpression: function(e, t) {
      (this._token = e), (this._idx = t);
    }
  };
  return (
    (e.CSSValueExpression.prototype = new e.CSSValue()),
    (e.CSSValueExpression.prototype.constructor = e.CSSValueExpression),
    (e.CSSValueExpression.prototype.parse = function() {
      for (
        var e, t = this._token, n = this._idx, s = "", r = "", i = "", o = [];;
        ++n
      ) {
        if ("" === (s = t.charAt(n))) {
          i = "css expression error: unfinished expression!";
          break;
        }
        switch (s) {
          case "(":
            o.push(s), (r += s);
            break;
          case ")":
            o.pop(s), (r += s);
            break;
          case "/":
            (e = this._parseJSComment(t, n)) ?
            e.error ?
              (i =
                "css expression error: unfinished comment in expression!") :
              (n = e.idx): (e = this._parseJSRexExp(t, n)) ?
              ((n = e.idx), (r += e.text)) :
              (r += s);
            break;
          case "'":
          case '"':
            (e = this._parseJSString(t, n, s)) ?
            ((n = e.idx), (r += e.text)) :
            (r += s);
            break;
          default:
            r += s;
        }
        if (i) break;
        if (0 === o.length) break;
      }
      return i ?
        {
          error: i
        } :
        {
          idx: n,
          expression: r
        };
    }),
    (e.CSSValueExpression.prototype._parseJSComment = function(e, t) {
      var n = e.charAt(t + 1);
      if ("/" === n || "*" === n) {
        var s,
          r,
          i = t;
        if (
          ("/" === n ? (r = "\n") : "*" === n && (r = "*/"),
            -1 !== (s = e.indexOf(r, i + 1 + 1)))
        )
          return {
            idx: (s = s + r.length - 1),
            text: e.substring(t, s + 1)
          };
        return {
          error: "css expression error: unfinished comment in expression!"
        };
      }
      return !1;
    }),
    (e.CSSValueExpression.prototype._parseJSString = function(e, t, n) {
      var s = this._findMatchedIdx(e, t, n);
      return (
        -1 !== s && {
          idx: s,
          text: e.substring(t, s + n.length)
        }
      );
    }),
    (e.CSSValueExpression.prototype._parseJSRexExp = function(e, t) {
      var n = e.substring(0, t).replace(/\s+$/, "");
      if (
        [
          /^$/,
          /\($/,
          /\[$/,
          /\!$/,
          /\+$/,
          /\-$/,
          /\*$/,
          /\/\s+/,
          /\%$/,
          /\=$/,
          /\>$/,
          /<$/,
          /\&$/,
          /\|$/,
          /\^$/,
          /\~$/,
          /\?$/,
          /\,$/,
          /delete$/,
          /in$/,
          /instanceof$/,
          /new$/,
          /typeof$/,
          /void$/
        ].some(function(e) {
          return e.test(n);
        })
      ) {
        return this._parseJSString(e, t, "/");
      }
      return !1;
    }),
    (e.CSSValueExpression.prototype._findMatchedIdx = function(e, t, n) {
      for (var s, r = t;;) {
        if (-1 === (s = e.indexOf(n, r + 1))) {
          s = -1;
          break;
        }
        var i = e.substring(t + 1, s).match(/\\+$/);
        if (!i || i[0] % 2 == 0) break;
        r = s;
      }
      return e.indexOf("\n", t + 1) < s && (s = -1), s;
    }),
    (CSSValueExpression.CSSValueExpression = e.CSSValueExpression),
    CSSValueExpression
  );
}
var hasRequiredMatcherList,
  hasRequiredCSSDocumentRule,
  hasRequiredParse,
  hasRequiredCSSStyleDeclaration,
  CSSDocumentRule = {},
  MatcherList = {};

function requireMatcherList() {
  if (hasRequiredMatcherList) return MatcherList;
  hasRequiredMatcherList = 1;
  var e = {
    MatcherList: function() {
      this.length = 0;
    }
  };
  return (
    (e.MatcherList.prototype = {
      constructor: e.MatcherList,
      get matcherText() {
        return Array.prototype.join.call(this, ", ");
      },
      set matcherText(e) {
        for (
          var t = e.split(","), n = (this.length = t.length), s = 0; s < n; s++
        )
          this[s] = t[s].trim();
      },
      appendMatcher: function(e) {
        -1 === Array.prototype.indexOf.call(this, e) &&
          ((this[this.length] = e), this.length++);
      },
      deleteMatcher: function(e) {
        var t = Array.prototype.indexOf.call(this, e); -
        1 !== t && Array.prototype.splice.call(this, t, 1);
      }
    }),
    (MatcherList.MatcherList = e.MatcherList),
    MatcherList
  );
}

function requireCSSDocumentRule() {
  if (hasRequiredCSSDocumentRule) return CSSDocumentRule;
  hasRequiredCSSDocumentRule = 1;
  var e = {
    CSSRule: requireCSSRule().CSSRule,
    MatcherList: requireMatcherList().MatcherList,
    CSSDocumentRule: function() {
      e.CSSRule.call(this),
        (this.matcher = new e.MatcherList()),
        (this.cssRules = []);
    }
  };
  return (
    (e.CSSDocumentRule.prototype = new e.CSSRule()),
    (e.CSSDocumentRule.prototype.constructor = e.CSSDocumentRule),
    (e.CSSDocumentRule.prototype.type = 10),
    Object.defineProperty(e.CSSDocumentRule.prototype, "cssText", {
      get: function() {
        for (var e = [], t = 0, n = this.cssRules.length; t < n; t++)
          e.push(this.cssRules[t].cssText);
        return (
          "@-moz-document " + this.matcher.matcherText + " {" + e.join("") + "}"
        );
      }
    }),
    (CSSDocumentRule.CSSDocumentRule = e.CSSDocumentRule),
    CSSDocumentRule
  );
}

function requireParse() {
  if (hasRequiredParse) return parse$1;
  hasRequiredParse = 1;
  var e = {
    parse: function(t) {
      for (
        var n,
          s,
          r,
          i,
          o,
          A,
          a,
          l,
          c,
          u,
          h,
          d,
          g,
          m = 0,
          S = "before-selector",
          C = "",
          p = 0,
          E = {
            selector: !0,
            value: !0,
            "value-parenthesis": !0,
            atRule: !0,
            "importRule-begin": !0,
            importRule: !0,
            atBlock: !0,
            conditionBlock: !0,
            "documentRule-begin": !0
          },
          b = new e.CSSStyleSheet(),
          f = b,
          T = [],
          y = !1,
          I = "",
          w = /@(-(?:\w+-)+)?keyframes/g,
          N = function(e) {
            var n = t.substring(0, m).split("\n"),
              s = n.length,
              r = n.pop().length + 1,
              i = new Error(e + " (line " + s + ", char " + r + ")");
            throw ((i.line = s), (i.char = r), (i.styleSheet = b), i);
          };
        (g = t.charAt(m)); m++
      )
        switch (g) {
          case " ":
          case "\t":
          case "\r":
          case "\n":
          case "\f":
            E[S] && (C += g);
            break;
          case '"':
            n = m + 1;
            do {
              (n = t.indexOf('"', n) + 1) || N('Unmatched "');
            } while ("\\" === t[n - 2]);
            switch (((C += t.slice(m, n)), (m = n - 1), S)) {
              case "before-value":
                S = "value";
                break;
              case "importRule-begin":
                S = "importRule";
            }
            break;
          case "'":
            n = m + 1;
            do {
              (n = t.indexOf("'", n) + 1) || N("Unmatched '");
            } while ("\\" === t[n - 2]);
            switch (((C += t.slice(m, n)), (m = n - 1), S)) {
              case "before-value":
                S = "value";
                break;
              case "importRule-begin":
                S = "importRule";
            }
            break;
          case "/":
            "*" === t.charAt(m + 1) ?
              ((m += 2),
                -1 === (n = t.indexOf("*/", m)) ? N("Missing */") : (m = n + 1)) :
              (C += g),
              "importRule-begin" === S && ((C += " "), (S = "importRule"));
            break;
          case "@":
            if (t.indexOf("@-moz-document", m) === m) {
              (S = "documentRule-begin"),
              ((h = new e.CSSDocumentRule()).__starts = m),
              (m += 13),
              (C = "");
              break;
            }
            if (t.indexOf("@media", m) === m) {
              (S = "atBlock"),
              ((A = new e.CSSMediaRule()).__starts = m),
              (m += 5),
              (C = "");
              break;
            }
            if (t.indexOf("@supports", m) === m) {
              (S = "conditionBlock"),
              ((a = new e.CSSSupportsRule()).__starts = m),
              (m += 8),
              (C = "");
              break;
            }
            if (t.indexOf("@host", m) === m) {
              (S = "hostRule-begin"),
              (m += 4),
              ((d = new e.CSSHostRule()).__starts = m),
              (C = "");
              break;
            }
            if (t.indexOf("@import", m) === m) {
              (S = "importRule-begin"), (m += 6), (C += "@import");
              break;
            }
            if (t.indexOf("@font-face", m) === m) {
              (S = "fontFaceRule-begin"),
              (m += 9),
              ((c = new e.CSSFontFaceRule()).__starts = m),
              (C = "");
              break;
            }
            w.lastIndex = m;
            var R = w.exec(t);
            if (R && R.index === m) {
              (S = "keyframesRule-begin"),
              ((u = new e.CSSKeyframesRule()).__starts = m),
              (u._vendorPrefix = R[1]),
              (m += R[0].length - 1),
              (C = "");
              break;
            }
            "selector" === S && (S = "atRule"), (C += g);
            break;
          case "{":
            "selector" === S || "atRule" === S ?
              ((o.selectorText = C.trim()),
                (o.style.__starts = m),
                (C = ""),
                (S = "before-name")) :
              "atBlock" === S ?
              ((A.media.mediaText = C.trim()),
                s && T.push(s),
                (f = s = A),
                (A.parentStyleSheet = b),
                (C = ""),
                (S = "before-selector")) :
              "conditionBlock" === S ?
              ((a.conditionText = C.trim()),
                s && T.push(s),
                (f = s = a),
                (a.parentStyleSheet = b),
                (C = ""),
                (S = "before-selector")) :
              "hostRule-begin" === S ?
              (s && T.push(s),
                (f = s = d),
                (d.parentStyleSheet = b),
                (C = ""),
                (S = "before-selector")) :
              "fontFaceRule-begin" === S ?
              (s && (c.parentRule = s),
                (c.parentStyleSheet = b),
                (o = c),
                (C = ""),
                (S = "before-name")) :
              "keyframesRule-begin" === S ?
              ((u.name = C.trim()),
                s && (T.push(s), (u.parentRule = s)),
                (u.parentStyleSheet = b),
                (f = s = u),
                (C = ""),
                (S = "keyframeRule-begin")) :
              "keyframeRule-begin" === S ?
              (((o = new e.CSSKeyframeRule()).keyText = C.trim()),
                (o.__starts = m),
                (C = ""),
                (S = "before-name")) :
              "documentRule-begin" === S &&
              ((h.matcher.matcherText = C.trim()),
                s && (T.push(s), (h.parentRule = s)),
                (f = s = h),
                (h.parentStyleSheet = b),
                (C = ""),
                (S = "before-selector"));
            break;
          case ":":
            "name" === S
              ?
              ((i = C.trim()), (C = ""), (S = "before-value")) :
              (C += g);
            break;
          case "(":
            if ("value" === S) {
              if ("expression" === C.trim()) {
                var D = new e.CSSValueExpression(t, m).parse();
                D.error ? N(D.error) : ((C += D.expression), (m = D.idx));
              } else(S = "value-parenthesis"), (p = 1), (C += g);
            } else "value-parenthesis" === S ? (p++, (C += g)) : (C += g);
            break;
          case ")":
            "value-parenthesis" === S && 0 === --p && (S = "value"), (C += g);
            break;
          case "!":
            "value" === S && t.indexOf("!important", m) === m ?
              ((I = "important"), (m += 9)) :
              (C += g);
            break;
          case ";":
            switch (S) {
              case "value":
                o.style.setProperty(i, C.trim(), I),
                  (I = ""),
                  (C = ""),
                  (S = "before-name");
                break;
              case "atRule":
                (C = ""), (S = "before-selector");
                break;
              case "importRule":
                ((l = new e.CSSImportRule()).parentStyleSheet =
                  l.styleSheet.parentStyleSheet =
                  b),
                (l.cssText = C + g),
                b.cssRules.push(l),
                  (C = ""),
                  (S = "before-selector");
                break;
              default:
                C += g;
            }
            break;
          case "}":
            switch (S) {
              case "value":
                o.style.setProperty(i, C.trim(), I), (I = "");
              case "before-name":
              case "name":
                (o.__ends = m + 1),
                s && (o.parentRule = s),
                  (o.parentStyleSheet = b),
                  f.cssRules.push(o),
                  (C = ""),
                  (S =
                    f.constructor === e.CSSKeyframesRule ?
                    "keyframeRule-begin" :
                    "before-selector");
                break;
              case "keyframeRule-begin":
              case "before-selector":
              case "selector":
                for (s || N("Unexpected }"), y = T.length > 0; T.length > 0;) {
                  if (
                    "CSSMediaRule" === (s = T.pop()).constructor.name ||
                    "CSSSupportsRule" === s.constructor.name
                  ) {
                    (r = f), (f = s).cssRules.push(r);
                    break;
                  }
                  0 === T.length && (y = !1);
                }
                y ||
                  ((f.__ends = m + 1), b.cssRules.push(f), (f = b), (s = null)),
                  (C = ""),
                  (S = "before-selector");
            }
            break;
          default:
            switch (S) {
              case "before-selector":
                (S = "selector"), ((o = new e.CSSStyleRule()).__starts = m);
                break;
              case "before-name":
                S = "name";
                break;
              case "before-value":
                S = "value";
                break;
              case "importRule-begin":
                S = "importRule";
            }
            C += g;
        }
      return b;
    }
  };
  return (
    (parse$1.parse = e.parse),
    (e.CSSStyleSheet = requireCSSStyleSheet().CSSStyleSheet),
    (e.CSSStyleRule = requireCSSStyleRule().CSSStyleRule),
    (e.CSSImportRule = requireCSSImportRule().CSSImportRule),
    (e.CSSGroupingRule = requireCSSGroupingRule().CSSGroupingRule),
    (e.CSSMediaRule = requireCSSMediaRule().CSSMediaRule),
    (e.CSSConditionRule = requireCSSConditionRule().CSSConditionRule),
    (e.CSSSupportsRule = requireCSSSupportsRule().CSSSupportsRule),
    (e.CSSFontFaceRule = requireCSSFontFaceRule().CSSFontFaceRule),
    (e.CSSHostRule = requireCSSHostRule().CSSHostRule),
    (e.CSSStyleDeclaration = requireCSSStyleDeclaration().CSSStyleDeclaration),
    (e.CSSKeyframeRule = requireCSSKeyframeRule().CSSKeyframeRule),
    (e.CSSKeyframesRule = requireCSSKeyframesRule().CSSKeyframesRule),
    (e.CSSValueExpression = requireCSSValueExpression().CSSValueExpression),
    (e.CSSDocumentRule = requireCSSDocumentRule().CSSDocumentRule),
    parse$1
  );
}

function requireCSSStyleDeclaration() {
  if (hasRequiredCSSStyleDeclaration) return CSSStyleDeclaration;
  hasRequiredCSSStyleDeclaration = 1;
  var e = {
    CSSStyleDeclaration: function() {
      (this.length = 0), (this.parentRule = null), (this._importants = {});
    }
  };
  return (
    (e.CSSStyleDeclaration.prototype = {
      constructor: e.CSSStyleDeclaration,
      getPropertyValue: function(e) {
        return this[e] || "";
      },
      setProperty: function(e, t, n) {
        this[e] ?
          Array.prototype.indexOf.call(this, e) < 0 &&
          ((this[this.length] = e), this.length++) :
          ((this[this.length] = e), this.length++);
        (this[e] = t + ""), (this._importants[e] = n);
      },
      removeProperty: function(e) {
        if (!(e in this)) return "";
        var t = Array.prototype.indexOf.call(this, e);
        if (t < 0) return "";
        var n = this[e];
        return (this[e] = ""), Array.prototype.splice.call(this, t, 1), n;
      },
      getPropertyCSSValue: function() {},
      getPropertyPriority: function(e) {
        return this._importants[e] || "";
      },
      getPropertyShorthand: function() {},
      isPropertyImplicit: function() {},
      get cssText() {
        for (var e = [], t = 0, n = this.length; t < n; ++t) {
          var s = this[t],
            r = this.getPropertyValue(s),
            i = this.getPropertyPriority(s);
          i && (i = " !" + i), (e[t] = s + ": " + r + i + ";");
        }
        return e.join(" ");
      },
      set cssText(t) {
        var n, s;
        for (n = this.length; n--;) this[(s = this[n])] = "";
        Array.prototype.splice.call(this, 0, this.length),
          (this._importants = {});
        var r = e.parse("#bogus{" + t + "}").cssRules[0].style,
          i = r.length;
        for (n = 0; n < i; ++n)
          (s = r[n]),
          this.setProperty(
            r[n],
            r.getPropertyValue(s),
            r.getPropertyPriority(s)
          );
      }
    }),
    (CSSStyleDeclaration.CSSStyleDeclaration = e.CSSStyleDeclaration),
    (e.parse = requireParse().parse),
    CSSStyleDeclaration
  );
}
var hasRequiredClone,
  hasRequiredLib,
  clone = {};

function requireClone() {
  if (hasRequiredClone) return clone;
  hasRequiredClone = 1;
  var e = {
    CSSStyleSheet: requireCSSStyleSheet().CSSStyleSheet,
    CSSRule: requireCSSRule().CSSRule,
    CSSStyleRule: requireCSSStyleRule().CSSStyleRule,
    CSSGroupingRule: requireCSSGroupingRule().CSSGroupingRule,
    CSSConditionRule: requireCSSConditionRule().CSSConditionRule,
    CSSMediaRule: requireCSSMediaRule().CSSMediaRule,
    CSSSupportsRule: requireCSSSupportsRule().CSSSupportsRule,
    CSSStyleDeclaration: requireCSSStyleDeclaration().CSSStyleDeclaration,
    CSSKeyframeRule: requireCSSKeyframeRule().CSSKeyframeRule,
    CSSKeyframesRule: requireCSSKeyframesRule().CSSKeyframesRule,
    clone: function t(n) {
      var s = new e.CSSStyleSheet(),
        r = n.cssRules;
      if (!r) return s;
      for (var i = 0, o = r.length; i < o; i++) {
        var A = r[i],
          a = (s.cssRules[i] = new A.constructor()),
          l = A.style;
        if (l) {
          for (
            var c = (a.style = new e.CSSStyleDeclaration()),
              u = 0,
              h = l.length; u < h; u++
          ) {
            var d = (c[u] = l[u]);
            (c[d] = l[d]), (c._importants[d] = l.getPropertyPriority(d));
          }
          c.length = l.length;
        }
        A.hasOwnProperty("keyText") && (a.keyText = A.keyText),
          A.hasOwnProperty("selectorText") && (a.selectorText = A.selectorText),
          A.hasOwnProperty("mediaText") && (a.mediaText = A.mediaText),
          A.hasOwnProperty("conditionText") &&
          (a.conditionText = A.conditionText),
          A.hasOwnProperty("cssRules") && (a.cssRules = t(A).cssRules);
      }
      return s;
    }
  };
  return (clone.clone = e.clone), clone;
}

function requireLib() {
  return (
    hasRequiredLib ||
    ((hasRequiredLib = 1),
      (lib.CSSStyleDeclaration =
        requireCSSStyleDeclaration().CSSStyleDeclaration),
      (lib.CSSRule = requireCSSRule().CSSRule),
      (lib.CSSGroupingRule = requireCSSGroupingRule().CSSGroupingRule),
      (lib.CSSConditionRule = requireCSSConditionRule().CSSConditionRule),
      (lib.CSSStyleRule = requireCSSStyleRule().CSSStyleRule),
      (lib.MediaList = requireMediaList().MediaList),
      (lib.CSSMediaRule = requireCSSMediaRule().CSSMediaRule),
      (lib.CSSSupportsRule = requireCSSSupportsRule().CSSSupportsRule),
      (lib.CSSImportRule = requireCSSImportRule().CSSImportRule),
      (lib.CSSFontFaceRule = requireCSSFontFaceRule().CSSFontFaceRule),
      (lib.CSSHostRule = requireCSSHostRule().CSSHostRule),
      (lib.StyleSheet = requireStyleSheet().StyleSheet),
      (lib.CSSStyleSheet = requireCSSStyleSheet().CSSStyleSheet),
      (lib.CSSKeyframesRule = requireCSSKeyframesRule().CSSKeyframesRule),
      (lib.CSSKeyframeRule = requireCSSKeyframeRule().CSSKeyframeRule),
      (lib.MatcherList = requireMatcherList().MatcherList),
      (lib.CSSDocumentRule = requireCSSDocumentRule().CSSDocumentRule),
      (lib.CSSValue = requireCSSValue().CSSValue),
      (lib.CSSValueExpression = requireCSSValueExpression().CSSValueExpression),
      (lib.parse = requireParse().parse),
      (lib.clone = requireClone().clone)),
    lib
  );
}
var libExports = requireLib();
const tagName$e = "style";
class HTMLStyleElement extends TextElement {
  constructor(e, t = "style") {
    super(e, t), (this[SHEET] = null);
  }
  get sheet() {
    const e = this[SHEET];
    return null !== e ? e : (this[SHEET] = libExports.parse(this.textContent));
  }
  get innerHTML() {
    return super.innerHTML || "";
  }
  set innerHTML(e) {
    (super.textContent = e), (this[SHEET] = null);
  }
  get innerText() {
    return super.innerText || "";
  }
  set innerText(e) {
    (super.textContent = e), (this[SHEET] = null);
  }
  get textContent() {
    return super.textContent || "";
  }
  set textContent(e) {
    (super.textContent = e), (this[SHEET] = null);
  }
}
exports.HTMLStyleElement = HTMLStyleElement;
registerHTMLClass("style", HTMLStyleElement);
class HTMLTimeElement extends HTMLElement {
  constructor(e, t = "time") {
    super(e, t);
  }
  get dateTime() {
    return stringAttribute.get(this, "datetime");
  }
  set dateTime(e) {
    stringAttribute.set(this, "datetime", e);
  }
}
exports.HTMLTimeElement = HTMLTimeElement;
registerHTMLClass("time", HTMLTimeElement);
class HTMLFieldSetElement extends HTMLElement {
  constructor(e, t = "fieldset") {
    super(e, t);
  }
}
exports.HTMLFieldSetElement = HTMLFieldSetElement;
class HTMLEmbedElement extends HTMLElement {
  constructor(e, t = "embed") {
    super(e, t);
  }
}
exports.HTMLEmbedElement = HTMLEmbedElement;
class HTMLHRElement extends HTMLElement {
  constructor(e, t = "hr") {
    super(e, t);
  }
}
exports.HTMLHRElement = HTMLHRElement;
class HTMLProgressElement extends HTMLElement {
  constructor(e, t = "progress") {
    super(e, t);
  }
}
exports.HTMLProgressElement = HTMLProgressElement;
class HTMLParagraphElement extends HTMLElement {
  constructor(e, t = "p") {
    super(e, t);
  }
}
exports.HTMLParagraphElement = HTMLParagraphElement;
class HTMLTableElement extends HTMLElement {
  constructor(e, t = "table") {
    super(e, t);
  }
}
exports.HTMLTableElement = HTMLTableElement;
class HTMLFrameSetElement extends HTMLElement {
  constructor(e, t = "frameset") {
    super(e, t);
  }
}
exports.HTMLFrameSetElement = HTMLFrameSetElement;
class HTMLLIElement extends HTMLElement {
  constructor(e, t = "li") {
    super(e, t);
  }
}
exports.HTMLLIElement = HTMLLIElement;
class HTMLBaseElement extends HTMLElement {
  constructor(e, t = "base") {
    super(e, t);
  }
}
exports.HTMLBaseElement = HTMLBaseElement;
class HTMLDataListElement extends HTMLElement {
  constructor(e, t = "datalist") {
    super(e, t);
  }
}
exports.HTMLDataListElement = HTMLDataListElement;
const tagName$d = "input";
class HTMLInputElement extends HTMLElement {
  constructor(e, t = "input") {
    super(e, t);
  }
  get autofocus() {
    return booleanAttribute.get(this, "autofocus") || -1;
  }
  set autofocus(e) {
    booleanAttribute.set(this, "autofocus", e);
  }
  get disabled() {
    return booleanAttribute.get(this, "disabled");
  }
  set disabled(e) {
    booleanAttribute.set(this, "disabled", e);
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(e) {
    this.setAttribute("name", e);
  }
  get placeholder() {
    return this.getAttribute("placeholder");
  }
  set placeholder(e) {
    this.setAttribute("placeholder", e);
  }
  get type() {
    return this.getAttribute("type");
  }
  set type(e) {
    this.setAttribute("type", e);
  }
  get value() {
    return stringAttribute.get(this, "value");
  }
  set value(e) {
    stringAttribute.set(this, "value", e);
  }
}
exports.HTMLInputElement = HTMLInputElement;
registerHTMLClass("input", HTMLInputElement);
class HTMLParamElement extends HTMLElement {
  constructor(e, t = "param") {
    super(e, t);
  }
}
exports.HTMLParamElement = HTMLParamElement;
class HTMLMediaElement extends HTMLElement {
  constructor(e, t = "media") {
    super(e, t);
  }
}
exports.HTMLMediaElement = HTMLMediaElement;
class HTMLAudioElement extends HTMLElement {
  constructor(e, t = "audio") {
    super(e, t);
  }
}
exports.HTMLAudioElement = HTMLAudioElement;
const tagName$c = "h1";
class HTMLHeadingElement extends HTMLElement {
  constructor(e, t = "h1") {
    super(e, t);
  }
}
exports.HTMLHeadingElement = HTMLHeadingElement;
registerHTMLClass(["h1", "h2", "h3", "h4", "h5", "h6"], HTMLHeadingElement);
class HTMLDirectoryElement extends HTMLElement {
  constructor(e, t = "dir") {
    super(e, t);
  }
}
exports.HTMLDirectoryElement = HTMLDirectoryElement;
class HTMLQuoteElement extends HTMLElement {
  constructor(e, t = "quote") {
    super(e, t);
  }
}
exports.HTMLQuoteElement = HTMLQuoteElement;
class Canvas {
  constructor(e, t) {
    (this.width = e), (this.height = t);
  }
  getContext() {
    return null;
  }
  toDataURL() {
    return "";
  }
}
var Canvas$1 = {
  createCanvas: (e, t) => new Canvas(e, t)
};
const {
  createCanvas: createCanvas
} = Canvas$1,
tagName$b = "canvas";
class HTMLCanvasElement extends HTMLElement {
  constructor(e, t = "canvas") {
    super(e, t), (this[IMAGE] = createCanvas(300, 150));
  }
  get width() {
    return this[IMAGE].width;
  }
  set width(e) {
    numericAttribute.set(this, "width", e), (this[IMAGE].width = e);
  }
  get height() {
    return this[IMAGE].height;
  }
  set height(e) {
    numericAttribute.set(this, "height", e), (this[IMAGE].height = e);
  }
  getContext(e) {
    return this[IMAGE].getContext(e);
  }
  toDataURL(...e) {
    return this[IMAGE].toDataURL(...e);
  }
}
exports.HTMLCanvasElement = HTMLCanvasElement;
registerHTMLClass("canvas", HTMLCanvasElement);
class HTMLLegendElement extends HTMLElement {
  constructor(e, t = "legend") {
    super(e, t);
  }
}
exports.HTMLLegendElement = HTMLLegendElement;
const tagName$a = "option";
class HTMLOptionElement extends HTMLElement {
  constructor(e, t = "option") {
    super(e, t);
  }
  get value() {
    return stringAttribute.get(this, "value");
  }
  set value(e) {
    stringAttribute.set(this, "value", e);
  }
  get selected() {
    return booleanAttribute.get(this, "selected");
  }
  set selected(e) {
    const t = this.parentElement?.querySelector("option[selected]");
    t && t !== this && (t.selected = !1),
      booleanAttribute.set(this, "selected", e);
  }
}
exports.HTMLOptionElement = HTMLOptionElement;
registerHTMLClass("option", HTMLOptionElement);
class HTMLSpanElement extends HTMLElement {
  constructor(e, t = "span") {
    super(e, t);
  }
}
exports.HTMLSpanElement = HTMLSpanElement;
class HTMLMeterElement extends HTMLElement {
  constructor(e, t = "meter") {
    super(e, t);
  }
}
exports.HTMLMeterElement = HTMLMeterElement;
class HTMLVideoElement extends HTMLElement {
  constructor(e, t = "video") {
    super(e, t);
  }
}
exports.HTMLVideoElement = HTMLVideoElement;
class HTMLTableCellElement extends HTMLElement {
  constructor(e, t = "td") {
    super(e, t);
  }
}
exports.HTMLTableCellElement = HTMLTableCellElement;
const tagName$9 = "title";
class HTMLTitleElement extends TextElement {
  constructor(e, t = "title") {
    super(e, t);
  }
}
exports.HTMLTitleElement = HTMLTitleElement;
registerHTMLClass("title", HTMLTitleElement);
class HTMLOutputElement extends HTMLElement {
  constructor(e, t = "output") {
    super(e, t);
  }
}
exports.HTMLOutputElement = HTMLOutputElement;
class HTMLTableRowElement extends HTMLElement {
  constructor(e, t = "tr") {
    super(e, t);
  }
}
exports.HTMLTableRowElement = HTMLTableRowElement;
class HTMLDataElement extends HTMLElement {
  constructor(e, t = "data") {
    super(e, t);
  }
}
exports.HTMLDataElement = HTMLDataElement;
class HTMLMenuElement extends HTMLElement {
  constructor(e, t = "menu") {
    super(e, t);
  }
}
exports.HTMLMenuElement = HTMLMenuElement;
const tagName$8 = "select";
class HTMLSelectElement extends HTMLElement {
  constructor(e, t = "select") {
    super(e, t);
  }
  get options() {
    let e = new NodeList(),
      {
        firstElementChild: t
      } = this;
    for (; t;)
      "OPTGROUP" === t.tagName ? e.push(...t.children) : e.push(t),
      (t = t.nextElementSibling);
    return e;
  }
  get disabled() {
    return booleanAttribute.get(this, "disabled");
  }
  set disabled(e) {
    booleanAttribute.set(this, "disabled", e);
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(e) {
    this.setAttribute("name", e);
  }
  get value() {
    return this.querySelector("option[selected]")?.value;
  }
}
exports.HTMLSelectElement = HTMLSelectElement;
registerHTMLClass("select", HTMLSelectElement);
class HTMLBRElement extends HTMLElement {
  constructor(e, t = "br") {
    super(e, t);
  }
}
exports.HTMLBRElement = HTMLBRElement;
const tagName$7 = "button";
class HTMLButtonElement extends HTMLElement {
  constructor(e, t = "button") {
    super(e, t);
  }
  get disabled() {
    return booleanAttribute.get(this, "disabled");
  }
  set disabled(e) {
    booleanAttribute.set(this, "disabled", e);
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(e) {
    this.setAttribute("name", e);
  }
  get type() {
    return this.getAttribute("type");
  }
  set type(e) {
    this.setAttribute("type", e);
  }
}
exports.HTMLButtonElement = HTMLButtonElement;
registerHTMLClass("button", HTMLButtonElement);
class HTMLMapElement extends HTMLElement {
  constructor(e, t = "map") {
    super(e, t);
  }
}
exports.HTMLMapElement = HTMLMapElement;
class HTMLOptGroupElement extends HTMLElement {
  constructor(e, t = "optgroup") {
    super(e, t);
  }
}
exports.HTMLOptGroupElement = HTMLOptGroupElement;
class HTMLDListElement extends HTMLElement {
  constructor(e, t = "dl") {
    super(e, t);
  }
}
exports.HTMLDListElement = HTMLDListElement;
const tagName$6 = "textarea";
class HTMLTextAreaElement extends TextElement {
  constructor(e, t = tagName$6) {
    super(e, t);
  }
  get disabled() {
    return booleanAttribute.get(this, "disabled");
  }
  set disabled(e) {
    booleanAttribute.set(this, "disabled", e);
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(e) {
    this.setAttribute("name", e);
  }
  get placeholder() {
    return this.getAttribute("placeholder");
  }
  set placeholder(e) {
    this.setAttribute("placeholder", e);
  }
  get type() {
    return this.getAttribute("type");
  }
  set type(e) {
    this.setAttribute("type", e);
  }
  get value() {
    return this.textContent;
  }
  set value(e) {
    this.textContent = e;
  }
}
exports.HTMLTextAreaElement = HTMLTextAreaElement;
registerHTMLClass(tagName$6, HTMLTextAreaElement);
class HTMLFontElement extends HTMLElement {
  constructor(e, t = "font") {
    super(e, t);
  }
}
exports.HTMLFontElement = HTMLFontElement;
class HTMLDivElement extends HTMLElement {
  constructor(e, t = "div") {
    super(e, t);
  }
}
exports.HTMLDivElement = HTMLDivElement;
const tagName$5 = "link";
class HTMLLinkElement extends HTMLElement {
  constructor(e, t = "link") {
    super(e, t);
  }
  get disabled() {
    return booleanAttribute.get(this, "disabled");
  }
  set disabled(e) {
    booleanAttribute.set(this, "disabled", e);
  }
  get href() {
    return stringAttribute.get(this, "href").trim();
  }
  set href(e) {
    stringAttribute.set(this, "href", e);
  }
  get hreflang() {
    return stringAttribute.get(this, "hreflang");
  }
  set hreflang(e) {
    stringAttribute.set(this, "hreflang", e);
  }
  get media() {
    return stringAttribute.get(this, "media");
  }
  set media(e) {
    stringAttribute.set(this, "media", e);
  }
  get rel() {
    return stringAttribute.get(this, "rel");
  }
  set rel(e) {
    stringAttribute.set(this, "rel", e);
  }
  get type() {
    return stringAttribute.get(this, "type");
  }
  set type(e) {
    stringAttribute.set(this, "type", e);
  }
}
exports.HTMLLinkElement = HTMLLinkElement;
registerHTMLClass("link", HTMLLinkElement);
const tagName$4 = "slot";
class HTMLSlotElement extends HTMLElement {
  constructor(e, t = "slot") {
    super(e, t);
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(e) {
    this.setAttribute("name", e);
  }
  assign() {}
  assignedNodes(e) {
    const t = !!this.name,
      n = this.getRootNode().host?.childNodes ?? [];
    let s;
    if (
      ((s = t ?
          [...n].filter((e) => e.slot === this.name) :
          [...n].filter((e) => !e.slot)),
        e?.flatten)
    ) {
      const e = [];
      for (let t of s)
        "slot" === t.localName ?
        e.push(
          ...t.assignedNodes({
            flatten: !0
          })
        ) :
        e.push(t);
      s = e;
    }
    return s.length ? s : [...this.childNodes];
  }
  assignedElements(e) {
    const t = this.assignedNodes(e).filter((e) => 1 === e.nodeType);
    return t.length ? t : [...this.children];
  }
}
exports.HTMLSlotElement = HTMLSlotElement;
registerHTMLClass("slot", HTMLSlotElement);
class HTMLFormElement extends HTMLElement {
  constructor(e, t = "form") {
    super(e, t);
  }
}
exports.HTMLFormElement = HTMLFormElement;
const tagName$3 = "img";
class HTMLImageElement extends HTMLElement {
  constructor(e, t = "img") {
    super(e, t);
  }
  get alt() {
    return stringAttribute.get(this, "alt");
  }
  set alt(e) {
    stringAttribute.set(this, "alt", e);
  }
  get sizes() {
    return stringAttribute.get(this, "sizes");
  }
  set sizes(e) {
    stringAttribute.set(this, "sizes", e);
  }
  get src() {
    return stringAttribute.get(this, "src");
  }
  set src(e) {
    stringAttribute.set(this, "src", e);
  }
  get srcset() {
    return stringAttribute.get(this, "srcset");
  }
  set srcset(e) {
    stringAttribute.set(this, "srcset", e);
  }
  get title() {
    return stringAttribute.get(this, "title");
  }
  set title(e) {
    stringAttribute.set(this, "title", e);
  }
  get width() {
    return numericAttribute.get(this, "width");
  }
  set width(e) {
    numericAttribute.set(this, "width", e);
  }
  get height() {
    return numericAttribute.get(this, "height");
  }
  set height(e) {
    numericAttribute.set(this, "height", e);
  }
}
exports.HTMLImageElement = HTMLImageElement;
registerHTMLClass("img", HTMLImageElement);
class HTMLPreElement extends HTMLElement {
  constructor(e, t = "pre") {
    super(e, t);
  }
}
exports.HTMLPreElement = HTMLPreElement;
class HTMLUListElement extends HTMLElement {
  constructor(e, t = "ul") {
    super(e, t);
  }
}
exports.HTMLUListElement = HTMLUListElement;
const tagName$2 = "meta";
class HTMLMetaElement extends HTMLElement {
  constructor(e, t = "meta") {
    super(e, t);
  }
  get name() {
    return stringAttribute.get(this, "name");
  }
  set name(e) {
    stringAttribute.set(this, "name", e);
  }
  get httpEquiv() {
    return stringAttribute.get(this, "http-equiv");
  }
  set httpEquiv(e) {
    stringAttribute.set(this, "http-equiv", e);
  }
  get content() {
    return stringAttribute.get(this, "content");
  }
  set content(e) {
    stringAttribute.set(this, "content", e);
  }
  get charset() {
    return stringAttribute.get(this, "charset");
  }
  set charset(e) {
    stringAttribute.set(this, "charset", e);
  }
  get media() {
    return stringAttribute.get(this, "media");
  }
  set media(e) {
    stringAttribute.set(this, "media", e);
  }
}
exports.HTMLMetaElement = HTMLMetaElement;
registerHTMLClass("meta", HTMLMetaElement);
class HTMLPictureElement extends HTMLElement {
  constructor(e, t = "picture") {
    super(e, t);
  }
}
exports.HTMLPictureElement = HTMLPictureElement;
class HTMLAreaElement extends HTMLElement {
  constructor(e, t = "area") {
    super(e, t);
  }
}
exports.HTMLAreaElement = HTMLAreaElement;
class HTMLOListElement extends HTMLElement {
  constructor(e, t = "ol") {
    super(e, t);
  }
}
exports.HTMLOListElement = HTMLOListElement;
class HTMLTableCaptionElement extends HTMLElement {
  constructor(e, t = "caption") {
    super(e, t);
  }
}
exports.HTMLTableCaptionElement = HTMLTableCaptionElement;
const tagName$1 = "a";
class HTMLAnchorElement extends HTMLElement {
  constructor(e, t = "a") {
    super(e, t);
  }
  get href() {
    return encodeURI(decodeURI(stringAttribute.get(this, "href"))).trim();
  }
  set href(e) {
    stringAttribute.set(this, "href", decodeURI(e));
  }
  get download() {
    return encodeURI(decodeURI(stringAttribute.get(this, "download")));
  }
  set download(e) {
    stringAttribute.set(this, "download", decodeURI(e));
  }
  get target() {
    return stringAttribute.get(this, "target");
  }
  set target(e) {
    stringAttribute.set(this, "target", e);
  }
  get type() {
    return stringAttribute.get(this, "type");
  }
  set type(e) {
    stringAttribute.set(this, "type", e);
  }
  get rel() {
    return stringAttribute.get(this, "rel");
  }
  set rel(e) {
    stringAttribute.set(this, "rel", e);
  }
}
exports.HTMLAnchorElement = HTMLAnchorElement;
registerHTMLClass("a", HTMLAnchorElement);
class HTMLLabelElement extends HTMLElement {
  constructor(e, t = "label") {
    super(e, t);
  }
}
exports.HTMLLabelElement = HTMLLabelElement;
class HTMLUnknownElement extends HTMLElement {
  constructor(e, t = "unknown") {
    super(e, t);
  }
}
exports.HTMLUnknownElement = HTMLUnknownElement;
class HTMLModElement extends HTMLElement {
  constructor(e, t = "mod") {
    super(e, t);
  }
}
exports.HTMLModElement = HTMLModElement;
class HTMLDetailsElement extends HTMLElement {
  constructor(e, t = "details") {
    super(e, t);
  }
}
exports.HTMLDetailsElement = HTMLDetailsElement;
const tagName = "source";
class HTMLSourceElement extends HTMLElement {
  constructor(e, t = tagName) {
    super(e, t);
  }
  get src() {
    return stringAttribute.get(this, "src");
  }
  set src(e) {
    stringAttribute.set(this, "src", e);
  }
  get srcset() {
    return stringAttribute.get(this, "srcset");
  }
  set srcset(e) {
    stringAttribute.set(this, "srcset", e);
  }
  get sizes() {
    return stringAttribute.get(this, "sizes");
  }
  set sizes(e) {
    stringAttribute.set(this, "sizes", e);
  }
  get type() {
    return stringAttribute.get(this, "type");
  }
  set type(e) {
    stringAttribute.set(this, "type", e);
  }
}
exports.HTMLSourceElement = HTMLSourceElement;
registerHTMLClass(tagName, HTMLSourceElement);
class HTMLTrackElement extends HTMLElement {
  constructor(e, t = "track") {
    super(e, t);
  }
}
exports.HTMLTrackElement = HTMLTrackElement;
class HTMLMarqueeElement extends HTMLElement {
  constructor(e, t = "marquee") {
    super(e, t);
  }
}
exports.HTMLMarqueeElement = HTMLMarqueeElement;
const HTMLClasses = (exports.HTMLClasses = {
    HTMLElement: HTMLElement,
    HTMLTemplateElement: HTMLTemplateElement,
    HTMLHtmlElement: HTMLHtmlElement,
    HTMLScriptElement: HTMLScriptElement,
    HTMLFrameElement: HTMLFrameElement,
    HTMLIFrameElement: HTMLIFrameElement,
    HTMLObjectElement: HTMLObjectElement,
    HTMLHeadElement: HTMLHeadElement,
    HTMLBodyElement: HTMLBodyElement,
    HTMLStyleElement: HTMLStyleElement,
    HTMLTimeElement: HTMLTimeElement,
    HTMLFieldSetElement: HTMLFieldSetElement,
    HTMLEmbedElement: HTMLEmbedElement,
    HTMLHRElement: HTMLHRElement,
    HTMLProgressElement: HTMLProgressElement,
    HTMLParagraphElement: HTMLParagraphElement,
    HTMLTableElement: HTMLTableElement,
    HTMLFrameSetElement: HTMLFrameSetElement,
    HTMLLIElement: HTMLLIElement,
    HTMLBaseElement: HTMLBaseElement,
    HTMLDataListElement: HTMLDataListElement,
    HTMLInputElement: HTMLInputElement,
    HTMLParamElement: HTMLParamElement,
    HTMLMediaElement: HTMLMediaElement,
    HTMLAudioElement: HTMLAudioElement,
    HTMLHeadingElement: HTMLHeadingElement,
    HTMLDirectoryElement: HTMLDirectoryElement,
    HTMLQuoteElement: HTMLQuoteElement,
    HTMLCanvasElement: HTMLCanvasElement,
    HTMLLegendElement: HTMLLegendElement,
    HTMLOptionElement: HTMLOptionElement,
    HTMLSpanElement: HTMLSpanElement,
    HTMLMeterElement: HTMLMeterElement,
    HTMLVideoElement: HTMLVideoElement,
    HTMLTableCellElement: HTMLTableCellElement,
    HTMLTitleElement: HTMLTitleElement,
    HTMLOutputElement: HTMLOutputElement,
    HTMLTableRowElement: HTMLTableRowElement,
    HTMLDataElement: HTMLDataElement,
    HTMLMenuElement: HTMLMenuElement,
    HTMLSelectElement: HTMLSelectElement,
    HTMLBRElement: HTMLBRElement,
    HTMLButtonElement: HTMLButtonElement,
    HTMLMapElement: HTMLMapElement,
    HTMLOptGroupElement: HTMLOptGroupElement,
    HTMLDListElement: HTMLDListElement,
    HTMLTextAreaElement: HTMLTextAreaElement,
    HTMLFontElement: HTMLFontElement,
    HTMLDivElement: HTMLDivElement,
    HTMLLinkElement: HTMLLinkElement,
    HTMLSlotElement: HTMLSlotElement,
    HTMLFormElement: HTMLFormElement,
    HTMLImageElement: HTMLImageElement,
    HTMLPreElement: HTMLPreElement,
    HTMLUListElement: HTMLUListElement,
    HTMLMetaElement: HTMLMetaElement,
    HTMLPictureElement: HTMLPictureElement,
    HTMLAreaElement: HTMLAreaElement,
    HTMLOListElement: HTMLOListElement,
    HTMLTableCaptionElement: HTMLTableCaptionElement,
    HTMLAnchorElement: HTMLAnchorElement,
    HTMLLabelElement: HTMLLabelElement,
    HTMLUnknownElement: HTMLUnknownElement,
    HTMLModElement: HTMLModElement,
    HTMLDetailsElement: HTMLDetailsElement,
    HTMLSourceElement: HTMLSourceElement,
    HTMLTrackElement: HTMLTrackElement,
    HTMLMarqueeElement: HTMLMarqueeElement
  }),
  voidElements = {
    test: () => !0
  },
  Mime = {
    "text/html": {
      docType: "<!DOCTYPE html>",
      ignoreCase: !0,
      voidElements: /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i
    },
    "image/svg+xml": {
      docType: '<?xml version="1.0" encoding="utf-8"?>',
      ignoreCase: !1,
      voidElements: voidElements
    },
    "text/xml": {
      docType: '<?xml version="1.0" encoding="utf-8"?>',
      ignoreCase: !1,
      voidElements: voidElements
    },
    "application/xml": {
      docType: '<?xml version="1.0" encoding="utf-8"?>',
      ignoreCase: !1,
      voidElements: voidElements
    },
    "application/xhtml+xml": {
      docType: '<?xml version="1.0" encoding="utf-8"?>',
      ignoreCase: !1,
      voidElements: voidElements
    }
  };
class CustomEvent extends GlobalEvent {
  constructor(e, t = {}) {
    super(e, t), (this.detail = t.detail);
  }
}
exports.CustomEvent = CustomEvent;
class InputEvent extends GlobalEvent {
  constructor(e, t = {}) {
    super(e, t),
      (this.inputType = t.inputType),
      (this.data = t.data),
      (this.dataTransfer = t.dataTransfer),
      (this.isComposing = t.isComposing || !1),
      (this.ranges = t.ranges);
  }
}
exports.InputEvent = InputEvent;
const ImageClass = (e) =>
  class extends HTMLImageElement {
    constructor(t, n) {
      switch ((super(e), arguments.length)) {
        case 1:
          (this.height = t), (this.width = t);
          break;
        case 2:
          (this.height = n), (this.width = t);
      }
    }
  },
  deleteContents = ({
    [START]: e,
    [END]: t
  }, n = null) => {
    setAdjacent(e[PREV], t[NEXT]);
    do {
      const s = getEnd(e),
        r = s === t ? s : s[NEXT];
      n ? n.insertBefore(e, n[END]) : e.remove(), (e = r);
    } while (e !== t);
  };
class Range {
  constructor() {
    (this[START] = null),
    (this[END] = null),
    (this.commonAncestorContainer = null);
  }
  insertNode(e) {
    this[END].parentNode.insertBefore(e, this[START]);
  }
  selectNode(e) {
    (this[START] = e), (this[END] = getEnd(e));
  }
  selectNodeContents(e) {
    this.selectNode(e), (this.commonAncestorContainer = e);
  }
  surroundContents(e) {
    e.replaceChildren(this.extractContents());
  }
  setStartBefore(e) {
    this[START] = e;
  }
  setStartAfter(e) {
    this[START] = e.nextSibling;
  }
  setEndBefore(e) {
    this[END] = getEnd(e.previousSibling);
  }
  setEndAfter(e) {
    this[END] = getEnd(e);
  }
  cloneContents() {
    let {
      [START]: e, [END]: t
    } = this;
    const n = e.ownerDocument.createDocumentFragment();
    for (; e !== t;)
      n.insertBefore(e.cloneNode(!0), n[END]),
      (e = getEnd(e)),
      e !== t && (e = e[NEXT]);
    return n;
  }
  deleteContents() {
    deleteContents(this);
  }
  extractContents() {
    const e = this[START].ownerDocument.createDocumentFragment();
    return deleteContents(this, e), e;
  }
  createContextualFragment(e) {
    const {
      commonAncestorContainer: t
    } = this,
    n = "ownerSVGElement" in t,
      s = n ? t.ownerDocument : t;
    let r = htmlToFragment(s, e);
    if (n) {
      const e = [...r.childNodes];
      (r = s.createDocumentFragment()),
      Object.setPrototypeOf(r, SVGElement$1.prototype),
        (r.ownerSVGElement = s);
      for (const t of e)
        Object.setPrototypeOf(t, SVGElement$1.prototype),
        (t.ownerSVGElement = s),
        r.appendChild(t);
    } else this.selectNode(r);
    return r;
  }
  cloneRange() {
    const e = new Range();
    return (e[START] = this[START]), (e[END] = this[END]), e;
  }
}
const isOK = ({
  nodeType: e
}, t) => {
  switch (e) {
    case 1:
      return 1 & t;
    case 3:
      return 4 & t;
    case 8:
      return 128 & t;
    case 4:
      return 8 & t;
  }
  return 0;
};
class TreeWalker {
  constructor(e, t = -1) {
    (this.root = e), (this.currentNode = e), (this.whatToShow = t);
    let {
      [NEXT]: n, [END]: s
    } = e;
    if (9 === e.nodeType) {
      const {
        documentElement: t
      } = e;
      (n = t), (s = t[END]);
    }
    const r = [];
    for (; n && n !== s;) isOK(n, t) && r.push(n), (n = n[NEXT]);
    this[PRIVATE] = {
      i: 0,
      nodes: r
    };
  }
  nextNode() {
    const e = this[PRIVATE];
    return (
      (this.currentNode = e.i < e.nodes.length ? e.nodes[e.i++] : null),
      this.currentNode
    );
  }
}
const query = (e, t, n) => {
    let {
      [NEXT]: s, [END]: r
    } = t;
    return e.call({
        ownerDocument: t,
        [NEXT]: s,
        [END]: r
      },
      n
    );
  },
  globalExports = assign({}, Facades, HTMLClasses, {
    CustomEvent: CustomEvent,
    Event: GlobalEvent,
    EventTarget: DOMEventTarget,
    InputEvent: InputEvent,
    NamedNodeMap: NamedNodeMap,
    NodeList: NodeList
  }),
  window = new WeakMap();
let Document$1 = class extends NonElementParentNode {
  constructor(e) {
    super(null, "#document", 9),
      (this[CUSTOM_ELEMENTS] = {
        active: !1,
        registry: null
      }),
      (this[MUTATION_OBSERVER] = {
        active: !1,
        class: null
      }),
      (this[MIME] = Mime[e]),
      (this[DOCTYPE] = null),
      (this[DOM_PARSER] = null),
      (this[GLOBALS] = null),
      (this[IMAGE] = null),
      (this[UPGRADE] = null);
  }
  get defaultView() {
    return (
      window.has(this) ||
      window.set(
        this,
        new Proxy(globalThis, {
          set: (e, t, n) => {
            switch (t) {
              case "addEventListener":
              case "removeEventListener":
              case "dispatchEvent":
                this[EVENT_TARGET][t] = n;
                break;
              default:
                e[t] = n;
            }
            return !0;
          },
          get: (e, t) => {
            switch (t) {
              case "addEventListener":
              case "removeEventListener":
              case "dispatchEvent":
                if (!this[EVENT_TARGET]) {
                  const e = (this[EVENT_TARGET] = new DOMEventTarget());
                  (e.dispatchEvent = e.dispatchEvent.bind(e)),
                  (e.addEventListener = e.addEventListener.bind(e)),
                  (e.removeEventListener = e.removeEventListener.bind(e));
                }
                return this[EVENT_TARGET][t];
              case "document":
                return this;
              case "navigator":
                return {
                  userAgent:
                    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
                };
              case "window":
                return window.get(this);
              case "customElements":
                return (
                  this[CUSTOM_ELEMENTS].registry ||
                  (this[CUSTOM_ELEMENTS] = new CustomElementRegistry(this)),
                  this[CUSTOM_ELEMENTS]
                );
              case "performance":
                return e.performance;
              case "DOMParser":
                return this[DOM_PARSER];
              case "Image":
                return (
                  this[IMAGE] || (this[IMAGE] = ImageClass(this)), this[IMAGE]
                );
              case "MutationObserver":
                return (
                  this[MUTATION_OBSERVER].class ||
                  (this[MUTATION_OBSERVER] = new MutationObserverClass(
                    this
                  )),
                  this[MUTATION_OBSERVER].class
                );
            }
            return (
              (this[GLOBALS] && this[GLOBALS][t]) || globalExports[t] || e[t]
            );
          }
        })
      ),
      window.get(this)
    );
  }
  get doctype() {
    const e = this[DOCTYPE];
    if (e) return e;
    const {
      firstChild: t
    } = this;
    return t && 10 === t.nodeType ? (this[DOCTYPE] = t) : null;
  }
  set doctype(e) {
    if (
      /^([a-z:]+)(\s+system|\s+public(\s+"([^"]+)")?)?(\s+"([^"]+)")?/i.test(e)
    ) {
      const {
        $1: e,
        $4: t,
        $6: n
      } = RegExp;
      (this[DOCTYPE] = new DocumentType$1(this, e, t, n)),
      knownSiblings(this, this[DOCTYPE], this[NEXT]);
    }
  }
  get documentElement() {
    return this.firstElementChild;
  }
  get isConnected() {
    return !0;
  }
  _getParent() {
    return this[EVENT_TARGET];
  }
  createAttribute(e) {
    return new Attr$1(this, e);
  }
  createCDATASection(e) {
    return new CDATASection$1(this, e);
  }
  createComment(e) {
    return new Comment$2(this, e);
  }
  createDocumentFragment() {
    return new DocumentFragment$1(this);
  }
  createDocumentType(e, t, n) {
    return new DocumentType$1(this, e, t, n);
  }
  createElement(e) {
    return new Element$1(this, e);
  }
  createRange() {
    const e = new Range();
    return (e.commonAncestorContainer = this), e;
  }
  createTextNode(e) {
    return new Text$1(this, e);
  }
  createTreeWalker(e, t = -1) {
    return new TreeWalker(e, t);
  }
  createNodeIterator(e, t = -1) {
    return this.createTreeWalker(e, t);
  }
  createEvent(e) {
    const t = create$1(
      "Event" === e ? new GlobalEvent("") : new CustomEvent("")
    );
    return (
      (t.initEvent = t.initCustomEvent =
        (e, n = !1, s = !1, r) => {
          (t.bubbles = !!n),
          defineProperties(t, {
            type: {
              value: e
            },
            canBubble: {
              value: n
            },
            cancelable: {
              value: s
            },
            detail: {
              value: r
            }
          });
        }),
      t
    );
  }
  cloneNode(e = !1) {
    const {
      constructor: t,
      [CUSTOM_ELEMENTS]: n,
      [DOCTYPE]: s
    } = this,
    r = new t();
    if (((r[CUSTOM_ELEMENTS] = n), e)) {
      const e = r[END],
        {
          childNodes: t
        } = this;
      for (let {
          length: n
        } = t, s = 0; s < n; s++)
        r.insertBefore(t[s].cloneNode(!0), e);
      s && (r[DOCTYPE] = t[0]);
    }
    return r;
  }
  importNode(e) {
    const t = 1 < arguments.length && !!arguments[1],
      n = e.cloneNode(t),
      {
        [CUSTOM_ELEMENTS]: s
      } = this,
      {
        active: r
      } = s,
      i = (e) => {
        const {
          ownerDocument: t,
          nodeType: n
        } = e;
        (e.ownerDocument = this), r && t !== this && 1 === n && s.upgrade(e);
      };
    if ((i(n), t))
      switch (n.nodeType) {
        case 1:
        case 11: {
          let {
            [NEXT]: e, [END]: t
          } = n;
          for (; e !== t;) 1 === e.nodeType && i(e), (e = e[NEXT]);
          break;
        }
      }
    return n;
  }
  toString() {
    return this.childNodes.join("");
  }
  querySelector(e) {
    return query(super.querySelector, this, e);
  }
  querySelectorAll(e) {
    return query(super.querySelectorAll, this, e);
  }
  getElementsByTagNameNS(e, t) {
    return this.getElementsByTagName(t);
  }
  createAttributeNS(e, t) {
    return this.createAttribute(t);
  }
  createElementNS(e, t, n) {
    return e === SVG_NAMESPACE ?
      new SVGElement$1(this, t, null) :
      this.createElement(t, n);
  }
};
setPrototypeOf(
  (globalExports.Document = function() {
    illegalConstructor();
  }),
  Document$1
).prototype = Document$1.prototype;
const createHTMLElement$1 = (e, t, n, s) => {
  if (!t && htmlClasses.has(n)) {
    return new(htmlClasses.get(n))(e, n);
  }
  const {
    [CUSTOM_ELEMENTS]: {
      active: r,
      registry: i
    }
  } = e;
  if (r) {
    const r = t ? s.is : n;
    if (i.has(r)) {
      const {
        Class: t
      } = i.get(r),
        s = new t(e, n);
      return (
        customElements.set(s, {
          connected: !1
        }),
        s
      );
    }
  }
  return new HTMLElement(e, n);
};
class HTMLDocument extends Document$1 {
  constructor() {
    super("text/html");
  }
  get all() {
    const e = new NodeList();
    let {
      [NEXT]: t, [END]: n
    } = this;
    for (; t !== n;) {
      if (1 === t.nodeType) e.push(t);
      t = t[NEXT];
    }
    return e;
  }
  get head() {
    const {
      documentElement: e
    } = this;
    let {
      firstElementChild: t
    } = e;
    return (
      (t && "HEAD" === t.tagName) ||
      ((t = this.createElement("head")), e.prepend(t)),
      t
    );
  }
  get body() {
    const {
      head: e
    } = this;
    let {
      nextElementSibling: t
    } = e;
    return (
      (t && "BODY" === t.tagName) ||
      ((t = this.createElement("body")), e.after(t)),
      t
    );
  }
  get title() {
    const {
      head: e
    } = this;
    return e.getElementsByTagName("title").at(0)?.textContent || "";
  }
  set title(e) {
    const {
      head: t
    } = this;
    let n = t.getElementsByTagName("title").at(0);
    n
      ?
      (n.textContent = e) :
      (t.insertBefore(this.createElement("title"), t.firstChild).textContent =
        e);
  }
  createElement(e, t) {
    const n = !(!t || !t.is),
      s = createHTMLElement$1(this, n, e, t);
    return n && s.setAttribute("is", t.is), s;
  }
}
class SVGDocument extends Document$1 {
  constructor() {
    super("image/svg+xml");
  }
  toString() {
    return this[MIME].docType + super.toString();
  }
}
class XMLDocument extends Document$1 {
  constructor() {
    super("text/xml");
  }
  toString() {
    return this[MIME].docType + super.toString();
  }
}
class DOMParser {
  parseFromString(e, t, n = null) {
    let s,
      r = !1;
    return (
      "text/html" === t ?
      ((r = !0), (s = new HTMLDocument())) :
      (s = "image/svg+xml" === t ? new SVGDocument() : new XMLDocument()),
      (s[DOM_PARSER] = DOMParser),
      n && (s[GLOBALS] = n),
      r &&
      "..." === e &&
      (e = "<!doctype html><html><head></head><body></body></html>"),
      e ? parseFromString(s, r, e) : s
    );
  }
}
exports.DOMParser = DOMParser;
const {
  parse: parse
} = JSON,
append = (e, t, n) => {
    (t.parentNode = e), knownSiblings(n[PREV], t, n);
  },
  createHTMLElement = (e, t) => {
    if (htmlClasses.has(t)) {
      return new(htmlClasses.get(t))(e, t);
    }
    return new HTMLElement(e, t);
  },
  parseJSON = (e) => {
    const t = "string" == typeof e ? parse(e) : e,
      {
        length: n
      } = t,
      s = new HTMLDocument();
    let r = s,
      i = r[END],
      o = !1,
      A = 0;
    for (; A < n;) {
      let e = t[A++];
      switch (e) {
        case 1: {
          const e = t[A++],
            n = o || "svg" === e || "SVG" === e,
            a = n ?
            new SVGElement$1(s, e, r.ownerSVGElement || null) :
            createHTMLElement(s, e);
          knownBoundaries(i[PREV], a, i),
            (a.parentNode = r),
            (r = a),
            (i = r[END]),
            (o = n);
          break;
        }
        case 2: {
          const e = t[A++],
            n = "string" == typeof t[A] ? t[A++] : "",
            o = new Attr$1(s, e, n);
          (o.ownerElement = r), knownSiblings(i[PREV], o, i);
          break;
        }
        case 3:
          append(r, new Text$1(s, t[A++]), i);
          break;
        case 8:
          append(r, new Comment$2(s, t[A++]), i);
          break;
        case 4:
          append(r, new CDATASection$1(s, t[A++]), i);
          break;
        case 10: {
          const e = [s];
          for (;
            "string" == typeof t[A];) e.push(t[A++]);
          3 === e.length && /\.dtd$/i.test(e[2]) && e.splice(2, 0, ""),
            append(r, new DocumentType$1(...e), i);
          break;
        }
        case 11:
          (r = s.createDocumentFragment()), (i = r[END]);
        case 9:
          break;
        default:
          do {
            (e -= -1),
            o && !r.ownerSVGElement && (o = !1),
              (r = r.parentNode || r);
          } while (e < 0);
          i = r[END];
      }
    }
    switch (A && t[0]) {
      case 1:
        return s.firstElementChild;
      case 11:
        return r;
    }
    return s;
  },
  toJSON = (e) => e.toJSON();
exports.toJSON = toJSON;
exports.parseJSON = parseJSON;
class NodeFilter {
  static get SHOW_ALL() {
    return -1;
  }
  static get SHOW_ELEMENT() {
    return 1;
  }
  static get SHOW_COMMENT() {
    return 128;
  }
  static get SHOW_CDATA_SECTION() {
    return 8;
  }
  static get SHOW_TEXT() {
    return 4;
  }
}
exports.NodeFilter = NodeFilter;
const parseHTML = (e, t = null) =>
  new DOMParser().parseFromString(e, "text/html", t).defaultView;
exports.parseHTML = parseHTML;

function Document() {
  illegalConstructor();
}
setPrototypeOf(Document, Document$1).prototype = Document$1.prototype;
//# sourceMappingURL=/sm/0df0c1c9bb3038466cc6a88453ae00e14f5b290045f63dcb12ee4fbb6f077bc4.map
