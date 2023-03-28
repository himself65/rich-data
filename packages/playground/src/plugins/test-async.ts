import type { Middleware } from '@rich-data/viewer'

type MyAsyncPluginMiddleware<C, A> = {
  pong: () => void

}
declare module '@rich-data/viewer' {
  interface ContextMutators<C, A> {
    'my-async-plugin': MyAsyncPluginMiddleware<C, A>
  }
}

export const TestAsyncPlugin: Promise<Middleware<'my-async-plugin'>> = (async () => {
  return new Promise(
    resolve => setTimeout(() => {
      resolve({
        id: 'my-async-plugin',
        effect: () => () => void 0,
        middleware: (_store) => {
          return {
            pong: () => {
              console.log('pong')
            }
          }
        }
      })
    }, 1000)
  )
})()
