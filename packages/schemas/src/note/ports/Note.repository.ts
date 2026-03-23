import { Note } from '../entities';
import {
  CreateNoteDTO,
  DeleteNoteDTO,
  FilterNoteDTO,
  FindNoteDTO,
  PaginatedNoteDTO,
  UpdateNoteDTO,
} from './Note.dto';

export interface NoteRepository {
  create: (data: CreateNoteDTO) => Promise<Note>;
  update: (
    data: UpdateNoteDTO,
    id: FindNoteDTO,
    userId: string
  ) => Promise<Note>;
  delete: (data: DeleteNoteDTO, userId: string) => Promise<void>;
  filter: (data: FilterNoteDTO, userId: string) => Promise<PaginatedNoteDTO>;
  findOne: (data: FindNoteDTO, userId: string) => Promise<Note>;
}
