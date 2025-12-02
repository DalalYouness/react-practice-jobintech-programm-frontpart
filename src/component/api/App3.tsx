import React, { useEffect, useState } from "react";

// je dois le refaire
const App3 = () => {
  const [vitesse, setVitesse] = useState(1000);
  const [cpt, setCpt] = useState(1);
  useEffect(() => {
    const id = setInterval(() => {
      setCpt((x) => x + 1);
    }, vitesse);
    return () => {
      clearInterval(id);
    };
  }, [vitesse]);
  return (
    <div>
      {cpt}
      <br />
      <button onClick={() => setVitesse((x) => x + 1000)}>Ralentir</button>
      <button onClick={() => setVitesse((x) => x - 1000)}>Accelerer</button>
    </div>
  );
};

export default App3;
