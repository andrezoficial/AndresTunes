import './App.css';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import SongDetails from './components/SongDetails';
import { searchTracks } from './utils/spotify';

function App() {
  const [tracks, setTracks] = useState([]);

  const handleSearch = async () => {
    const results = await searchTracks('shakira');
    setTracks(results);
  };

  return (
    <div>
      <h1>🎵 AndresTunes</h1>
      <SearchBar />
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

