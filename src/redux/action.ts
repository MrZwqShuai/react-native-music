
export const TYPE = {
  SET_LYRIC_SHOW: 'SET_LYRIC_SHOW'
}

export const setLyricShow = (isShowLyric: boolean) => ({
  type: TYPE.SET_LYRIC_SHOW,
  isShowLyric
})