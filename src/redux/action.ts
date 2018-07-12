import { SongDetailState } from "./redux-model";


export const TYPE = {
  SET_LYRIC_SHOW: 'SET_LYRIC_SHOW',
  SET_SONG_DETAIL: 'SET_SONG_DETAIL'
}

export const setLyricShow = (isShowLyric: boolean) => ({
  type: TYPE.SET_LYRIC_SHOW,
  isShowLyric
})

export const setSongDetail = (song: SongDetailState) => ({
  type: TYPE.SET_SONG_DETAIL,
  song: song
})