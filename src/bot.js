import EventEmitter from 'eventemitter3'
import axios from 'axios'

import Webhook from './webhook'

const _eventTypes = ['message', 'follow', 'unfollow', 'join', 'leave', 'postback', 'beacon']
const _messageTypes = ['text', 'image', 'video', 'audio', 'location', 'sticker']
const _sourceTypes = ['user', 'group', 'room']

class LineBot extends EventEmitter {

  static get eventTypes () {
    return _eventTypes
  }

  static get messageTypes () {
    return _messageTypes
  }

  static get sourceTypes () {
    return _sourceTypes
  }

  constructor (secret, token, options = {}) {
    super()
    this.secret = secret
    this.token = token
    this.options = options
    this._Webhook = new Webhook(this.token, this.options.webhook, this.processEvents.bind(this), (webhookStarted) => {
      this.emit('webhook', webhookStarted)
    })
  }

  request (path) {
    return axios.get(path)
  }

  processEvents (events) {
    this.emit('events', events)
    // `events` is a Webhook Event Object -- https://devdocs.line.me/en/#webhook-event-object
    // const processEventType = eventType => {
    //   if (event.type === eventType)
    // }
    // LineBot.eventTypes.forEach()
    events.forEach(this.parseOneEvent.bind(this))
  }

  parseOneEvent (event) {
    this.emit('event', event)
    switch (event.type) {
      case 'message':
        this.emit('message', event)
        break
      case 'follow':
        this.emit('follow', event)
        break
      case 'unfollow':
        this.emit('unfollow', event)
        break
      case 'join':
        this.emit('join', event)
        break
      case 'leave':
        this.emit('leave', event)
        break
      case 'postback':
        this.emit('postback', event)
        break
      case 'beacon':
        this.emit('beacon', event)
        break
      default:
        break
    }
  }

  push (channel, messages) {

  }

  reply (replyToken, messages) {
    
  }
}

export default LineBot
