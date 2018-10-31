import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return(
        <div className="notFound">
            <h1 className="notFound-title">Oops! Page not found!</h1>

            <Link to="/" className="notFound-link">Go to homepage</Link>
        </div>
    )
}

export default NotFound;