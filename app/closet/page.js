import ClosetManager from "@/components/ClosetManager";
import RequireAuth from "@/components/RequireAuth";

export default function ClosetPage() {
  return (
    <RequireAuth>
      <ClosetManager />
    </RequireAuth>
  );
}
