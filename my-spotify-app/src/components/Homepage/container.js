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
      setLoading(false); // Stop loading if no token
      return;
    }

    console.log("Access Token:", accessToken); // Debug: Log access token

    const fetchUserStats = async () => {
      try {
        // Fetch top tracks
        const tracksResponse = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const tracksData = await tracksResponse.json();
        console.log("Top Tracks Response:", tracksData); // Debug: Log tracks response

        // Fetch top artists
        const artistsResponse = await fetch("https://api.spotify.com/v1/me/top/artists?limit=5", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const artistsData = await artistsResponse.json();
        console.log("Top Artists Response:", artistsData); // Debug: Log artists response

        if (tracksData.items && artistsData.items) {
          setTopTracks(tracksData.items);
          setTopArtists(artistsData.items);
          setError(null); // Clear errors
        } else {
          throw new Error("Invalid data format received from Spotify API.");
        }
      } catch (err) {
        console.error("Error fetching user stats:", err); // Debug: Log errors
        setError(err.message || "Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchUserStats();
  }, [accessToken]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container" style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}>
      <h3>Spotify Highlights</h3>
      <p>Discover your top tracks and artists</p>
      <div className="row">
        {/* Left card for Top Tracks */}
        <div className="col-md-4">
          <div className="card border-0">
            <div style={{ height: "300px", overflowY: "auto", padding: "10px", backgroundColor: "#f7f7f7" }}>
              <h5>Top Tracks</h5>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {topTracks.map((track) => (
                  <li key={track.id}>
                    {track.name} by {track.artists[0].name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Middle card (unchanged) */}
        <div className="col-md-4">
          <div className="card border-0">
            <div style={{ height: "300px", overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1612995923001-27d03779d023?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                className="card-img-top"
                alt="Featured"
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Right card for Top Artists */}
        <div className="col-md-4">
          <div className="card border-0">
            <div style={{ height: "300px", overflowY: "auto", padding: "10px", backgroundColor: "#f7f7f7" }}>
              <h5>Top Artists</h5>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {topArtists.map((artist) => (
                  <li key={artist.id}>{artist.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
