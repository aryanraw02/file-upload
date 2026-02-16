import { Loader2 } from "lucide-react";

export default function Loader({ fullHeight = false }) {
  return (
    <div
      className={
        fullHeight
          ? "h-full w-full flex items-center justify-center p-6"
          : "min-h-40 flex items-center justify-center"
      }
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        {fullHeight ? (
          <p className="text-sm font-medium text-text/80">Loading…</p>
        ) : null}
      </div>
    </div>
  );
}
