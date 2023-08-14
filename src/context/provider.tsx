import { IPodcast } from "../types";
import { MyContext } from "./context";
import { ReactNode, useState } from "react";

interface IProvider {
  children: ReactNode;
}

export const MyContextProvider = ({ children }: IProvider) => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [podcastList, setPodcastList] = useState<IPodcast[]>([] as IPodcast[]);
  const [selectedTrack, setSelectedTrack] = useState<IPodcast>({} as IPodcast);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [podcastEpiosdesList, setPodcastEpisodes] = useState<IPodcast[]>(
    [] as IPodcast[]
  );

  const chooseTrack = (id?: number) => {
    const track = selectedTrack;
      
    if (track && track.trackId === id) {
      console.log("here");
      setIsPlaying(!isPlaying);
    } else {
      const newSelectedTrack = podcastEpiosdesList.find((track) => {
        return track.trackId === id;
      });
      if (newSelectedTrack) setSelectedTrack(newSelectedTrack);

      setIsPlaying(true);
    }
  };

  const handlePlay = () => {
    if (!selectedTrack) {
      setSelectedTrack(podcastEpiosdesList[0]);
    }

    setIsPlaying(!isPlaying);
  };

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
        console.log("here", JSON.parse(data.contents));
        parseData(JSON.parse(data.contents), "podcast");
      });
  };

  const handleSearchEpisodes = (id: number) => {
    fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://itunes.apple.com/lookup?id=${id}&entity=podcastEpisode`
      )}`
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        parseData(JSON.parse(data.contents), "podcast-episode");
      });
  };

  const parseData = (data: any, type: string) => {
    if (type === "podcast") {
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
      setPodcastList(parsedPodcasts);
    }

    if (type === "podcast-episode") {
      const podcastInfo: IPodcast = data.results[0];
      const newArray = data.results.slice(1);

      const parsedEpisodes: IPodcast[] = newArray.map((podcast: any) => ({
        artistId: podcastInfo.artistId,
        collectionId: podcast.collectionId,
        trackId: podcast.trackId,
        artistName: podcastInfo.artistName,
        collectionName: podcastInfo.collectionName,
        trackName: podcast.trackName,
        artworkUrl60: podcast.artworkUrl60,
        releaseDate: podcast.releaseDate,
        description: podcast.description,
        artworkUrl600: podcast.artworkUrl600,
        trackTimeMillis: podcast.trackTimeMillis,
        episodeUrl: podcast.episodeUrl,
      }));

      setPodcastEpisodes(parsedEpisodes);
    }
  };

  return (
    <MyContext.Provider
      value={{
        isPlaying,
        searchWord,
        selectedTrack,
        chooseTrack,
        setSearchWord,
        setIsPlaying,
        handleSearch,
        podcastList,
        handlePlay,
        podcastEpiosdesList,
        handleSearchEpisodes,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
