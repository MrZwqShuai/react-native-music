export const getAudioTime = (seconds: number): string => {
  let second: number = parseInt(String(seconds));
  let minute: number = 0;
  let hours: number = 0;
  if (seconds >= 60) {
    minute = parseInt(String(seconds / 60));
    second = parseInt(String(seconds % 60));
    if (minute >= 60) {
      hours = parseInt(String(minute / 60));
      minute = parseInt(String(minute % 60));
    }
  }
  let result: string = "" + parseInt(String(seconds));
  if (minute > 0) {
    if (second < 10) {
      result = "   " + minute + ":" + `0${second}`
    } else {
      result = "   " + minute + ":" + second
    }
  } else if (hours > 0) {
    if (minute < 10) {
      result = " " + hours + ":" + `0${minute}`
    } else {
      result = " " + hours + ":" + minute
    }
  } else {
    if (second < 10) {
      result = '00:' + `0${seconds}`
    } else {
      result = '00:' + seconds;
    }
  }
  return result
}