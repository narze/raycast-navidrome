import { showHUD, Clipboard } from "@raycast/api";
import axios from "axios";

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

export default async function main() {
  const res = await axios.get(
    "https://demo.navidrome.org/rest/getPlayQueue?u=demo&p=demo&v=1.16.1&f=json&c=raycast&id=current"
  );

  const data: IPlayQueue = res.data["subsonic-response"];

  const currentId = data.playQueue.current;

  const currentEntry = data.playQueue.entry.find((entry) => entry.id === currentId);

  console.log({ currentEntry });

  // const now = new Date();
  // await Clipboard.copy(now.toLocaleDateString());
  // await showHUD("Copied date to clipboard");
}
