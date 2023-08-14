import { createContext } from "react";
import { IPodcast } from "../types";

interface IContext {
  podcastList: IPodcast[];
  searchWord: string;
  handlePlay: () => void;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  podcastEpiosdesList: IPodcast[];
  selectedTrack: IPodcast;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  chooseTrack: (e?: number) => void;
  handleSearch: (e: string) => void;
  handleSearchEpisodes: (e: number) => void;
}

export const MyContext = createContext<IContext>({
  selectedTrack: {} as IPodcast,
  chooseTrack: (id?: number) => {
    return;
  },
  handlePlay: () => {
    return;
  },
  setIsPlaying: () => {
    return;
  },
  isPlaying: false,
  searchWord: "",
  setSearchWord: () => {
    return;
  },
  podcastList: [],
  podcastEpiosdesList: [],
  handleSearchEpisodes: (e: number) => {
    return;
  },
  handleSearch: (e: string) => {
    return;
  },
});
