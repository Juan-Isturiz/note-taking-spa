import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Label,
  Textarea,
} from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Category,
  type CreateNoteDTO,
  type DeleteNoteDTO,
  type FindNoteDTO,
  type Note,
  type UpdateNoteDTO,
} from '@repo/schemas';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, TextInput } from '@/atoms';
import { CategoryInput } from '@/atoms/CategoryInput';
import { api } from '@/services/api';

const NoteFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  categories: z.array(z.string()),
});

type NoteFormValues = z.infer<typeof NoteFormSchema>;

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
  onSave: (data: Omit<CreateNoteDTO, 'userId'>) => Promise<void>;
  onUpdate?: (note: FindNoteDTO, data: UpdateNoteDTO) => Promise<void>;
  onDelete?: (id: DeleteNoteDTO) => Promise<void>;
  onToggleArchive?: (
    id: FindNoteDTO,
    data: { isArchived: boolean }
  ) => Promise<void>;
}

export function NoteModal({
  isOpen,
  onClose,
  note,
  onSave,
  onUpdate,
  onDelete,
  onToggleArchive,
}: NoteModalProps) {
  const isEditing = !!note;
  const queryClient = useQueryClient();

  const { data: existingCategories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: api.getCategories,
    enabled: isOpen,
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormValues>({
    resolver: zodResolver(NoteFormSchema),
    defaultValues: { title: '', content: '', categories: [] },
  });
  useEffect(() => {
    if (note && isOpen) {
      reset({
        title: note.title,
        content: note.content,
        categories: note.categories?.map((cat) => cat.name) || [],
      });
    } else if (!note && isOpen) {
      reset({ title: '', content: '', categories: [] });
    }
  }, [note, isOpen, reset]);
  const onSubmit = async (formData: NoteFormValues) => {
    try {
      const categoryIds: string[] = [];
      let hasNewCategories = false;

      if (formData.categories && formData.categories.length > 0) {
        for (const categoryName of formData.categories) {
          const existing = existingCategories?.find(
            (c) => c.name.toLowerCase() === categoryName.toLowerCase()
          );

          if (existing) {
            categoryIds.push(existing.id);
          } else {
            const newCategory = await api.createCategory({
              name: categoryName,
            });
            categoryIds.push(newCategory.id);
            hasNewCategories = true;
          }
        }
      }

      if (hasNewCategories) {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      }

      const payload = {
        title: formData.title,
        content: formData.content,
        categories: categoryIds,
      };

      if (isEditing) {
        await onUpdate?.({ id: note!.id }, payload);
      } else {
        await onSave(payload);
      }

      onClose();
    } catch (error) {
      console.error('Error saving note with categories:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 data-enter:ease-out data-leave:ease-in"
      />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-neutral-800 p-6 text-left align-middle shadow-xl transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 data-enter:ease-out data-leave:ease-in"
        >
          <DialogTitle
            as="h3"
            className="text-xl font-semibold flex justify-between items-center leading-6 text-neutral-200"
          >
            {isEditing ? 'Edit Note' : 'New Note'}
            <Button type="button" variant="danger" size="sm" onClick={onClose}>
              Close
            </Button>
          </DialogTitle>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col gap-4"
          >
            <TextInput
              label="Title"
              placeholder="Shopping List"
              className="space-x-2"
              error={errors.title?.message}
              {...register('title')}
            />

            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <CategoryInput
                  label="Categories"
                  value={field.value || []}
                  onChange={field.onChange}
                  error={errors.categories?.message}
                />
              )}
            />

            <Field className="flex w-full flex-col">
              <Label className="mb-1 text-sm font-medium text-neutral-300">
                Content
              </Label>
              <Textarea
                rows={5}
                placeholder="Write your note here..."
                data-invalid={errors.content ? '' : undefined}
                className="w-full text-neutral-200 resize-none rounded-md border border-neutral-600 bg-neutral-700 px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 data-invalid:border-red-500 data-invalid:focus:border-red-500 data-invalid:focus:ring-red-500/20"
                {...register('content')}
              />
              {errors.content && (
                <span className="mt-1 text-xs text-red-500">
                  {errors.content.message}
                </span>
              )}
            </Field>

            <div className="mt-6 flex items-center justify-between border-t border-neutral-700/50 pt-4">
              <div className="flex gap-2">
                {isEditing && onToggleArchive && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={async () => {
                      await onToggleArchive(
                        { id: note.id },
                        { isArchived: !note.isArchived }
                      );
                      onClose();
                    }}
                    className="text-gray-500 hover:text-yellow-600"
                  >
                    {note.isArchived ? 'Unarchive' : 'Archive'}
                  </Button>
                )}

                {isEditing && onDelete && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={async () => {
                      const confirmed = window.confirm(
                        'Are you sure you want to delete this note?'
                      );
                      if (confirmed) {
                        await onDelete({ id: note.id });
                        onClose();
                      }
                    }}
                    className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
