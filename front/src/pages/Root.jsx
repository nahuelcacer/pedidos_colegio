import React from 'react'
import { Outlet } from 'react-router-dom'

const Root = () => {
    return (
        <div id="sidebar">
            <h1>Navegar</h1>
            <input placeholder='Search...'></input>
            <nav>
                <ul>
                    <li>
                        <a href={`/contacts/1`}>Your Name</a>
                    </li>
                    <li>
                        <a href={`/contacts/2`}>Your Friend</a>
                    </li>
                </ul>
            </nav>
            <div>
                <Outlet></Outlet>
            </div>

        </div>
    )
}

export default Root