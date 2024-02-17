import React from 'react';
import useMatterEngine from '../hooks/useMatterEngine';
import useBalloons from '../hooks/useBalloons';
import Balloon from './Balloon';

const BalloonsSimulation = () => {
    const { engine, renderRef } = useMatterEngine();
    const { balloons, shootBalloon } = useBalloons(engine);

    return (
        <div ref={renderRef}>
            {balloons.map((balloon) => (
                <Balloon key={balloon.id} balloon={balloon} />
            ))}
            <button onClick={shootBalloon} style={{ position: 'absolute', bottom: 20, left: '50%' }}>
                Shoot Balloon
            </button>
        </div>
    );
};

export default BalloonsSimulation;
