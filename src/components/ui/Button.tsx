import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  fullWidth?: boolean
  children: ReactNode
}

const variants: Record<Variant, string> = {
  primary:
    'bg-clay-500 text-white hover:bg-clay-600 active:scale-[0.96] shadow-sm',
  secondary:
    'border-2 border-clay-500 text-clay-500 bg-transparent hover:bg-clay-500/5 active:scale-[0.96]',
  ghost: 'text-text-muted hover:text-text-primary bg-transparent',
  danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-[0.96]',
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={[
        'inline-flex h-[52px] items-center justify-center rounded-pill px-6',
        'text-[15px] font-semibold transition-all duration-150 ease-out',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
