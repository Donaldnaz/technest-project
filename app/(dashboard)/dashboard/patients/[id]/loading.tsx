import { Skeleton } from "@/components/ui/skeleton";

export default function PatientDetailLoading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-6">
      <Skeleton className="h-5 w-48" />
      <Skeleton className="h-52 w-full rounded-2xl" />
      <Skeleton className="h-11 w-full max-w-xl" />
      <div className="grid gap-4 xl:grid-cols-12">
        <Skeleton className="h-96 rounded-lg xl:col-span-7" />
        <div className="space-y-4 xl:col-span-5">
          <Skeleton className="h-56 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
