// Homepage.js


import LoginButton from '../LoginButton/LoginButton';
import ArtistTracks from '../Service/ArtistTracks';

import './Homepage.css';

const Homepage = () => {

  const token = localStorage.getItem('spotifyAccessToken'); 

  return (
    <div>
      <LoginButton />
      {localStorage.getItem('spotifyAccessToken') ? <ArtistTracks /> : null}
    </div>
  );
}

export default Homepage;
