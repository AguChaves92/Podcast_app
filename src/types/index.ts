export interface IPodcast {
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  artworkUrl60: string;
  releaseDate: string;
  description?: string;
  artworkUrl600?: string;
  trackTimeMillis?: number;
  previewUrl?: string;
  episodeUrl?: string;
}
