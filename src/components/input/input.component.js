import { useId, forwardRef } from "react"
import PropTypes from 'prop-types'
import './input.style.css'

/**
 * Custom input component
 *
 * @component
 * @example
 * const className = 'custom-input-selector'
 * const value = ''
 * const ref = useRef()
 * return (
 *   <Input className={className} value={value} ref={ref} />
 * )
 */
export const Input = forwardRef(({ label, LabelProps, InputWrapProps, ...rest }, ref) => {
  const id = useId()
  return <div className={"input-wrap " + (InputWrapProps?.className || '')} {...InputWrapProps}>
    { label && <label htmlFor={`input-${id}`} {...LabelProps}>{label}</label>}
    <input ref={ref} type="text" id={`input-${id}`} {...rest} />
  </div>
})

Input.propTypes = {
  label: PropTypes.string,
  LabelProps: PropTypes.object,
  InputWrapProps: PropTypes.object
}