interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className = "" }: SkeletonProps) => (
  <div
    className={`animate-pulse rounded-lg bg-gray-200 ${className}`}
  />
);

export const SkeletonCard = () => (
  <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <Skeleton className="mb-4 h-40 w-full rounded-xl" />
    <Skeleton className="mb-2 h-5 w-3/4" />
    <Skeleton className="mb-4 h-4 w-1/2" />
    <div className="flex gap-2">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-20" />
    </div>
  </div>
);

export const SkeletonList = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
        <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
  <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
    <div className="border-b border-gray-200 bg-gray-50 px-5 py-3">
      <div className="flex gap-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
    {Array.from({ length: rows }, (_, i) => (
      <div key={i} className="flex items-center gap-6 border-b border-gray-100 px-5 py-4 last:border-0">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    ))}
  </div>
);

export default Skeleton;
