import { CommentData } from './comment-data';

export interface CommentProvider {
  release():void;
  hold():void;
  listen(callback:(comments:CommentData[])=>void):void;
}
