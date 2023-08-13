import { createContext } from "react";
import { IPodcast } from "../types";

interface IContext {
  podcastList: IPodcast[];
  podcastEpiosdesList: IPodcast[];
  data: string[];
  handleSearch: (e: string) => void;
}

export const MyContext = createContext<IContext>({
  data: [""],
  podcastList: [],
  podcastEpiosdesList: [],
  handleSearch: (e: string) => {
    return;
  },
});
