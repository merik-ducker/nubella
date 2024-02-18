import { useState, useEffect, useRef } from 'react';
import Matter from 'matter-js';

const useMatterEngine = (timeScale = 1) => { // Default timeScale to 1 if not provided
    const [engine] = useState(() => Matter.Engine.create({
        // Customizing the engine's timing to include a time scale
        timing: {
            timeScale: timeScale
        }
    }));
    const renderRef = useRef(null);

    useEffect(() => {
        const render = Matter.Render.create({
            element: renderRef.current,
            engine: engine,
            options: {
                wireframes: false,
                width: window.innerWidth,
                height: window.innerHeight + 300,
            },
        });
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);
        Matter.Render.run(render);

        // Walls are created here directly
        const walls = [
            Matter.Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true }), // Left wall
            Matter.Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true }), // Right wall
        ];
        Matter.World.add(engine.world, walls);

        return () => {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            Matter.Engine.clear(engine);
            render.canvas.remove();
        };
    }, [engine]);

    return { engine, renderRef };
};

export default useMatterEngine;
