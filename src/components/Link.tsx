import React from 'react'

interface LinkProps {
    href: string
    children: React.ReactNode
}

const Link = ({ href, children }: LinkProps) => (
    <a className="text-yellow-500 hover:text-yellow-800 underline" href={href}>{children}</a>
)

export default Link