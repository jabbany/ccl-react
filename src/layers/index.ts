import { CommentAllocator } from '../allocators';
import { CommentData } from '../comment-data';

export type RenderState = 'animated' | 'frozen';
export interface GlobalLayerProps {
  allocator: CommentAllocator;
  renderState: RenderState;
  comments: CommentData[];
}

export * from './layer';
export * from './canvas-layer';
