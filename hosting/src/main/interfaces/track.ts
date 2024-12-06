import { Genre } from "../enums/genre";

export interface Track {
    title: string,
    duration: number,
    genre: Genre
};