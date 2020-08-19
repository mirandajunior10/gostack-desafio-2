import React, { useState, useEffect } from 'react';
import api from './services/api';
import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    try {
      const response = await api.post('/repositories', {
        url: 'https://github.com/Rocketseat/umbriel',
        title: 'Desafio ReactJS',
        techs: ['Node', 'Express', 'TypeScript'],
      });
      setRepositories([...repositories, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      let index = repositories.findIndex((repository) => repository.id === id);

      if (index >= 0) {
        const newRepos = [...repositories];
        newRepos.splice(index, 1);

        setRepositories(newRepos);
      } else throw new Error('Could not find repository');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
