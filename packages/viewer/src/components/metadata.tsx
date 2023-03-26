import * as React from 'react'

import type { FlavourRegistry } from '../vanilla'

export type MetadataProps = {
  flavour: keyof FlavourRegistry
}

export const Metadata = React.memo<React.PropsWithChildren<MetadataProps>>(
  function Metadata (props) {
    return (
      <div data-flavour={props.flavour}>{props.children}</div>
    )
  }
)
