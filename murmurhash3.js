/*!
 * This Software is licensed under the terms of the MIT License.
 * A copy of the license is available at https://github.com/tanguylegazon/js-murmurhash3/blob/main/LICENSE.
 */

/**
 * @function murmurHash3_32
 * @description This function computes the 32-bit MurmurHash3 hash of an ASCII-encoded string.
 * @param {string} key - The ASCII-encoded string to hash.
 * @param {number} [seed=0] - The seed value.
 *
 * @returns {number} The 32-bit hash value.
 */
function murmurHash3_32(key, seed = 0) {
    const len = key.length;
    const c1 = 0xcc9e2d51, c2 = 0x1b873593;
    let h1 = seed >>> 0;
    let i = 0;
    const limit = len & ~3;

    while (i < limit) {
        let k1 = (key.charCodeAt(i) & 0xff) |
            ((key.charCodeAt(i + 1) & 0xff) << 8) |
            ((key.charCodeAt(i + 2) & 0xff) << 16) |
            ((key.charCodeAt(i + 3) & 0xff) << 24);

        k1 = Math.imul(k1, c1);
        k1 = (k1 << 15) | (k1 >>> 17);
        k1 = Math.imul(k1, c2);
        h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19);
        h1 = Math.imul(h1, 5) + 0xe6546b64;
        i += 4;
    }

    let k1 = 0;

    if ((len & 3) === 3) {
        k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
    }
    if ((len & 3) >= 2) {
        k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
    }
    if ((len & 3) >= 1) {
        k1 ^= (key.charCodeAt(i) & 0xff);
        k1 = Math.imul(k1, c1);
        k1 = (k1 << 15) | (k1 >>> 17);
        k1 = Math.imul(k1, c2);
        h1 ^= k1;
    }

    h1 ^= len;
    h1 ^= h1 >>> 16;
    h1 = Math.imul(h1, 0x85ebca6b);
    h1 ^= h1 >>> 13;
    h1 = Math.imul(h1, 0xc2b2ae35);
    h1 ^= h1 >>> 16;

    return h1 >>> 0;
}

export {murmurHash3_32};