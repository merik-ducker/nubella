import React, { useEffect, useState } from 'react';
import Matter from 'matter-js';
import Balloon from './Balloon';

const BalloonsSimulation = () => {
    const [balloons, setBalloons] = useState([]);

    // Modular function to create walls
    const createWalls = () => {
        const wallOptions = { isStatic: true, render: { visible: false } };
        const thickness = 50;
        return [
            Matter.Bodies.rectangle(-thickness / 2, window.innerHeight / 2, thickness, window.innerHeight, wallOptions), // Left
            Matter.Bodies.rectangle(window.innerWidth + thickness / 2, window.innerHeight / 2, thickness, window.innerHeight, wallOptions), // Right
        ];
    };

    // Dynamically create balloons based on viewport size
    const createBalloons = (numberOfBalloons) => {
        const tempBalloons = [];
        for (let i = 0; i < numberOfBalloons; i++) {
            const radius = 30;
            const balloon = Matter.Bodies.circle(Math.random() * window.innerWidth, window.innerHeight + radius, radius, {
                restitution: 0.8,
                render: {
                    fillStyle: `hsl(${Math.random() * 360}, 100%, 75%)`,
                },
            });
            tempBalloons.push(balloon);
        }
        return tempBalloons;
    };
  

    useEffect(() => {
        const engine = Matter.Engine.create({
            render: {
                options: {
                    showVelocity: true
                }
            }
        });
        const world = engine.world;
        engine.gravity.y = -0.1; // Make balloons rise

        // Adding walls to the world
        const walls = createWalls();
        Matter.World.add(world, walls);

        // Adjust number of balloons based on viewport size
        const viewportWidth = window.innerWidth;
        const numberOfBalloons = Math.round(viewportWidth / 10);

        // Creating and adding balloons to the world
        const tempBalloons = createBalloons(numberOfBalloons);
        Matter.World.add(world, tempBalloons);

        Matter.Events.on(engine, 'afterUpdate', () => {
            setBalloons([...tempBalloons]);
        });

        Matter.Engine.run(engine);

        return () => {
            Matter.Engine.clear(engine);
        };
    }, []);

    return (
        <div>
            {balloons.map((balloon, index) => (
                <Balloon key={index} balloon={balloon} />
            ))}
        </div>
    );
};

export default BalloonsSimulation;
