import * as React from 'react';
import { cn } from '@/lib/utils';

export type SortDirection = 'asc' | 'desc';

export interface Column<T> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  widthClassName?: string;
}

export interface TableSortState {
  key: string;
  direction: SortDirection;
}

export interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  sort?: TableSortState;
  onSortChange?: (next: TableSortState) => void;
  getRowKey?: (row: T, index: number) => string;
  className?: string;
}

export function Table<T>({
  columns,
  rows,
  sort,
  onSortChange,
  getRowKey,
  className,
}: TableProps<T>) {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full min-w-[720px] border-separate border-spacing-0">
        <thead>
          <tr className="bg-ivory-dark">
            {columns.map((col) => {
              const isSortable = Boolean(col.sortable && onSortChange);
              const isActive = sort?.key === col.key;
              const nextDir: SortDirection =
                isActive && sort?.direction === 'asc' ? 'desc' : 'asc';

              return (
                <th
                  key={col.key}
                  className={cn(
                    'sticky top-0 z-10 border-b border-coolgrey px-4 py-3 text-left text-xs font-semibold text-ink/80',
                    col.widthClassName
                  )}
                >
                  {isSortable ? (
                    <button
                      type="button"
                      onClick={() =>
                        onSortChange?.({ key: col.key, direction: nextDir })
                      }
                      className="inline-flex items-center gap-2 hover:text-ink"
                    >
                      <span>{col.header}</span>
                      <span className="text-[10px] text-ink/50">
                        {isActive ? (sort?.direction === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={getRowKey?.(row, idx) ?? String(idx)}
              className={cn(
                'transition hover:bg-ivory',
                idx % 2 === 0 ? 'bg-white' : 'bg-ivory/40'
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="border-b border-coolgrey/60 px-4 py-3 text-sm text-ink"
                >
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

