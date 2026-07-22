import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  size?: 'sm' | 'md'
}

export function IconButton({
  children,
  size = 'md',
  className = '',
  ...props
}: IconButtonProps) {
  const sizeClass = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11'
  return (
    <button
      type="button"
      className={[
        'inline-flex items-center justify-center rounded-full',
        'bg-white/90 text-forest-700 shadow-card backdrop-blur-sm',
        'transition-all duration-150 hover:bg-white active:scale-95',
        sizeClass,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
