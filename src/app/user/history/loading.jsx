import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <div className="h-full bg-background p-6 sm:p-8 text-text">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 sm:mb-8">History</h1>

      <div className="bg-surface/60 border border-text/10 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-surface/80 border-b border-text/10 font-semibold text-text/70">
          <div className="flex-1">File Name</div>
          <div className="flex-1">Email</div>
          <div className="flex-1">Datetime</div>
        </div>

        <Loader />
      </div>
    </div>
  );
}
