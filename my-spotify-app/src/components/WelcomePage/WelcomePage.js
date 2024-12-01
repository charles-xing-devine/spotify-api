import React from 'react';
import LoginButton from '../LoginButton/LoginButton';
import './WelcomePage.css';

// Placeholder URLs for album covers (replace with actual URLs if needed)
const albumCovers = [
  'https://www.billboard.com/wp-content/uploads/2023/07/roberta-flack-first-take-cover-1969-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/aretha-franklin-young-gifted-black-1972-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2022/06/beyonce-Lemonade-album-art-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/media/ariana-grande-sweetner-album-art-2018-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/Pistol-Annies-Interstate-Gospel-2018-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/kate-bush-the-dreaming-cover-1982-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/asap-rocky-long-live-asap-2013-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/lil-kim-hard-core-1996-billboard-1240.jpg?w=777',
  'https://www.billboard.com/wp-content/uploads/2023/07/gloria-estefan-mi-tierra-cover-1993-billboard-1240.jpg?w=768',
  'https://a5.mzstatic.com/us/r1000/0/Music125/v4/0c/06/05/0c060581-6242-6a2a-a677-20170f2cf8da/886447710180.jpg',
  'https://www.billboard.com/wp-content/uploads/2023/07/fela-kuti-no-agreement-1977-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/carole-king-tapestry-1971-billboard-1240.jpg?w=1024',
  'https://www.billboard.com/wp-content/uploads/media/Lizzo-Cuz-I-Love-You-album-art-2019-billboard-1240_0.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/billie-holiday-lady-in-satin-cover-1958-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/RM-Indigo-album-art-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/missy-elliott-under-construction-cover-2002-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/prince-dirty-mind-1980-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/emmylou-harris-blue-kentucky-girl-1987-billboard-1240.jpg?w=772',
  'https://www.billboard.com/wp-content/uploads/2023/07/mary-j-blige-my-life-1994-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2022/03/46.-Funkadelic-%E2%80%98Maggot-Brain-1971-album-art-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2022/05/chance-the-rapper-acid-rap-billboard-1240-1.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/J.-Cole-2014-Forest-Hills-Drive-2014-album-art-billboard-1240.jpg?w=1024',
  'https://www.billboard.com/wp-content/uploads/media/cardi-b-invasion-of-privacy-album-art-2018-billboard-embed.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/Loretta-Lynn-Van-Lear-Rose-2004-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/haroumi-hosono-philharmony-cover-1982-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/outkast-stankonia-cover-2000-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/elton-john-goodbye-yellow-brick-road-cover-1973-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/jay-z-the-black-album-cover-2003-billboard-1240.jpg?w=1024',
  'https://www.billboard.com/wp-content/uploads/2022/03/44.-Whitney-Houston-%E2%80%98Whitney-Houston-1985-album-art-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/roxy-music-for-your-pleasure-cover-1973-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/Smash-Hits-by-Rodgers-Hart-Columbia-1939.jpg?w=902',
  'https://www.billboard.com/wp-content/uploads/2022/03/14.-Blink-182-%E2%80%98Enema-of-the-State-1999-album-art-billboard-1240.jpg?w=772',
  'https://www.billboard.com/wp-content/uploads/2023/07/rihanna-anti-cover-2016-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2022/03/47.-Janet-Jackson-%E2%80%98Rhythm-Nation-1814-1989-album-at-billboard-1240.jpg?w=1024',
  'https://www.billboard.com/wp-content/uploads/2022/03/43.-Fleetwood-Mac-%E2%80%98Rumours-1977-album-art-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/t-rex-the-slider-1972-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2022/03/48.-Lady-Gaga-%E2%80%98The-Fame-Monster-2009-album-art-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/media/Young-Thug-Jeffery-2016-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/megadeth-peace-sells-cover-1986-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2021/12/Japanese-Breakfast-Jubilee-album-art-2021-billboard-1240.jpg?w=768',
  'https://www.billboard.com/wp-content/uploads/2023/07/the-white-stripes-elephant-cover-2003-billboard-1240.jpg?w=768',
];

// Quadruple the album covers for a much larger content area
const duplicatedCovers = Array(40).fill(albumCovers).flat();

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <div className="welcome-text">
        <h1>Welcome to Moodify</h1>
        <p>Discover your unique music taste and see how it stacks up against others! Our app combines Sentiment Analysis and Audio Feature machine learning to recommend the perfect tracks for you.</p>
        <LoginButton />
      </div>
      <div className="album-gallery">
        {duplicatedCovers.map((cover, index) => (
          <img key={index} src={cover} alt="Album Cover" className="album-cover" />
        ))}
        {/* Duplicate the content again for a seamless scroll */}
         {/* adding some laze rendering to improve performance */}
        {duplicatedCovers.map((cover, index) => (
          <img key={`${index}-duplicate`} src={cover} alt="Album Cover" className="album-cover" loading="lazy"/>
        ))}
      </div>
    </div>
  );
};

export default WelcomePage;
