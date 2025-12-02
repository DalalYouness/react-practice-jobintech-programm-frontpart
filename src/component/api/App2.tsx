import React, { useEffect, useState } from "react";

const App2 = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    addEventListener("mousemove", function (evt) {
      setX(evt.x);
      setY(evt.y);
    });
  }, []);

  return (
    <div>
      x={x} , y={y}
    </div>
  );
};

export default App2;
