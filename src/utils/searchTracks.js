import { getAccessToken } from './spotify';

export async function searchTracks(query) {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error al buscar canciones: ${response.status}`);
    }

    const data = await response.json();
    return data.tracks.items;
  } catch (error) {
    console.error('Error en searchTracks:', error.message);
    return null;
  }
}

