import { ArrowRight } from './Icons'

/**
 * variant "primary"   solid ink, inverts on hover
 * variant "secondary" outlined
 * variant "ghost"     quiet outline, used in the header
 * Renders an <a> when `href` is given, otherwise a <button>.
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  arrow = true,
  className = '',
  children,
  ...rest
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim()
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="btn__icon" width={18} height={18} />}
    </>
  )

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button className={classes} type="button" {...rest}>
      {content}
    </button>
  )
}
