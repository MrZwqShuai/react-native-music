import { BaseUrl } from '../config/url';

/**
 * 获取轮播图
 */
export const getBanners = () => {
  return fetch( BaseUrl + '/banner');
}

/**
 * 获取热门歌单
 */
export const getPersonalizedPlayList = () => {
  return fetch( BaseUrl + '/personalized', {
    method:"GET",
  });
}

/**
 * 获取最新音乐
 */
export const getNewestPlayList = () => {
  return fetch( BaseUrl + '/personalized/newsong', {
    method:"GET",
  });
}

/**
 * 获取歌单详情
 */
export const getPlaylistDetailById = (id: number) => {
  return fetch( BaseUrl + `/playlist/detail?id=${id}`, {
    method:"GET",
  });
}

/**
 * 获取歌曲资源byid
 */
export const getMusicUrlById = (id: number) => {
  return fetch( BaseUrl + `/music/url?id=${id}`, {
    method:"GET",
  });
}