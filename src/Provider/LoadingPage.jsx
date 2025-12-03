import React from 'react';

const LoadingPage = ({loading}) => {
    
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <span className="loading loading-bars loading-xl"></span>
        </div>
    );
};

export default LoadingPage;