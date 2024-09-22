import { useEffect, useState } from 'react';

export function App() {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<any[]>([]);

  const launchGame = (gameId: string) => {
    window.electron.launchGame(gameId);
  };

  useEffect(() => {
    window.electron.getGames().then((games) => {
      setGames(games);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>Game center</h1>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {games.map((game) => {
              return (
                <div key={game.id}>
                  <img src={game.screenshot} alt={game.title} />
                  <h2>{game.title}</h2>
                  <p>{game.version}</p>
                  <button onClick={() => launchGame(game.id)}>
                    Launch Game
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
