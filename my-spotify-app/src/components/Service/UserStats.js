import React, { useState, useEffect } from 'react';

const UserStats = ({ accessToken }) => {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user stats (top tracks & top artists)
  useEffect(() => {
    if (!accessToken) {
      setError('No access token provided.');
      return;
    }

    const fetchUserStats = async () => {
      setLoading(true);
      setError(null);
      
      // Fetch Top Tracks
      const topTracksResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!topTracksResponse.ok) {
        setError('Failed to fetch top tracks');
        setLoading(false);
        return;
      }

      const topTracksData = await topTracksResponse.json();
      setTopTracks(topTracksData.items);

      // Fetch Top Artists
      const topArtistsResponse = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!topArtistsResponse.ok) {
        setError('Failed to fetch top artists');
        setLoading(false);
        return;
      }

      const topArtistsData = await topArtistsResponse.json();
      setTopArtists(topArtistsData.items);

      setLoading(false);
    };

    fetchUserStats();
  }, [accessToken]);

  // Render loading state or error
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Your Top Tracks</h2>
      <ul>
        {topTracks.map((track) => (
          <li key={track.id}>
            {track.name} by {track.artists[0].name}
          </li>
        ))}
      </ul>

      <h2>Your Top Artists</h2>
      <ul>
        {topArtists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserStats;
