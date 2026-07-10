import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function truncateCellClassName(maxWidth = "max-w-xs") {
  return cn("truncate", maxWidth);
}

type DataTableShellProps = {
  columns: string[];
  children: React.ReactNode;
  className?: string;
  stickyHeader?: boolean;
};

export function DataTableShell({
  columns,
  children,
  className,
  stickyHeader = true,
}: DataTableShellProps) {
  return (
    <div
      className={cn(
        "clinical-card min-w-0 overflow-hidden",
        className,
      )}
    >
      <div className="responsive-table-wrap">
        <Table>
          <TableHeader
            className={cn(stickyHeader && "sticky top-0 z-10 bg-card")}
          >
            <TableRow className="clinical-table-row hover:bg-transparent">
              {columns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>{children}</TableBody>
        </Table>
      </div>
    </div>
  );
}

type DataTableSkeletonProps = {
  columns: number;
  rows?: number;
};

export function DataTableSkeleton({
  columns,
  rows = 5,
}: DataTableSkeletonProps) {
  return (
    <DataTableShell
      columns={Array.from({ length: columns }, (_, i) => `col-${i}`)}
      stickyHeader={false}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex} className="clinical-table-row">
          {Array.from({ length: columns }).map((__, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton className="h-4 w-full max-w-[8rem]" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </DataTableShell>
  );
}
