import type { ReactElement } from 'react'
import * as React from 'react'
import { cloneElement } from 'react'

import type { BlockFlavourMap } from '../vanilla'

export type MetadataProps = {
  flavour: keyof BlockFlavourMap
  children: ReactElement
}

export const Metadata = React.memo<MetadataProps>(
  function Metadata (props) {
    if (!props.children) {
      return null
    }
    return cloneElement(props.children, {
      'data-flavour': props.flavour
    })
  }
)

Metadata.displayName = 'Metadata'
