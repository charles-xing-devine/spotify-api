import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function ImageContainer({ accessToken }) {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) {
      setError("No access token provided.");
      setLoading(false);
      return;
    }

    const fetchUserStats = async () => {
      try {
        const tracksResponse = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const tracksData = await tracksResponse.json();

        const artistsResponse = await fetch("https://api.spotify.com/v1/me/top/artists?limit=5", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const artistsData = await artistsResponse.json();

        if (tracksData.items && artistsData.items) {
          setTopTracks(tracksData.items);
          setTopArtists(artistsData.items);
          setError(null);
        } else {
          throw new Error("Invalid data format received from Spotify API.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [accessToken]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4">Spotify Highlights</h3>
      <div className="row">
        {/* Top Tracks */}
        <div className="col-md-6">
          <div className="card shadow-sm p-3 mb-4">
            <h5 className="text-center">Top Tracks</h5>
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
        <div className="col-md-6">
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
    </div>
  );
}
