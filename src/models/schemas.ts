export interface AlbumSchema {
  id: number;
  userId: number;
  title: string;
}

export interface PhotoSchema {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface UserSchema {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  website: string;
  company: string;
}
