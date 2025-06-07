export async function getLyrics(artist, title) {
  try {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const data = await response.json();
    return data.lyrics || 'Letra no encontrada.';
  } catch (error) {
    return 'Error al obtener la letra.';
  }
}
