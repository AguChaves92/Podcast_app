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
  handleNext: () => void;
  handleBack: () => void;
  shuffleList: () => void;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  chooseTrack: (e?: number) => void;
  handleSearch: (e: string) => void;
  handleSearchEpisodes: (e: number) => void;
  handleSort: (e: string, b: boolean) => void;
  loading: boolean;
}

export const MyContext = createContext<IContext>({
  selectedTrack: {} as IPodcast,
  chooseTrack: (id?: number) => {
    return;
  },
  handleNext: () => {
    return;
  },
  handleBack: () => {
    return;
  },
  shuffleList: () => {
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
  handleSort: (e: string, b: boolean) => {
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
  loading: false,
});
