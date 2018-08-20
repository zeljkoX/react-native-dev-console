/**
 * @flow
 */

const supportedLogTypes = ['log', 'warn', 'info','error']
let originalConsoleFunction = {}


const defaultOptions = {
  passtrough: false
}

class LogService {
  isStarted = false
  isTrackingPreSubscriberLogs = false
  subscriber = null // subscriber function
  preSubscriberLogs = [] // logs that are caught before subscriber is added
  originalConsoleFunction = {}

  start(fn: ?Function, options: ?Object = defaultOptions) {
    if (this.isStarted) {
      return
    }
    if (fn) {
      this.addSubscriber(fn)
      this.isStarted = true
      this.isTrackingPreSubscriberLogs = false
    } else {
      this.isTrackingPreSubscriberLogs = true
    }
    supportedLogTypes.forEach(type => {
      this.originalConsoleFunction[type] = console[type]
      console[type] = this.interceptLog(options.passtrough ? console[type] : () => {}, this.dispatchLog)
    })
  }

  stop() {
    if (!this.isStarted) {
      return
    }
    this.isStarted = false
    this.supportedLogTypes.forEach(type => {
      console[type] = this.originalConsoleFunction[type]
    })
    this.preSubscriberLogs = []
    this.subscriber = null
  }

    // add console.log subscriber
  addSubscriber(fn: ?Function) {
    if (!fn || typeof fn !== 'function') {
      throw new Error('Bad argument')
    }
    this.subscriber = fn
  }

  // dispach log to all subscriber
  dispatchLog = (log) => {
    if (this.isTrackingPreSubscriberLogs) {
      return this.preSubscriberLogs.push(log)
    }
    this.subscriber(log)
  }

  // intercept original console.log call and use custom logic
  interceptLog(originalFn: Function, callback: Function) {
    return function() {
      let args = Array.prototype.slice.apply(arguments)
      callback && callback(args)
      return originalFn.apply(console, args)
    }
  }

  // return initial logs
  getPreSubscriberLogs(): Array<any> {
    return this.preSubscriberLogs
  }

  clearPreSubscriberLogs() {
    this.preSubscriberLogs = []
  }
}

export default new LogService()