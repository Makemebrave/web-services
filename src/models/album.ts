import User from './user';
import Photo from './photo';
import Model from './model';

enum RelationType {
  BelongsTo = 'belongsTo',
  HasMany = 'hasMany',
}

class Album extends Model {
  title: string;

  userId: number;

  static config = {
    endpoint: 'http://localhost:3000/album',
    relations: {
      user: { type: RelationType.BelongsTo, model: User, foreignKey: 'userId' },
      photo: { type: RelationType.HasMany, model: Photo, foreignKey: 'albumId' },
    },
  };

  constructor(album: {id: number; title: string; userId: number}) {
    super(album.id);
    this.title = album.title;
    this.userId = album.userId;
  }
}

export default Album;
