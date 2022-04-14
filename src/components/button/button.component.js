import './button.style.css'

/**
 * Custom button component
 *
 * @component
 * @example
 * const className = 'custom-button-selector'
 * const disabled = false
 * return (
 *   <Button className={className} disabled={disabled} />
 * )
 */
export const Button = ({ className, ...props }) => {
  return <button data-testid="custom-button" className={'form-button ' + (className || '')} {...props} />
}