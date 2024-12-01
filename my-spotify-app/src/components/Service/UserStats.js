import React, { useState, useEffect } from 'react';

const UserStats = ({ accessToken }) => {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) {
      setError('No access token provided.');
      return;
    }

    const fetchUserStats = async () => {
      try {
        const tracksResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const artistsResponse = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const tracksData = await tracksResponse.json();
        const artistsData = await artistsResponse.json();

        setTopTracks(tracksData.items);
        setTopArtists(artistsData.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [accessToken]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="stats-container">
      <div>
        <h2 className="stats-title">Your Top Tracks</h2>
        <ul className="stats-list">
          {topTracks.map((track) => (
            <li key={track.id} className="stats-list-item">
              {track.name} by {track.artists[0].name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="stats-title">Your Top Artists</h2>
        <ul className="stats-list">
          {topArtists.map((artist) => (
            <li key={artist.id} className="stats-list-item">
              {artist.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserStats;
