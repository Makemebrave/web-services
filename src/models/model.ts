import { NonFunctionKeys } from 'utility-types';
import Axios from 'axios';

type SchemaOf<T extends object> = Pick<T, NonFunctionKeys<T>>;

enum QueryFilterOrder {
  Asc = 'asc',
  Desc = 'desc',
}

interface QueryFilter {
  where?: Record<string, any>;
  limit?: number;
  page?: number;
  sort?: string;
  order?: QueryFilterOrder;
}

interface FindByIdOptions {
  includes: string[];
}

type ModelIdType = number | string;

enum RelationType {
  BelongsTo = 'belongsTo',
  HasMany = 'hasMany',
}

/**
 * Define the configuration of a relation
 */
interface Relation {
  /** Type of the relation: hasMany, belongsTo, ... */
  type: RelationType;

  /** The target Model */
  model: any;

  /**
   * The key containing the relation link
   * - on the target model if hasMany
   * - on the current model if belongsTo
   */
  foreignKey: string;
}

interface ModelConfig {
  /**
   * The endpoint on the remote API, example 'users'
   */
  endpoint: string;

  /**
   * The definition of the relations
   */
  relations?: Record<string, Relation>;
}

class Model {
  protected static config: ModelConfig;

  id: string | number;

  constructor(id: number) {
    this.id = id;
  }

  static async create<T extends Model>(dataOrModel: SchemaOf<T> | T): Promise<T> {
    let model = null;
    try {
      model = await Axios.post(this.config.endpoint, dataOrModel);
      model = model.data;
    } catch (error) {
      console.log(error);
    }
    return model;
  }

  // static find<T extends Model>(filter?: QueryFilter): Promise<T[]>;

  static async findById<T extends Model>(id: ModelIdType, options?: FindByIdOptions): Promise<T> {
    let model: any;
    let photos;
    let user;
    try {
      model = await Axios.get(`${this.config.endpoint}/${id}`);
      model = model.data;
      if (options && this.config.relations) {
        options.includes.map(async (data, idx) => {
          if (data === 'user') {
            if (this.config.relations) {
              if (this.config.relations[options.includes[idx]].type === 'belongsTo') {
                user = await Axios.get(`http://localhost:3000/
                ${options.includes[idx]}/${model[this.config.relations[options.includes[idx]]
  .foreignKey]}`);
                model[options.includes[idx]] = user.data;
              }
            }
          }
          if (data === 'photo') {
            if (this.config.relations) {
              if (this.config.relations[options.includes[idx]].type === 'hasMany') {
                photos = await Axios.get(`http://localhost:3000/${options.includes[idx]}`);
                const belongsToModels: any = [];
                photos.data.map((photo: any) => {
                  if (this.config.relations == null) return;
                  if (photo[this.config.relations[options.includes[idx]].foreignKey] === id) {
                    belongsToModels.push(photo);
                  }
                });
                model.photo = belongsToModels;
              }
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
    return model;
  }

  // static updateById<T extends Model>(model: T): Promise<T[]>;

  static async updateById<T extends Model>(id: ModelIdType |
    T, data?: Partial<SchemaOf<T>>): Promise<T> {
    let model = null;
    try {
      if (typeof id === 'string' || typeof id === 'number') {
        model = await Axios.patch(`${this.config.endpoint}/${id}`, data);
      } else {
        model = await Axios.patch(`${this.config.endpoint}/${id.id}`, id);
      }
      model = model.data;
    } catch (error) {
      console.log(error);
    }
    return model;
  }

  static async deleteById(id: ModelIdType): Promise<boolean> {
    try {
      return await Axios.delete(`${this.config.endpoint}/${id}`);
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  /**
   * Push changes that has occured on the instance
   */
  // save<T extends Model>(): Promise<T>;

  /**
   * Push given changes, and update the instance
   */
  // update<T extends Model>(data: Partial<SchemaOf<T>>): Promise<T>;

  /**
   * Remove the remote data
   */
  // remove(): Promise<void>;
}

export default Model;
