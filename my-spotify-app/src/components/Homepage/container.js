import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function UserStats({ accessToken }) {
  const [userProfile, setUserProfile] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [topGenres, setTopGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) {
      setError("No access token provided.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch user profile
        const profileResponse = await fetch("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const profileData = await profileResponse.json();

        // Fetch top tracks
        const tracksResponse = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const tracksData = await tracksResponse.json();

        // Fetch top artists
        const artistsResponse = await fetch("https://api.spotify.com/v1/me/top/artists?limit=5", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const artistsData = await artistsResponse.json();

        // Fetch user's playlists
        const playlistsResponse = await fetch("https://api.spotify.com/v1/me/playlists?limit=5", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const playlistsData = await playlistsResponse.json();

        // Aggregate top genres from artists
        const genres = {};
        artistsData.items.forEach((artist) => {
          artist.genres.forEach((genre) => {
            genres[genre] = (genres[genre] || 0) + 1;
          });
        });
        const sortedGenres = Object.entries(genres)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([genre]) => genre);

        // Set state with fetched data
        setUserProfile(profileData);
        setTopTracks(tracksData.items || []);
        setTopArtists(artistsData.items || []);
        setPlaylists(playlistsData.items || []);
        setTopGenres(sortedGenres);
        setError(null);
      } catch (err) {
        setError("Failed to fetch data. Please check your token or permissions.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4">Your Spotify Stats</h3>
      <div className="row">
        {/* User Profile */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3 mb-4">
            <h5 className="text-center">Your Profile</h5>
            {userProfile && (
              <div className="text-center">
                <img
                  src={userProfile.images?.[0]?.url || "/placeholder-image.png"}
                  alt={userProfile.display_name}
                  className="rounded-circle mb-3"
                  style={{ width: "100px", height: "100px" }}
                />
                <h6 className="fw-bold">{userProfile.display_name}</h6>
                <p>{userProfile.email}</p>
                <p>{userProfile.followers.total} Followers</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Tracks */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3 mb-4">
            <h5 className="text-center">Your Top Tracks</h5>
            <ul className="list-unstyled">
              {topTracks.map((track) => (
                <li key={track.id} className="d-flex align-items-center mb-3">
                  <img
                    src={track.album.images[0]?.url || "/placeholder-image.png"}
                    alt={track.name}
                    className="me-3 rounded"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div>
                    <p className="mb-1 fw-bold">{track.name}</p>
                    <p className="mb-0 text-muted">by {track.artists[0].name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Top Artists */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3 mb-4">
            <h5 className="text-center">Top Artists</h5>
            <ul className="list-unstyled">
              {topArtists.map((artist) => (
                <li key={artist.id} className="d-flex align-items-center mb-3">
                  <img
                    src={artist.images[0]?.url || "/placeholder-image.png"}
                    alt={artist.name}
                    className="me-3 rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div>
                    <p className="mb-1 fw-bold">{artist.name}</p>
                    <p className="mb-0 text-muted">{artist.genres.slice(0, 2).join(", ")}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Interesting Stats */}
      <div className="row">
        {/* User's Playlists */}
        <div className="col-md-6">
          <div className="card shadow-sm p-3 mb-4">
            <h5 className="text-center">Your Main Playlists</h5>
            <ul className="list-unstyled">
              {playlists.map((playlist) => (
                <li key={playlist.id} className="d-flex align-items-center mb-3">
                  <img
                    src={playlist.images[0]?.url || "/placeholder-image.png"}
                    alt={playlist.name}
                    className="me-3 rounded"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div>
                    <p className="mb-1 fw-bold">{playlist.name}</p>
                    <p className="mb-0 text-muted">{playlist.tracks.total} Tracks</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Top Genres */}
        <div className="col-md-6">
          <div className="card shadow-sm p-3 mb-4">
            <h5 className="text-center">Your Top Genres</h5>
            <ul className="list-unstyled">
              {topGenres.map((genre, index) => (
                <li key={index} className="d-flex align-items-center mb-3">
                  <div>
                    <p className="mb-1 fw-bold">{genre}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
