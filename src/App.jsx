import './App.css';
import SearchBar from './components/SearchBar';
import SongDetails from './components/SongDetails';

function App() {
  return (
    <div className="app-container">
      <h1>🎵 AndresTunes</h1>
      <SearchBar />
      <SongDetails />
      <footer>
        <p>© 2025 Andrés Suárez</p>
        <a href="https://github.com/andrezoficial" target="_blank">GitHub</a> | 
        <a href="https://www.linkedin.com/in/andres1997rez" target="_blank">LinkedIn</a>
      </footer>
    </div>
  );
}

export default App;
import { useState } from 'react';
import { searchTracks } from './utils/spotify';

function App() {
  const [tracks, setTracks] = useState([]);

  const handleSearch = async () => {
    const results = await searchTracks('shakira');
    setTracks(results);
  };

  return (
    <div>
      <button onClick={handleSearch}>Buscar Shakira</button>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            {track.name} - {track.artists[0].name}
            <audio controls src={track.preview_url}></audio>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import SearchBar from './components/SearchBar';

function App() {
  return (
    <div>
      <h1>🎵 AndresTunes</h1>
      <SearchBar />
    </div>
  );
}

export default App;

