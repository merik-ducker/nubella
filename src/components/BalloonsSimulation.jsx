import React from 'react';
import useMatterEngine from '../hooks/useMatterEngine';
import useBalloons from '../hooks/useBalloons';
import Balloon from './Balloon';

const BalloonsSimulation = () => {
    const { engine, renderRef } = useMatterEngine();
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
            <button onClick={() => shootBalloons(100)} style={{ position: 'absolute', bottom: 20, left: '50%' }}>
                Shoot Balloons
            </button>
        </div>
    );
};

export default BalloonsSimulation;
