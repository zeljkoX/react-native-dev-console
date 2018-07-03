/**
 * @flow
 */

let originalConsoleLog = null
let originalConsoleFunction = {}
let isInitialized = false
let subscribers = []

function init(fn, options) {
  if (isInitialized) {
    return
  }
  if (fn) {
    addSubscriber(fn)
  }
  isInitialized = true
  ;['log', 'warn', 'info', 'error'].forEach(type => {
    originalConsoleFunction[type] = console[type]
    console[type] = interceptLog(options.passtrough ? console[type] : () => {}, dispatchLog)
  })
}

function stop() {
  if (!isInitialized) {
    return
  }
  isInitialized = false
  ;['log', 'info', 'warn', 'error'].forEach(type => {
    console[type] = originalConsoleFunction[type]
  })
}

function addSubscriber(fn) {
  if (!fn || typeof fn !== 'function') {
    return
  }
  subscribers.push(fn)
}

function dispatchLog(log) {
  if (!subscribers.length) {
    return
  }
  subscribers.forEach(sub => {
    sub(log)
  })
}

function interceptLog(originalFn, callback) {
  return function() {
    let args = Array.prototype.slice.apply(arguments)
    callback && callback(args)
    return originalFn.apply(console, args)
  }
}

export default {
  init,
  stop,
  addSubscriber
}
