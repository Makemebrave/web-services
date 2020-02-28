import Album from './album';

enum RelationType {
  BelongsTo = 'belongsTo',
  HasMany = 'hasMany',
}

class Photo {
  albumId: number;

  id: number;

  title: string;

  url: string;

  thumbnailUrl: string;

  static config = {
    endpoint: 'http://localhost:3000/photos',
    relations: { album: { type: RelationType.BelongsTo, model: Album, foreignKey: 'albumId' } },
  };

  constructor(albumId: number, id: number, title: string, url: string, thumbnailUrl: string) {
    this.albumId = albumId;
    this.id = id;
    this.title = title;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl;
  }
}

export default Photo;
