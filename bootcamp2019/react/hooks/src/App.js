import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  // useState utilizado para alterar e criar estados
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  // useCallback utlizado para que o JS nao fique montando toda vez a mesma função,
  // sempre que alterar um valor dentro dela. Altera de function => const
  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    setNewTech('');
  }, [newTech, tech]);

  // useEffect sem nada no array de dependencias [] = ComponentDidMount
  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }

    // ComponenteDidMount *Geralmente para remover eventlistnner*
    // return () => {};
  }, []);

  // Utilizando uma função na qual so atualiza se mudar o valores no estado tech
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  // useMemo utilizado para realizar funções que executam dentro do return (retorna um único valor)
  const techSize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias</strong>
      <br />
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button onClick={handleAdd}>Adicionar</button>
    </>
  );
}

export default App;
