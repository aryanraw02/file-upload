import AddFileButton from "@/components/AddFileButton";
import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <div className="h-full bg-background p-6 sm:p-8 text-text">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Files</h1>
        <AddFileButton />
      </div>

      <div className="bg-surface/60 border border-text/10 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-surface/80 border-b border-text/10 font-semibold text-text/70">
          <div className="flex-1">Name</div>
          <div className="flex-1">Type</div>
          <div className="flex-1">Size</div>
          <div className="flex-1">Created</div>
          <div className="w-32 text-right">Actions</div>
        </div>

        <Loader />
      </div>
    </div>
  );
}
