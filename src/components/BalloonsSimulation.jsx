import React from 'react';
import useMatterEngine from '../hooks/useMatterEngine';
import useBalloons from '../hooks/useBalloons';
import Balloon from './Balloon';

const BalloonsSimulation = () => {
    const { engine, renderRef } = useMatterEngine(1);
    const { balloons, shootBalloon } = useBalloons(engine);

    const shootBalloons = (nBalloons) => {
        for (let i = 0; i < nBalloons; i++) {
            shootBalloon();
        }
    };

    return (
        <div ref={renderRef}>
            {balloons.map((balloon) => (
                <Balloon key={balloon.id} balloon={balloon} />
            ))}
            <button
                onClick={() => shootBalloons(50)}
                style={{
                    position: 'absolute',
                    bottom: 20,
                    left: '50%',
                    transform: 'translateX(-50%)', // Add this line
                }}
            >
                Shoot Balloons
            </button>

        </div>
    );
};

export default BalloonsSimulation;
