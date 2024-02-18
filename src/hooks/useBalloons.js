import { useState, useEffect } from 'react';
import Matter from 'matter-js';

const useBalloons = (engine) => {
    const [balloons, setBalloons] = useState([]);

    useEffect(() => {
      const updateBalloons = () => {
          setBalloons((currentBalloons) =>
              currentBalloons
                  .map((balloon) => engine.world.bodies.find((b) => b.id === balloon.id) || balloon)
                  .filter(Boolean) // Keep balloons that were found in the physics engine
                  .filter((balloon) => {
                      // Check if the balloon is out of view, considering the viewport height
                      const isInView = balloon.position.y < window.innerHeight;
                      if (!isInView) {
                          // If out of view, find and remove the corresponding DOM element
                          const balloonElement = document.querySelector(`[data-balloon-id="${balloon.id}"]`);
                          if (balloonElement) balloonElement.remove();
                      }
                      return isInView;
                  })
          );
      };
  
      Matter.Events.on(engine, 'afterUpdate', updateBalloons);
  
      return () => {
          Matter.Events.off(engine, 'afterUpdate', updateBalloons);
      };
  }, [engine]);
  

    const shootBalloon = () => {
        // Balloon creation is done here
        const radius = 30;
        const positionX = window.innerWidth / 2;
        const positionY = window.innerHeight - 50;
        const balloon = Matter.Bodies.circle(positionX, positionY, radius, {
            restitution: 0.8,
            render: {
                fillStyle: `hsl(${Math.random() * 360}, 100%, 75%)`,
            },
        });

        Matter.Body.setVelocity(balloon, { x: (Math.random() - 0.5) * 10, y: -Math.random() * 30 - 5 });
        Matter.World.add(engine.world, balloon);

        setBalloons((balloons) => [...balloons, balloon]);
    };

    return { balloons, shootBalloon };
};

export default useBalloons;
