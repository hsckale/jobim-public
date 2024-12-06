import { Timestamp } from "firebase/firestore";
import { Genre } from "../enums/genre";
import { Artist } from "./artist";
import { Track } from "./track";

export interface Album {
    title: string,
    genre: Genre,
    tracks: Array<Track>,
    artist: Artist,
    releaseDate: Timestamp
};