import { combineReducers, Action } from 'redux';
import { TYPE } from './action';
import { SongDetailState } from './redux-model';

interface CDAction extends Action {
  isShowLyric: boolean;
}

interface songDetailAction extends Action {
  id: number;
  name: string;
  coverImg: string;
}

interface CDState {
  isShowLyric: boolean
}

const CDReducer = (state: CDState = {
  isShowLyric: false
}, action: CDAction) => {
  switch (action.type) {
    case TYPE.SET_LYRIC_SHOW:
      return Object.assign({}, state, {isShowLyric: action.isShowLyric});
    default: 
      return state;
  }
}

const songDetailReducer = (state: SongDetailState = {song: {
  id: 0,
  name: '',
  coverImg: ''
}}, action: songDetailAction) => {
  switch (action.type) {
    case TYPE.SET_SONG_DETAIL:
    return Object.assign({}, state, {song: action.song});
    default: 
      return {...state};
  }
}

export default combineReducers({
  CDReducer,
  songDetailReducer
})