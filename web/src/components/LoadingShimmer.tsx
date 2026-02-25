import React from 'react'

export const LoadingShimmer: React.FC = () =>
{
    return (
        <div className="loader-container">
            <div className="shimmer-bar"></div>
            <div className="shimmer-bar" style={{ width: '150px', opacity: 0.6 }}></div>
            <div className="shimmer-bar" style={{ width: '100px', opacity: 0.4 }}></div>
        </div>
    )
}
