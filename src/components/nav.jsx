import React from 'react';

const NavBar = () => {
    return (
        <nav
            className="pb-2"
            style={{ "--bs-breadcrumb-divider": ">" }}
            aria-label="breadcrumb"
        >
            <ol className="breadcrumb">
                <li className="breadcrumb-item">Home {`>`}</li>
                <li className="breadcrumb-item">Administration {`>`}</li>
                <li className="breadcrumb-item text-primary" aria-current="page">
                    Logger Search
                </li>
            </ol>
        </nav>
    )
}

export default NavBar;
