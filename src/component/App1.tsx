import React, { useState, useEffect } from "react";

const App1 = () => {
  const [nom, setNom] = useState("ahmed");
  const [cpt, setCpt] = useState(0);

  const handleChangeName = () => {
    setNom("ali");
    console.log(nom); // rah ytb3tli l9ima l9dima 7it setNom hiya async khassni nst3ml useEffect bch n9ra l9ima jdida
  };

  useEffect(() => {
    console.log("use effect called");

    return () => {
      console.log("return from use effect");
      //cette fonction sera appelée lors du démontage du composant
      // et aussi avant chaque exécution de l'effet si les dépendances changent
    };
  }, [cpt]);

  {
    /* rah setNom wast man render katay7na f boocle infinie */
  }
  return (
    <div>
      {console.log(nom)}
      <button onClick={handleChangeName}>Change Name</button>
      <button onClick={() => setCpt((prevSpt) => prevSpt + 1)}>+</button>
    </div>
  );
};

export default App1;
