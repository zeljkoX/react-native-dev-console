/**
 * Display list of entries
 *
 * @flow
 */

import React from 'react'
import { Entry } from './'
import type { Log } from '../../ConsoleProvider'

type Props = {
  data: Log,
  key: any,
  isStatusMode: boolean
}

const Entries = ({ data, key, isStatusMode = false }: Props) => {
  if (isStatusMode && !data || !data.args || !data.args.length) {
    return <Entry emptyLine={true} key={key} isStatusMode={isStatusMode} />
  }
  return data.args.map((i, index) => {
    return <Entry data={i} key={index} isStatusMode={isStatusMode} />
  })
}

export default Entries
