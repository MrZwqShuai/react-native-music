import { BaseUrl } from '../config/url';
/**
 * 获取轮播图
 */
export const getBanners = () => {
  return fetch('http://47.98.137.213:8080/springmvc-study/banner/all');
}

/**
 * 获取最新歌单
 */
export const getPlayListNewest = () => {
  return fetch('http://localhost:3000/top/playlist?limit=10&order=new');
}