import classnames from 'classnames'
import React from 'react'

interface ButtonProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'danger'
}

const Button = ({ children, variant }: ButtonProps) => {
    const className = classnames({
        'btn-primary': variant === 'primary',
        'btn-secondary': variant === 'secondary',
        'btn-danger': variant === 'danger',
        'btn': true
    })
    return <button className={className}>{children}</button>
}

export default Button
