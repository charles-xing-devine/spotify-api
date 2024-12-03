import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./UserStats.css"; // Import custom CSS

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
        const profileResponse = await fetch("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const profileData = await profileResponse.json();

        const tracksResponse = await fetch(
          "https://api.spotify.com/v1/me/top/tracks?limit=5",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const tracksData = await tracksResponse.json();

        const artistsResponse = await fetch(
          "https://api.spotify.com/v1/me/top/artists?limit=5",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const artistsData = await artistsResponse.json();

        const playlistsResponse = await fetch(
          "https://api.spotify.com/v1/me/playlists?limit=5",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const playlistsData = await playlistsResponse.json();

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
          <div className="card shadow-sm p-3 mb-4 text-center">
            <h5 className="text-center">Your Profile</h5>
            {userProfile && (
              <div className="profile-container">
                <img
                  src={userProfile.images?.[0]?.url || "/placeholder-image.png"}
                  alt={userProfile.display_name}
                  className="rounded-circle hover-card"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
                <h6 className="fw-bold mt-3">{userProfile.display_name}</h6>
                <p className="text-muted mb-1">{userProfile.email}</p>
                <p className="text-muted">{userProfile.followers.total} Followers</p>
              </div>
            )}
          </div>
        </div>


        {/* Top Tracks */}
        <div className="col-md-8">
          <div className="card shadow-sm p-3 mb-4">
            <h5 className="text-center">Your Top Tracks</h5>
            <ul className="list-unstyled">
              {topTracks.map((track) => (
                <a
                  key={track.id}
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center mb-3 hover-card text-decoration-none text-dark"
                >
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
                </a>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Top Artists and Playlists */}
      <div className="row">
        {/* Top Artists */}
        <div className="col-md-6">
          <div className="card shadow-sm p-3 mb-4">
            <h5 className="text-center">Your Top Artists</h5>
            <ul className="list-unstyled">
              {topArtists.map((artist) => (
                <a
                  key={artist.id}
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center mb-3 hover-card text-decoration-none text-dark"
                >
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
                </a>
              ))}
            </ul>
          </div>
        </div>

        {/* User Playlists */}
        <div className="col-md-6">
          <div className="card shadow-sm p-3 mb-4">
            <h5 className="text-center">Your Main Playlists</h5>
            <ul className="list-unstyled">
              {playlists.map((playlist) => (
                <a
                  key={playlist.id}
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center mb-3 hover-card text-decoration-none text-dark"
                >
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
                </a>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
