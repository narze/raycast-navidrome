import { showHUD, Clipboard, Detail } from "@raycast/api";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "https://demo.navidrome.org/rest";
const USERNAME = "demo";
const PASSWORD = "demo";

interface IPlayQueue {
  playQueue: {
    entry: Array<IPlayQueueEntry>;
    current: string;
  };
}

interface IPlayQueueEntry {
  id: string;
  parent: string;
  isDir: boolean;
  title: string;
  album: string;
  artist: string;
  track: number;
  year: number;
  genre: string;
  coverArt: string;
  size: number;
  contentType: string;
  suffix: string;
  duration: number;
  bitRate: number;
  path: string;
  playCount: number;
  created: string;
  albumId: string;
  artistId: string;
  type: string;
  isVideo: false;
}

export default function Command() {
  const [data, setData] = useState<IPlayQueue>();

  useEffect(() => {
    async function fetchStories() {
      const res = await axios.get(
        `${API_URL}/getPlayQueue?u=${USERNAME}&p=${PASSWORD}&v=1.16.1&f=json&c=raycast&id=current`
      );

      setData(res.data["subsonic-response"]);
    }

    fetchStories();
  }, []);

  if (!data) {
    return <Detail isLoading={true} />;
  }

  const currentId = data.playQueue.current;

  const currentEntry = data.playQueue.entry.find((entry) => entry.id === currentId);

  if (!currentEntry) {
    return <Detail markdown={`No current entry`} />;
  }

  const markdown = `
# Now Playing

${currentEntry.title}

![](${API_URL}/getCoverArt?u=${USERNAME}&p=${PASSWORD}&v=1.16.1&f=json&c=raycast&id=${currentEntry.coverArt})
`;

  return (
    <Detail
      markdown={markdown}
      navigationTitle="Now Playing"
      // metadata={
      //   <Detail.Metadata>
      //     <Detail.Metadata.Label title="Height" text={`1' 04"`} />
      //     <Detail.Metadata.Label title="Weight" text="13.2 lbs" />
      //     <Detail.Metadata.TagList title="Type">
      //       <Detail.Metadata.TagList.Item text="Electric" color={"#eed535"} />
      //     </Detail.Metadata.TagList>
      //     <Detail.Metadata.Separator />
      //     <Detail.Metadata.Link title="Evolution" target="https://www.pokemon.com/us/pokedex/pikachu" text="Raichu" />
      //   </Detail.Metadata>
      // }
    />
  );
}
