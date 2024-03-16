import React from "react"

const Link = ({ href, children }) => (
    <a className="text-yellow-500 hover:text-yellow-800 underline" href={href}>{children}</a>
)

export default Link