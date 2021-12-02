import React from 'react';
import { Link } from 'react-router-dom';


export default function() {
    return(
        <div>
            <h2>Oops, we couldn't find that page :(</h2>
            <Link to="/">Return Home?</Link>
        </div>
    )
}