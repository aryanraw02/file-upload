import HistoryTableBody from "@/components/HistoryTableBody";

export const dynamic = "force-dynamic";

export default function HistoryPage() {
  return (
    <div className="h-full bg-background p-4 sm:p-6 lg:p-8 text-text">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 sm:mb-8">History</h1>

      <div className="bg-surface/60 border border-text/10 rounded-2xl overflow-hidden">
        <div className="hidden lg:flex items-center justify-between p-4 bg-surface/80 border-b border-text/10 font-semibold text-text/70">
          <div className="flex-1">File Name</div>
          <div className="flex-1">Email</div>
          <div className="flex-1">Datetime</div>
        </div>

        <HistoryTableBody />
      </div>
    </div>
  );
}