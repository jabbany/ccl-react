import { CommentAllocator } from '.';

export class BaseAllocator implements CommentAllocator {
  private _id:string;
  constructor() {
    this._id = `${Math.random()}`;
  }
  get id():string {
    return this._id;
  }
}
