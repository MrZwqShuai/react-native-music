export interface PlayList {
  id: number;
  commentCount: number;
  shareCount: number;
  coverImgUrl: string;
  description: string;
  creator: Creator;
  name: string;
  subscribedCount: number;
  playCount: number;
  tags: Array<string>;
  track: number;
  tracks: Array<TrackSong>;
  trackCount: number
}

export interface Creator {
  userId: number;
  nickname: string;
  avatarUrl: string;
  signature: string;
}

/**
 * 歌曲
 */
export interface TrackSong {
  id: number;
  name: string;
  ar: AR[];
  al: AL;
}

/**
 * 歌手作者
 */
export interface AR {
  id: number;
  name: string;
  tns: any[];
  alias: any[];
}

/**
 * 应该是歌手专辑
 */

export interface AL {
  id: number;
  name: string;
  picUrl: string;
}