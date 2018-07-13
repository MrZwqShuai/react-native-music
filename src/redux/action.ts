import { SongDetailState } from "./redux-model";
import { TrackSong } from "../app/interface/index";


export const TYPE = {
  SET_LYRIC_SHOW: 'SET_LYRIC_SHOW',
  SET_SONG_DETAIL: 'SET_SONG_DETAIL',
  // insert 歌单所有歌曲
  SET_SONG_TRACKS: 'SET_SONG_TRACKS'
}

export const setLyricShow = (isShowLyric: boolean) => ({
  type: TYPE.SET_LYRIC_SHOW,
  isShowLyric
})

export const setSongDetail = (song: SongDetailState) => ({
  type: TYPE.SET_SONG_DETAIL,
  song: song
})

export const setSongTracks = (tracks: TrackSong[]) => ({
  type: TYPE.SET_SONG_TRACKS,
  tracks: tracks
})