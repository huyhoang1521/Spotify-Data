import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import ListItemText from "@material-ui/core/ListItemText";

const spotifyApi = new SpotifyWebApi({
  clientId: "626fdea4b9d14fe1abcb609db498c26c",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getUserPlaylists().then((res) => {
      spotifyApi
        .getPlaylistTracks(res.body.items[0].id)
        .then(async (tracks) => {
          var tracksArtistsIds = tracks.body.items.map((trackInfo) => {
            return trackInfo.track.artists.map((artist) => artist.id);
          });

          // array of unique ids
          var artistIDs = [...new Set(tracksArtistsIds.flat())];

          // list of all artist genres
          var artistGenres = [];

          await Promise.all(
            artistIDs.map(async (artistId) => {
              const artist = await spotifyApi.getArtist(artistId);
              artistGenres.push(...artist.body.genres);
            })
          );

          var counts = {};
          artistGenres.forEach((x) => (counts[x] = (counts[x] || 0) + 1));
          //console.log(counts);

          var countArray = Object.entries(counts);
          var sorted = countArray.sort((a, b) => b[1] - a[1]);
          //console.log(sorted);
          setGenres(sorted);
        });
    });
  }, [accessToken]);

  return (
    <div>
      {genres.map((genre, index) => (
        <div key={index}>
          <ListItemText primary={`${genre[0]}: ${genre[1]}`} />
        </div>
      ))}
    </div>
  );
}
