const Balloon = ({ balloon }) => {
  return (
      <div
          style={{
              position: 'absolute',
              top: balloon.position.y - balloon.circleRadius,
              left: balloon.position.x - balloon.circleRadius,
              width: balloon.circleRadius * 2,
              height: balloon.circleRadius * 2,
              borderRadius: '50%',
              backgroundColor: balloon.render.fillStyle,
          }}
      />
  );
};

export default Balloon;
