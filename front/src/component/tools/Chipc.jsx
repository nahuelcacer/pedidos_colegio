import React from 'react'

const Chipc = ({children, className} ) => {
    return (
        <div>
            {className}
            <p>
                {children}
            </p>
        </div>
    )
}

export default Chipc