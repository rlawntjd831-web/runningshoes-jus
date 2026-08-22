import HomeDashboard from "@/components/HomeDashboard";
import RequireAuth from "@/components/RequireAuth";

export default function MyPage() {
  return (
    <RequireAuth>
      <HomeDashboard />
    </RequireAuth>
  );
}
