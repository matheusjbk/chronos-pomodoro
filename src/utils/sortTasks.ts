import type { TaskModel } from '../models/TaskModel';

export type SortTasksOptions = {
  tasks: TaskModel[];
  direction?: 'asc' | 'desc';
  field?: keyof TaskModel;
};

// Return -1 if 'a' must come before 'b'
// Return 1 if 'b' must come before 'a'
// Return 0 if order don't need to change

// If a value is null, it will be placed in the end of the list
// If it's a number, order numerically ('asc' or 'desc')
// If it's a string, order alphabetically ('asc' or 'desc')
export function sortTasks({
  tasks = [],
  direction = 'desc',
  field = 'startDate',
}: SortTasksOptions): TaskModel[] {
  return [...tasks].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    // If both values are null, keep the order
    if (!aValue && !bValue) return 0;

    // If only the first value is null, place it in the end of the list
    if (!aValue) return 1;

    // If only the second value is null, place it in the end of the list
    if (!bValue) return -1;

    // If both values are numbers, subtract to order
    if (typeof aValue === 'number' && typeof bValue === 'number')
      return direction === 'asc' ? aValue - bValue : bValue - aValue;

    // If both values are strings, use localCompare to compare in alphabetic order
    if (typeof aValue === 'string' && typeof bValue === 'string')
      return direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);

    // Non handled cases
    return 0;
  });
}
