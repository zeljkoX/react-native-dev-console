module.exports = function(babel) {
  const { types: t } = babel

  return {
    name: 'react-native-dev-console',
    visitor: {
      CallExpression(path, state) {
        if (
          !looksLike(path, {
            node: {
              callee: {
                type: 'MemberExpression' || 'BlockStatement',
                object: {
                  name: 'console'
                }
              }
            }
          })
        ) {
          return
        }
        if (isAlreadyApplied(path.node.arguments)) {
          return
        }
        const startLine = path.node.loc.start.line
        const filename = state.file.opts.filename
        const logType = path.node.callee.property.name
        path.node.arguments.push(
          t.objectExpression([
            t.objectProperty(t.identifier('id'), t.stringLiteral('babel-plugin-dev-console')),
            t.objectProperty(
              t.identifier('msg'),
              t.stringLiteral('111 If you are seeing this message babel plugin "react-native-dev-console" is activated')
            ),
            t.objectProperty(t.identifier('filename'), t.stringLiteral(filename)),
            t.objectProperty(t.identifier('line'), t.stringLiteral(`${startLine}`)),
            t.objectProperty(t.identifier('type'), t.stringLiteral(`${logType}`))
          ])
        )
      }
    }
  }
}

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey]
      const aVal = a[bKey]
      if (typeof bVal === 'function') {
        return bVal(aVal)
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal)
    })
  )
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val)
}

function isAlreadyApplied(allArguments) {
  let isApplied = false
  try {
    const lastArgument = allArguments[allArguments.length - 1]
    if (
      lastArgument.type === 'ObjectExpression' &&
      lastArgument.properties[0].key.name === 'id' &&
      lastArgument.properties[0].value.value === 'babel-plugin-dev-console'
    ) {
      isApplied = true
    }
  } catch (e) {
    isApplied = false
  }
  return isApplied
}
