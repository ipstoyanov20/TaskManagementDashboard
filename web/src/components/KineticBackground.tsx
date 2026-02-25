import React from 'react';

export const KineticBackground: React.FC = () =>
{
    return (
        <div className="kinetic-bg">
            <div className="kinetic-text">
                TASK FLOW DASHBOARD SYSTEM ELITE PERFORMANCE 2026
            </div>
            <div className="kinetic-text" style={{ animationDirection: 'reverse', animationDelay: '-5s' }}>
                ORGANIZE PRIORITIZE EXECUTE REPEAT MINIMALIST UTILITY
            </div>
            <div className="kinetic-text" style={{ animationDelay: '-10s' }}>
                DYNAMIC INTERFACE SCALABLE ARCHITECTURE HYBRID STATE
            </div>
            <div className="kinetic-text" style={{ animationDirection: 'reverse', animationDelay: '-15s' }}>
                THE FUTURE OF PRODUCTIVITY IS HERE FLOW STATE ACTIVE
            </div>
        </div>
    );
};
