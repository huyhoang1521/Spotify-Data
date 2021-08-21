import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import ListItemText from "@material-ui/core/ListItemText";

const spotifyApi = new SpotifyWebApi({
  clientId: "626fdea4b9d14fe1abcb609db498c26c",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.getUserPlaylists().then((res) => {
      spotifyApi.getPlaylistTracks(res.body.items[0].id).then((tracks) => {
        setTracks(
          tracks.body.items.map((track) => {
            return {
              uri: track.track.uri,
              name: track.track.name,
              artist: track.track.artist,
              album: track.track.album.name,
            };
          })
        );
      });
    });
  }, [accessToken, tracks]);

  return (
    <div>
      {tracks.map((track) => (
        <div key={track.uri}>
          <ListItemText primary={track.name} />
        </div>
      ))}
    </div>
    //<div>{code}</div>
  );
}
