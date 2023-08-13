import { IPodcast } from "../types";
import { MyContext } from "./context";
import { ReactNode, useState } from "react";

interface IProvider {
  children: ReactNode;
}

export const MyContextProvider = ({ children }: IProvider) => {
  const data = ["2", "3", "4"];
  const [podcastList, setPodcastList] = useState<IPodcast[]>([] as IPodcast[]);
  const [podcastEpiosdesList, setPodcastEpisodes] = useState<IPodcast[]>(
    [] as IPodcast[]
  );

  const handleSearch = (keyword: string) => {
    fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://itunes.apple.com/search?term=${keyword}&media=podcast&limit=10`
      )}`
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log('here',JSON.parse(data.contents))
        parseData(JSON.parse(data.contents), "podcast");
      });
  };

  



  const parseData = (data: any, type: string) => {
    if (type === "podcast") {
      console.log(data.results[0])

      const parsedPodcasts: IPodcast[] = data.results.map((podcast: any) => ({
        artistId: podcast.artistId,
        collectionId: podcast.collectionId,
        trackId: podcast.trackId,
        artistName: podcast.artistName,
        collectionName: podcast.collectionName,
        trackName: podcast.trackName,
        collectionCensoredName: podcast.collectionCensoredName,
        artworkUrl60: podcast.artworkUrl60,
        releaseDate: podcast.releaseDate,
      }));
      setPodcastList(parsedPodcasts)
    }
  };

  return (
    <MyContext.Provider
      value={{
        data,
        handleSearch,
        podcastList,
        podcastEpiosdesList,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
