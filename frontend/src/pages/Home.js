import React from 'react';
import PopularBooks from '../components/PopularBooks';

function Home() {
    return (
        <div>
            <h1>Welcome to the Library Management System</h1>
            <p>This is the home page.</p>
            <PopularBooks />  {/* Display Popular Books */}
        </div>
    );
}

export default Home;