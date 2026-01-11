export function Loader() {
  return (
    <div className="space-y-4 w-full max-w-4xl mx-auto">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-center space-x-4 bg-white p-6 rounded-3xl border border-emerald-50 animate-pulse"
        >
          {/* Circle Icon Skeleton */}
          <div className="w-14 h-14 rounded-full bg-emerald-100 shrink-0"></div>

          {/* Name & Date Skeleton */}
          <div className="flex flex-col flex-grow space-y-2">
            <div className="h-5 bg-emerald-100 rounded-md w-1/3"></div>
            <div className="h-3 bg-emerald-50 rounded-md w-1/4"></div>
          </div>

          {/* Amount Skeleton */}
          <div className="h-8 bg-emerald-100 rounded-lg w-20"></div>
        </div>
      ))}
    </div>
  );
}
