import { Plugin, useBlankViewer } from '@rich-data/viewer'

declare module '@rich-data/viewer' {
  interface FlavourRegistry {
    number: number
  }
}

const plugins = [
  {
    register (context) {
      context.addDataTypeRenderer({
        flavour: 'number',
        is: value => typeof value === 'number',
        Component: ({ value }) => <span> this is number {value}</span>
      })

      return () => {
        context.removeDataTypeRenderer('number')
      }
    }
  }
] satisfies Plugin[]

export function Basic () {
  const { Viewer } = useBlankViewer({
    plugins
  })
  return (
    <Viewer value={1}/>
  )
}
