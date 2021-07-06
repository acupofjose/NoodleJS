/// <reference types="node" />
declare module "Messages" {
  const _exports: {
    0: string
    1: string
    2: string
    3: string
    4: string
    5: string
    6: string
    7: string
    8: string
    9: string
    10: string
    11: string
    12: string
    13: string
    14: string
    15: string
    16: string
    17: string
    18: string
    19: string
    20: string
    21: string
    22: string
    23: string
    24: string
    25: string
  }
  export = _exports
}
declare module "Protobuf" {
  export = Protobuf
  class Protobuf {
    mumble: protobufjs.Root
    encodePacket(type: any, payload: any): any
    decodePacket(type_id: any, buffer: any): any
    nameById(id: any): any
    idByName(name: any): string
  }
  import protobufjs = require("protobufjs")
}
declare module "Constants" {
  export namespace Audio {
    const sampleRate: number
    const channels: number
    const bitDepth: number
    const frameSize: number
    const frameLength: number
  }
  export namespace Network {
    const framesPerPacket: number
    const quality: number
  }
  export namespace DefaultOptions {
    const url: string
    const port: string
    const rejectUnauthorized: boolean
    const name: string
    const password: string
    const tokens: any[]
  }
  /**
   * Options for a client
   */
  export type ClientOptions = {
    /**
     * The URL of the Mumble server
     */
    url?: string
    /**
     * The port the Mumble server is listening on
     */
    port?: string
    /**
     * Whether we should reject invalid certificates
     */
    rejectUnauthorized?: boolean
    /**
     * The name of the user that will connect
     */
    name?: string
    /**
     * A password when the server has one
     */
    password?: string
  }
}
declare module "Util" {
  export = Util
  class Util {
    static toVarint(i: any):
      | Buffer
      | {
          value: Buffer
          length: number
        }
    static fromVarInt(buf: any): {
      value: number
      consumed: number
    }
    static encodeVersion(major: any, minor: any, patch: any): number
    static cloneObject(obj: any): any
    static adjustNetworkBandwidth(bitspersec: any): number
    static getNetworkBandwidth(bitrate: any, frames: any): any
    /**
     * Sets default properties on an object that aren't already specified.
     * @param {Object} def Default properties
     * @param {Object} given Object to assign defaults to
     * @returns {Object}
     * @private
     */
    private static mergeDefault
  }
}
declare module "Connection" {
  export = Connection
  class Connection extends EventEmitter {
    static codec(): {
      Celt: number
      Ping: number
      Speex: number
      CeltBeta: number
      Opus: number
    }
    constructor(options: any)
    options: any
    opusEncoder: OpusEncoder
    currentEncoder: OpusEncoder
    codec: number
    voiceSequence: number
    codecWarningShown: {}
    connect(): void
    protobuf: any
    socket: tls.TLSSocket
    close(): void
    _onReceiveData(data: any): void
    _processData(type: any, data: any): void
    _processMessage(type: any, msg: any): void
    _writePacket(buffer: any): void
    _writeHeader(type: any, data: any): void
    writeProto(type: any, data: any): any
    readAudio(data: any): void
    writeAudio(packet: any, whisperTarget: any, codec: any, voiceSequence: any, final: any): number
  }
  import EventEmitter_1 = require("events")
  import EventEmitter = EventEmitter_1.EventEmitter
  import OpusEncoder_1 = require("@discordjs/opus")
  import OpusEncoder = OpusEncoder_1.OpusEncoder
  import tls = require("tls")
}
declare module "handlers/AbstractHandler" {
  export = AbstractHandler
  class AbstractHandler {
    constructor(client: any)
    client: any
    handle(data: any): any
  }
}
declare module "handlers/ServerSync" {
  export = ServerSync
  class ServerSync extends AbstractHandler {}
  import AbstractHandler = require("handlers/AbstractHandler")
}
declare module "structures/Collection" {
  export = Collection
  /**
   * A Map with additional utility methods. This is used throughout discord.js rather than Arrays for anything that has
   * an ID, for significantly improved performance and ease-of-use.
   * @extends {Map}
   */
  class Collection extends Map<any, any> {
    constructor(iterable: any)
    _array: any[]
    _keyArray: any
    /**
     * Creates an ordered array of the values of this collection, and caches it internally. The array will only be
     * reconstructed if an item is added to or removed from the collection, or if you change the length of the array
     * itself. If you don't want this caching behaviour, use `Array.from(collection.values())` instead.
     * @returns {Array}
     */
    array(): any[]
    /**
     * Searches for a single item where its specified property's value is identical to the given value
     * (`item[prop] === value`), or the given function returns a truthy value. In the latter case, this is identical to
     * [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
     * <warn>All collections used in Discord.js are mapped using their `id` property, and if you want to find by id you
     * should use the `get` method. See
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) for details.</warn>
     * @param {string|Function} propOrFn The property to test against, or the function to test with
     * @param {*} [value] The expected value - only applicable and required if using a property for the first argument
     * @returns {*}
     * @example
     * collection.find('username', 'Bob');
     * @example
     * collection.find(val => val.username === 'Bob');
     */
    find(propOrFn: string | Function, value?: any): any
  }
}
declare module "structures/TextMessage" {
  export = TextMessage
  class TextMessage {
    constructor(client: any, data: any)
    users: Collection
    channels: Collection
    trees: Collection
    setup(data: any): void
    sender: any
    content: any
    reply(message: any): any
    toPacket(): {
      message: any
      session: any[]
      channelId: any[]
      treeId: any[]
    }
  }
  import Collection = require("structures/Collection")
}
declare module "structures/User" {
  export = User
  class User {
    constructor(client: any, data: any)
    setup(data: any): void
    id: any
    channel: any
    actor: any
    sendMessage(message: any): any
  }
}
declare module "handlers/UserState" {
  export = UserState
  class UserState extends AbstractHandler {}
  import AbstractHandler = require("handlers/AbstractHandler")
}
declare module "handlers/UserRemove" {
  export = UserRemove
  class UserRemove extends AbstractHandler {}
  import AbstractHandler = require("handlers/AbstractHandler")
}
declare module "structures/Channel" {
  export = Channel
  /**
   * Represents a channel on Mumble
   */
  class Channel {
    /**
     * @param  {Client} client The client that instantiated the channel
     * @param  {ChannelData} data Information about the channel
     */
    constructor(client: any, data: any)
    children: Collection
    links: Collection
    setup(data: any): void
    id: any
    parent: any
    name: any
    description: any
    temporary: any
    position: any
    sendMessage(message: any, recursive: any): any
  }
  import Collection = require("structures/Collection")
}
declare module "handlers/ChannelState" {
  export = ChannelState
  class ChannelState extends AbstractHandler {}
  import AbstractHandler = require("handlers/AbstractHandler")
}
declare module "handlers/ChannelRemove" {
  export = ChannelRemove
  class ChannelRemove extends AbstractHandler {}
  import AbstractHandler = require("handlers/AbstractHandler")
}
declare module "handlers/TextMessage" {
  export = TextMessageHandler
  class TextMessageHandler extends AbstractHandler {}
  import AbstractHandler = require("handlers/AbstractHandler")
}
declare module "voice/DispatchStream" {
  export = DispatchStream
  class DispatchStream extends WritableStream {
    constructor(connection: any, voiceTarget: any)
    connection: any
    processObserver: EventEmitter
    frameQueue: any[]
    lastFrame: Buffer
    whisperId: any
    _volume: number
    lastFrameWritten: number
    lastWrite: number
    open(): void
    processInterval: NodeJS.Timeout
    close(): void
    set volume(arg: number)
    get volume(): number
    applyFrameVolume(frame: any, gain: any): any
    _createFrameBuffer(): Buffer
    _processAudioBuffer(): void
    voiceSequence: any
  }
  import WritableStream_1 = require("stream")
  import WritableStream = WritableStream_1.Writable
  import EventEmitter_2 = require("events")
  import EventEmitter = EventEmitter_2.EventEmitter
}
declare module "voice/Dispatcher" {
  export = Dispatcher
  class Dispatcher extends EventEmitter {
    constructor(client: any)
    client: any
    connection: any
    playFile(filename: any, voiceTarget: any): void
    playStream(stream: any, voiceTarget: any): void
    play(unknown: any, voiceTarget: any): void
    dispatchStream: DispatchStream
    command: any
    setVolume(volume: any): void
    getVolume(): number
    stopStream(): void
    stop(): void
  }
  import EventEmitter_3 = require("events")
  import EventEmitter = EventEmitter_3.EventEmitter
  import DispatchStream = require("voice/DispatchStream")
}
declare module "noodle.js" {
  export = Client
  /**
   * The main class for interacting with the Mumble server
   * @extends EventEmitter
   */
  class Client extends EventEmitter {
    /**
     * @param  {ClientOptions} [options] Options for the client
     */
    constructor(options?: any)
    /**
     * The options the client is instantiated with
     * @type {ClientOptions}
     */
    options: any
    /**
     * The connection to the Mumble server
     * @type {Connection}
     * @private
     */
    private connection
    /**
     * All of the {@link Channel} objects that are synced with the server,
     * mapped by their IDs
     * @type {Collection<id, Channel>}
     */
    channels: any
    /**
     * All of the {@link User} objects that are synced with the server,
     * mapped by their sessions
     * @type {Collection<session, User>}
     */
    users: any
    /**
     * The {@link Dispatcher} for the voiceConnection
     * @type {Dispatcher}
     */
    voiceConnection: Dispatcher
    /**
     * The ping routine for the client to keep the connection alive
     * @private
     */
    private _pingRoutine
    ping: NodeJS.Timeout
    connect(): void
    /**
     * Sends a message to the {@link Channel} where the client is currently
     * connected
     * @param  {String} message   The message to be sent
     * @param  {Boolean} recursive If the message should be sent down the tree
     * @return {Promise<TextMessage>}
     */
    sendMessage(message: string, recursive: boolean): any
    /**
     * Switches to another channel
     * @param  {Number} id         The id of the channel to switch to
     * @return {Promise<any>}
     */
    switchChannel(id: number): any
    /**
     * Starts listening to another channel without joining it
     * @param  {Number} id         The id of the channel to start listening to
     * @return {Promise<any>}
     */
    startListeningToChannel(id: number): any
    /**
     * Stops listening to another channel
     * @param  {Number} id         The id of the channel to stop listening to
     * @return {Promise<any>}
     */
    stopListeningToChannel(id: number): any
    /**
     * Set up a voiceTarget to be optionally used when sending voice data
     * @param  {Number} targetId       The id for this voiceTarget. Must be between 4 and 30
     * @param  {Array.<Number>} userIds  Array of user sessions to send to. Can be empty.
     * @param  {Number} channelId      ChannelId to send to. Ignored when userIds is not empty.
     * @return {Promise<any>}
     */
    setupVoiceTarget(targetId: number, userIds: Array<number>, channelId: number): any
    mute(): void
    unmute(): void
    destroy(): any
  }
  import EventEmitter_4 = require("events")
  import EventEmitter = EventEmitter_4.EventEmitter
  import Dispatcher = require("voice/Dispatcher")
}
