import { Skeleton } from "@/components/ui/skeleton";

export default function PatientsLoading() {
  return (
    <div className="health-page space-y-6">
      <Skeleton className="h-10 w-64 rounded-xl" />
      <Skeleton className="h-48 w-full rounded-3xl" />
    </div>
  );
}
