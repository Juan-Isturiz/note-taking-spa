import type {
  CreateNoteDTO,
  DeleteNoteDTO,
  Note,
  UpdateNoteDTO,
} from '@repo/schemas';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Button } from '@/atoms';
import { NoteCard } from '@/components/NoteCard';
import { NoteModal } from '@/components/NoteModal';
import { api } from '@/services/api';

export function NotesPage({ isArchived }: { isArchived: boolean }) {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedCategoryId('');
  }, [isArchived]);

  const { data: notesData, isLoading } = useQuery({
    queryKey: ['notes', currentPage, isArchived, selectedCategoryId],
    queryFn: async () =>
      api.filterNotes({
        isArchived,
        page: currentPage,
        pageSize: 12,
        category: selectedCategoryId || undefined,
      }),
  });
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories,
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<CreateNoteDTO, 'userId'>) => api.createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`notes`, currentPage, isArchived],
      });
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateNoteDTO }) =>
      api.updateNote(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`notes`] });
      setIsModalOpen(false);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: DeleteNoteDTO) => api.deleteNote(id.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`notes`] });
    },
  });

  const handleEdit = (note: Note) => {
    setNoteToEdit(note);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setNoteToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <label
            htmlFor="category-filter"
            className="text-sm font-medium text-neutral-400"
          >
            Filter by:
          </label>
          <select
            id="category-filter"
            value={selectedCategoryId}
            onChange={(e) => {
              setSelectedCategoryId(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-sm text-neutral-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All categories</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {!isArchived && <Button onClick={openCreateModal}>+ Add Note</Button>}
      </div>

      {isLoading ? (
        <div className="text-center text-gray-500 py-10">Loading...</div>
      ) : notesData?.items.length === 0 ? (
        <div className="text-center text-gray-500 py-10 rounded-lg border-2 border-dashed border-gray-300">
          No {isArchived ? 'archived' : 'active'} notes found 😔.{' '}
          {isArchived ? 'Add them from the "Active" Tab' : 'Create new ones!!'}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notesData?.items.map((note) => (
            <NoteCard key={note.id} note={note} onClick={handleEdit} />
          ))}
        </div>
      )}
      {notesData && notesData.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600">
            Showing Page{' '}
            <span className="font-semibold">{notesData.currentPage}</span> of{' '}
            <span className="font-semibold">{notesData.totalPages}</span>
          </p>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              disabled={!notesData.hasPrevious}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <Button
              variant="ghost"
              disabled={!notesData.hasNext}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={async (data) => {
          await createMutation.mutateAsync(data);
        }}
        onUpdate={async (note, data) => {
          await updateMutation.mutateAsync({ id: note.id, data });
        }}
        onDelete={async (id) => {
          await deleteMutation.mutateAsync(id);
        }}
        onToggleArchive={async (note, data) => {
          await updateMutation.mutateAsync({ id: note.id, data });
        }}
        note={noteToEdit}
      />
    </div>
  );
}
