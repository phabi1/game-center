import { useEffect, useState } from 'react';

export function App() {
  const [games, setGames] = useState<any[]>([]);

  const launchGame = (gameId: string) => {
    window.electron.launchGame(gameId);
  };

  useEffect(() => {
    window.electron.getGames().then((games) => {
      console.log(games);
      setGames(games);
    });
  }, []);

  return (
    <div>
      {games.map((game) => (
        <div key={game.id}>
          <img src={game.screenshot} alt={game.title} />
          <h2>{game.title}</h2>
          <p>{game.version}</p>
          <button onClick={() => launchGame(game.id)}>Launch Game</button>
        </div>
      ))}
    </div>
  );
}

export default App;
