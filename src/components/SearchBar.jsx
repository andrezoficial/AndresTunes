import { useState } from 'react';
import { searchTracks } from '../utils/searchTracks';
import { getLyrics } from '../utils/lyrics';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(null);
  const [lyrics, setLyrics] = useState('');
  const [selectedTrack, setSelectedTrack] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const results = await searchTracks(query);
    setTracks(results || []);
    setLoading(false);
    setPlaying(null);
    setLyrics('');
    setSelectedTrack(null);
  };

  const handlePlay = (previewUrl) => {
    if (playing) {
      playing.pause();
      setPlaying(null);
    }

    if (previewUrl) {
      const audio = new Audio(previewUrl);
      audio.play();
      setPlaying(audio);
    }
  };

  const handleLyrics = async (artist, title) => {
    const letra = await getLyrics(artist, title);
    setLyrics(letra);
    setSelectedTrack(`${title} - ${artist}`);
  };

  return (
    <div className="search-bar">
      <h2>🔍 Busca tu canción</h2>
      <input
        type="text"
        placeholder="Ej: Coldplay, Shakira..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {loading && <p>Cargando resultados...</p>}

      {tracks.length > 0 && (
        <div className="results">
          {tracks.map((track) => (
            <div key={track.id} className="track-card">
              <img src={track.album.images[0]?.url} alt={track.name} />
              <div>
                <strong>{track.name}</strong><br />
                <em>{track.artists.map((a) => a.name).join(', ')}</em>
              </div>
              <div className="buttons">
                {track.preview_url ? (
                  <button onClick={() => handlePlay(track.preview_url)}>▶ Preview</button>
                ) : (
                  <span>Sin preview</span>
                )}
                <button onClick={() =>
                  handleLyrics(track.artists[0].name, track.name)
                }>
                  📄 Letra
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {lyrics && (
        <div className="lyrics">
          <h3>Letra: {selectedTrack}</h3>
          <pre>{lyrics}</pre>
        </div>
      )}
    </div>
  );
}

export default SearchBar;

