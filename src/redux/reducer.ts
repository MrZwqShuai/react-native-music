import { combineReducers, Action } from 'redux';
import { TYPE } from './action';

interface CDAction extends Action {
  isShowLyric: boolean;
}

interface State {
  isShowLyric: boolean
}

const CDReducer = (state: State = {
  isShowLyric: false
}, action: CDAction) => {
  switch (action.type) {
    case TYPE.SET_LYRIC_SHOW:
      return Object.assign({}, state, {isShowLyric: action.isShowLyric});
    default: 
      return state;
  }
}

export default combineReducers({
  CDReducer
})