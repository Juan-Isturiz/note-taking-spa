import type { Note } from '@repo/schemas';
import { Badge } from '@/atoms/Badge';

interface NoteCardProps {
  note: Note;
  onClick: (note: Note) => void;
}

export function NoteCard({ note, onClick }: NoteCardProps) {
  const MAX_CATEGORIES_TO_SHOW = 3;

  const categories = note.categories || [];
  const visibleCategories = categories.slice(0, MAX_CATEGORIES_TO_SHOW);
  const hiddenCategoriesCount = categories.length - MAX_CATEGORIES_TO_SHOW;

  return (
    <div
      onClick={() => onClick(note)}
      className="flex h-full cursor-pointer flex-col justify-between rounded-2xl bg-neutral-800 p-5 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
    >
      <div>
        <div className="mb-2 flex items-start justify-between gap-4">
          <h3 className="font-semibold text-neutral-200 line-clamp-2">
            {note.title}
          </h3>

          {note.isArchived && <Badge variant="indicator">Archived</Badge>}
        </div>

        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
          {note.content}
        </p>
      </div>
      {categories.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-700/50">
          {visibleCategories.map((category) => (
            <Badge key={category.id} variant="tag">
              {category.name}
            </Badge>
          ))}

          {hiddenCategoriesCount > 0 && (
            <Badge variant="tag">+{hiddenCategoriesCount}</Badge>
          )}
        </div>
      )}
    </div>
  );
}
