const Constants = require("./Constants")

class Util {
  static toVarint(i: any): any {
    var arr = []
    if (i < 0) {
      i = ~i
      if (i <= 0x3) {
        return Buffer.from([0xfc | i])
      }

      arr.push(0xf8)
    }

    if (i < 0x80) {
      arr.push(i)
    } else if (i < 0x4000) {
      arr.push((i >> 8) | 0x80)
      arr.push(i & 0xff)
    } else if (i < 0x200000) {
      arr.push((i >> 16) | 0xc0)
      arr.push((i >> 8) & 0xff)
      arr.push(i & 0xff)
    } else if (i < 0x10000000) {
      arr.push((i >> 24) | 0xe0)
      arr.push((i >> 16) & 0xff)
      arr.push((i >> 8) & 0xff)
      arr.push(i & 0xff)
    } else if (i < 0x100000000) {
      arr.push(0xf0)
      arr.push((i >> 24) & 0xff)
      arr.push((i >> 16) & 0xff)
      arr.push((i >> 8) & 0xff)
      arr.push(i & 0xff)
    } else {
      throw new TypeError("Non-integer values are not supported. (" + i + ")")
    }

    return {
      value: Buffer.from(arr),
      length: arr.length,
    }
  }

  static fromVarInt(buf: any) {
    // TODO: 111110__ + varint	Negative recursive varint
    // TODO: 111111xx       	Byte-inverted negative two bit number (~xx)

    var retVal = {
      value: 0,
      consumed: 0,
    }

    if (buf[0] < 0x80) {
      // 0xxxxxxx            7 bit positive number
      retVal.value = buf[0]
      retVal.consumed = 1
    } else if (buf[0] < 0xc0) {
      // 10xxxxxx + 1 byte   14-bit positive number
      retVal.value = (buf[0] & 0x3f) << 8
      retVal.value |= buf[1]
      retVal.consumed = 2
    } else if (buf[0] < 0xe0) {
      // 110xxxxx + 2 bytes  21-bit positive number
      retVal.value = (buf[0] & 0x1f) << 16
      retVal.value |= buf[1] << 8
      retVal.value |= buf[2]
      retVal.consumed = 3
    } else if (buf[0] < 0xf0) {
      // 1110xxxx + 3 bytes  28-bit positive number
      retVal.value = (buf[0] & 0x0f) << 24
      retVal.value |= buf[1] << 16
      retVal.value |= buf[2] << 8
      retVal.value |= buf[3]
      retVal.consumed = 4
    } else if (buf[0] < 0xf4) {
      // 111100__ + int (32-bit)
      retVal.value = buf[1] << 24
      retVal.value |= buf[2] << 16
      retVal.value |= buf[3] << 8
      retVal.value |= buf[4]
      retVal.consumed = 5
    } else if (buf[0] < 0xfc) {
      // 111101__ + long (64-bit)
      retVal.value = buf[1] << 56
      retVal.value |= buf[2] << 48
      retVal.value |= buf[3] << 40
      retVal.value |= buf[4] << 32
      retVal.value |= buf[5] << 24
      retVal.value |= buf[6] << 16
      retVal.value |= buf[7] << 8
      retVal.value |= buf[8]
      retVal.consumed = 9
    }

    return retVal
  }

  static encodeVersion(major: any, minor: any, patch: any) {
    return ((major & 0xffff) << 16) | ((minor & 0xff) << 8) | (patch & 0xff)
  }

  static cloneObject(obj: any) {
    return Object.assign(Object.create(obj), obj)
  }

  static adjustNetworkBandwidth(bitspersec: any) {
    let frames = Constants.Network.framesPerPacket
    let bitrate = Constants.Network.quality

    if (this.getNetworkBandwidth(bitrate, frames) > bitspersec) {
      while (bitrate > 8000 && this.getNetworkBandwidth(bitrate, frames) > bitspersec) {
        bitrate -= 1000
      }
    }

    return bitrate
  }

  static getNetworkBandwidth(bitrate: any, frames: any) {
    let overhead = 20 + 8 + 4 + 1 + 2 + frames + 12
    overhead *= 800 / frames
    return overhead + bitrate
  }

  /**
   * Sets default properties on an object that aren't already specified.
   * @param {Object} def Default properties
   * @param {Object} given Object to assign defaults to
   * @returns {Object}
   * @private
   */
  static mergeDefault(def: any, given: any) {
    if (!given) return def
    for (const key in def) {
      if (!{}.hasOwnProperty.call(given, key)) {
        given[key] = def[key]
      } else if (given[key] === Object(given[key])) {
        given[key] = this.mergeDefault(def[key], given[key])
      }
    }

    return given
  }
}

export default Util
