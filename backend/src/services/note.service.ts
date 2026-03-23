import {
  CreateNoteDTO,
  DeleteNoteDTO,
  FilterNoteDTO,
  FindNoteDTO,
  NoteRepository,
  UpdateNoteDTO,
} from '@repo/schemas';
import { Logger } from '@/config/logger';

export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async create(data: CreateNoteDTO) {
    Logger.info('Creating note', { data });
    return this.noteRepository.create(data);
  }

  async update(data: UpdateNoteDTO, noteId: FindNoteDTO, userId: string) {
    Logger.info('Updating note', { data });
    return this.noteRepository.update(data, noteId, userId);
  }

  async delete(noteId: DeleteNoteDTO, userId: string) {
    Logger.info('Deleting note', { noteId });
    return this.noteRepository.delete(noteId, userId);
  }

  async findOne(noteId: FindNoteDTO, userId: string) {
    Logger.info('Finding note', { noteId });
    return this.noteRepository.findOne(noteId, userId);
  }

  async filter(data: FilterNoteDTO, userId: string) {
    Logger.info('Filtering notes', { data, userId });
    return this.noteRepository.filter(data, userId);
  }
}
