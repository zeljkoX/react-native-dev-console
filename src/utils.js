/**
 * @fow
 */

// check if object is from babel plugin
export function isBabelPluginFileData(item: any): boolean {
  if (!item || !typeof item === 'object' || !item.id || item.id !== 'babel-plugin-dev-console') {
    return false
  }
  return true
}

// check if console invocation is React Native warning
export function isRNWarningLog(log: Object): boolean {
  if (!log || !log.length) {
    return false
  }
  if (typeof log[0] === 'string' && log[0].startsWith('Warning: ')) {
    return true
  }
  return false
}
