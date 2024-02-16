import React, { useEffect, useState } from 'react';
import Matter from 'matter-js';
import Balloon from './Balloon';

const BalloonsSimulation = () => {
    const [engine, setEngine] = useState(null);
    const [render, setRender] = useState(null);
    const [runner, setRunner] = useState(null); // Add state for the runner
    const [balloons, setBalloons] = useState([]);

    useEffect(() => {
        // Initialize engine and renderer
        const newEngine = Matter.Engine.create();
        const newRender = Matter.Render.create({
            element: document.body,
            engine: newEngine,
            options: {
                wireframes: false,
                width: window.innerWidth,
                height: window.innerHeight,
            },
        });

        // Create and run the runner
        const newRunner = Matter.Runner.create(); // Create a runner
        Matter.Runner.run(newRunner, newEngine); // Start the runner

        setEngine(newEngine);
        setRender(newRender);
        setRunner(newRunner); // Save the runner to state

        // Create walls
        const walls = createWalls();
        Matter.World.add(newEngine.world, walls);

        // Run the renderer
        Matter.Render.run(newRender);

        return () => {
            Matter.Render.stop(newRender);
            newRender.canvas.remove();

            Matter.Runner.stop(newRunner); // Stop the runner
            Matter.Engine.clear(newEngine);
        };
    }, []);

    useEffect(() => {
        if (engine) {
            const updateBalloons = () => {
                setBalloons(balloons => balloons.map(balloon => {
                    const updatedBalloon = engine.world.bodies.find(b => b.id === balloon.id);
                    return updatedBalloon || balloon;
                }).filter(Boolean));
            };

            // Register event to update balloon positions
            Matter.Events.on(engine, 'afterUpdate', updateBalloons);

            return () => {
                if (engine) {
                    Matter.Events.off(engine, 'afterUpdate', updateBalloons);
                }
            };
        }
    }, [engine]);

    const shootBalloon = () => {
        if (!engine) return;

        const radius = 30;
        const positionX = window.innerWidth / 2;
        const positionY = window.innerHeight - 50;
        const balloon = Matter.Bodies.circle(positionX, positionY, radius, {
            restitution: 0.8,
            render: {
                fillStyle: `hsl(${Math.random() * 360}, 100%, 75%)`,
            },
        });

        Matter.Body.setVelocity(balloon, { x: (Math.random() - 0.5) * 10, y: -Math.random() * 10 - 5 });
        Matter.World.add(engine.world, balloon);

        setBalloons(balloons => [...balloons, balloon]);
    };

    return (
        <div>
            {balloons.map((balloon, index) => (
                <Balloon key={balloon.id} balloon={balloon} />
            ))}
            <button onClick={shootBalloon} style={{ position: 'absolute', bottom: 20, left: '50%' }}>Shoot Balloon</button>
        </div>
    );
};

// Walls creation function
const createWalls = () => {
    const wallOptions = { isStatic: true, render: { visible: false } };
    const thickness = 50;
    return [
        Matter.Bodies.rectangle(-thickness / 2, window.innerHeight / 2, thickness, window.innerHeight, wallOptions), // Left
        Matter.Bodies.rectangle(window.innerWidth + thickness / 2, window.innerHeight / 2, thickness, window.innerHeight, wallOptions), // Right
    ];
};

export default BalloonsSimulation;