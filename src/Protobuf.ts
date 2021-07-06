import Promise from "bluebird"

const protobufjs = require("protobufjs")
const path = require("path")
const Messages = require("./Messages")

class Protobuf {
  mumble: any
  then(arg0: any) {
    throw new Error("Method not implemented.")
  }
  constructor() {
    return protobufjs
      .load(path.join(__dirname, "Mumble.proto"))
      .then((root: any) => {
        this.mumble = root
        return Promise.resolve(this)
      })
      .catch((err: any) => {
        throw new Error(err)
      })
  }

  encodePacket(type: any, payload: any) {
    const packet = this.mumble.lookup(`MumbleProto.${type}`)
    if (packet.verify(payload)) throw new Error(`Error verifying payload for packet ${type}`)
    const message = packet.create(payload)
    return packet.encode(message).finish()
  }

  decodePacket(type_id: any, buffer: any) {
    const type = this.nameById(type_id)
    const packet = this.mumble.lookup(`MumbleProto.${type}`)
    return packet.decode(buffer).toJSON()
  }

  nameById(id: any) {
    return Messages[id]
  }

  idByName(name: any) {
    for (const key in Messages) {
      if (Messages[key] == name) return key
    }
  }
}

export default Protobuf
