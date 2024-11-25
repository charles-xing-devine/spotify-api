export const fetchTracksByArtist = async (artistName, token) => {
  try {
    const response = await fetch(`API_URL/tracks?artist=${artistName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.tracks.items;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("Your session has expired. Please log in again.");
    } else {
      console.error("Error fetching tracks by artist:", error);
    }
    return [];
  }
};

export const fetchRecommendationsByArtist = async (artistName, token) => {
  try {
    const recommendationsResponse = await fetch(
      `API_URL/recommendations?artist=${artistName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return recommendationsResponse.data.tracks;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("Your session has expired. Please log in again.");
    } else {
      console.error("Error fetching recommendations:", error);
    }
    return [];
  }
};
