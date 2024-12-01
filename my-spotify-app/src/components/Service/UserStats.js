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

    let isMounted = true; // Prevent setting state on unmounted component

    const fetchUserStats = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch Top Tracks
        const topTracksResponse = await fetch(
          'https://api.spotify.com/v1/me/top/tracks?limit=5',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!topTracksResponse.ok) {
          const errorDetails = await topTracksResponse.json();
          console.error('Error fetching top tracks:', errorDetails);
          throw new Error(`Failed to fetch top tracks: ${topTracksResponse.status}`);
        }

        const topTracksData = await topTracksResponse.json();
        if (isMounted) setTopTracks(topTracksData.items);

        // Fetch Top Artists
        const topArtistsResponse = await fetch(
          'https://api.spotify.com/v1/me/top/artists?limit=5',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!topArtistsResponse.ok) {
          const errorDetails = await topArtistsResponse.json();
          console.error('Error fetching top artists:', errorDetails);
          throw new Error(`Failed to fetch top artists: ${topArtistsResponse.status}`);
        }

        const topArtistsData = await topArtistsResponse.json();
        if (isMounted) setTopArtists(topArtistsData.items);
      } catch (err) {
        console.error('Fetch Error:', err);
        if (isMounted) setError(err.message || 'An unexpected error occurred');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUserStats();

    return () => {
      isMounted = false; // Cleanup flag
    };
  }, [accessToken]);

  if (loading) return <div>Loading...</div>;
  if (error) return (
    <div>
      <p>Error: {error}</p>
      {error.includes('401') && <p>Please log in again.</p>}
    </div>
  );

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
