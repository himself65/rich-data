import type { ReactElement } from 'react'

// https://github.com/konradkalemba/tabler-icons-react MIT License
const IconChevronDown = 
({
  size = 24,
  color = 'currentColor',
  ...restProps
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-chevron-down'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      stroke={color}
      strokeWidth='2'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...restProps}
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <polyline points='6 9 12 15 18 9' />
    </svg>
  );
}

export type ExpandIconProps = {
  expand: boolean
}

export function ExpandIcon ({ expand }: ExpandIconProps): ReactElement {
  return (
    <IconChevronDown
      className="rich-data--viewer-icon interactive"
      transform={
        expand ? 'rotate(0)' : 'rotate(-90)'
      }/>
  )
}
