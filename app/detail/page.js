import DetailQuizApp from "@/components/DetailQuizApp";
import RequireAuth from "@/components/RequireAuth";

export default function DetailPage() {
  return (
    <RequireAuth>
      <DetailQuizApp />
    </RequireAuth>
  );
}
