import { Suspense } from "react";
import TrainingEditor from "@/components/TrainingEditor";
import RequireAuth from "@/components/RequireAuth";

export default function TrainingPage() {
  return (
    <RequireAuth>
      <Suspense
        fallback={
          <main className="flex min-h-full flex-1 items-center justify-center text-zinc-400">
            불러오는 중...
          </main>
        }
      >
        <TrainingEditor />
      </Suspense>
    </RequireAuth>
  );
}
