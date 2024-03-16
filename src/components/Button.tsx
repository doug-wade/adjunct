import classnames from 'classnames'
import React from 'react'

const Button = ({ children, variant }) => {
    const className = classnames({
        'btn-primary': variant === 'primary',
        'btn-secondary': variant === 'secondary',
        'btn-danger': variant === 'danger',
        'btn': true
    })
    return <button className={className}>{children}</button>
}

export default Button
