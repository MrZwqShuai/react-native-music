
export interface Icons {
  name: string;
  title: string;
}

// 歌单的详情
export interface personalized{
  id: number;
  type: number;
  name: string;
  copywriter: string;
  picUrl: string;
  playCount: number;
  trackCount: number;
  highQuality: boolean;
  alg: string;
  canDislike: boolean;
}
