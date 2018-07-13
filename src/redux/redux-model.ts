import { TrackSong } from "../app/interface/index";

export interface SongDetailState {
  song: SongDetail;
  tracks: TrackSong[];
}

export interface SongDetail {
  id: number;
  name: string;
  coverImg: string;
  // 当前歌曲所在歌单的下标
  idx: number;
}