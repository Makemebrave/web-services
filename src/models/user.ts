import Album from './album';

enum RelationType {
  BelongsTo = 'belongsTo',
  HasMany = 'hasMany',
}

class User {
  id: number;

  name: string;

  username: string;

  email: string;

  address: string;

  phone: string;

  website: string;

  company: string;

  static config = {
    endpoint: 'http://localhost:3000/photos',
    relations: { album: { type: RelationType.HasMany, model: Album, foreignKey: 'albumId' } },
  };

  constructor(
    id: number,
    name: string,
    username: string,
    email: string,
    address: string,
    phone: string,
    website: string,
    company: string,
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.website = website;
    this.company = company;
  }
}

export default User;
