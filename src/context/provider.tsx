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
  const [index, setIndex] = useState(0);
  const [loading, setIsLoading] = useState<boolean>(false);

  const [podcastEpiosdesList, setPodcastEpisodes] = useState<IPodcast[]>(
    [] as IPodcast[]
  );

  const chooseTrack = (id?: number) => {
    const track = selectedTrack;

    if (track && track.trackId === id) {
      setIsPlaying(!isPlaying);
    } else {
      const newSelectedTrack = podcastEpiosdesList.find((track) => {
        return track.trackId === id;
      });
      const trackIndex = podcastEpiosdesList.findIndex((track) => {
        return track.trackId === id;
      });
      setIndex(trackIndex);
      if (newSelectedTrack) setSelectedTrack(newSelectedTrack);

      setIsPlaying(true);
    }
  };

  const handlePlay = () => {
    if (!selectedTrack) {
      setSelectedTrack(podcastEpiosdesList[0]);
      setIndex(0);
    }

    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (index === podcastEpiosdesList.length - 1) {
      setSelectedTrack(podcastEpiosdesList[0]);
      setIndex(0);
    } else {
      setSelectedTrack(podcastEpiosdesList[index + 1]);
      setIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (index === 0) {
      setSelectedTrack(podcastEpiosdesList[podcastEpiosdesList.length - 1]);
      setIndex(podcastEpiosdesList.length - 1);
    } else {
      setSelectedTrack(podcastEpiosdesList[index - 1]);
      setIndex((prev) => prev - 1);
    }
  };

  const shuffleList = () => {
    // Create a copy of the list
    const shuffledList = podcastEpiosdesList;

    // Loop through each element in the list
    for (let i = shuffledList.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i
      const randomIndex = Math.floor(Math.random() * (i + 1));

      // Swap the current element with the element at the random index
      [shuffledList[i], shuffledList[randomIndex]] = [
        shuffledList[randomIndex],
        shuffledList[i],
      ];
    }

    setPodcastEpisodes(shuffledList);
  };

  const handleSort = (sortBy: string, isView: boolean) => {
    let list = isView ? [...podcastEpiosdesList] : [...podcastList];

    if (sortBy === "NEW") {
      list = list.sort(
        (a, b) =>
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      );
    } else if (sortBy === "OLD") {
      list = list.sort(
        (a, b) =>
          new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
      );
    } else if (sortBy === "MILI_ASC") {
      list = list.sort(
        (a, b) => (a.trackTimeMillis || 0) - (b.trackTimeMillis || 0)
      );
    } else if (sortBy === "MILI_DESC") {
      list = list.sort(
        (a, b) => (b.trackTimeMillis || 0) - (a.trackTimeMillis || 0)
      );
    } else {
      throw new Error("Invalid sortBy value");
    }

    isView ? setPodcastEpisodes(list) : setPodcastList(list);
  };

  const handleSearch = (keyword: string) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const handleSearchEpisodes = (id: number) => {
    setIsLoading(true);
    setPodcastList([]);
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
    setIsLoading(false);
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

      console.log(parsedPodcasts);
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
        handleNext,
        handleBack,
        shuffleList,
        handleSort,
        loading,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
