import React from 'react'

export const NoSsr: React.FC<React.PropsWithChildren> = (props) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <>{props.children}</>
}
