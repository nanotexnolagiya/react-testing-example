import { useId, forwardRef } from "react"
import PropTypes from 'prop-types'
import './textarea.style.css'

/**
 * Custom textarea component
 *
 * @component
 * @example
 * const className = 'custom-textarea-selector'
 * const value = ''
 * const ref = useRef()
 * return (
 *   <Textarea className={className} value={value} ref={ref} />
 * )
 */
export const Textarea = forwardRef(({ label, LabelProps, InputWrapProps: TextareaWrapProps, ...rest }, ref) => {
  const id = useId()
  return <div className={"textarea-wrap " + (TextareaWrapProps?.className || '')} {...TextareaWrapProps}>
    { label && <label htmlFor={`textarea-${id}`} {...LabelProps}>{label}</label>}
    <textarea ref={ref} id={`textarea-${id}`} {...rest} />
  </div>
})

Textarea.propTypes = {
  label: PropTypes.string,
  LabelProps: PropTypes.object,
  InputWrapProps: PropTypes.object
}