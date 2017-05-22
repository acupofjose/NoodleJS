const AbstractHandler = require('./AbstractHandler')
const TextMessage = require('../structures/TextMessage')

class TextMessageHandler extends AbstractHandler {
    handle(data) {
        const textMessage = new TextMessage(this.client, data)
        this.client.emit('textMessage', textMessage)
    }
}

module.exports = TextMessageHandler