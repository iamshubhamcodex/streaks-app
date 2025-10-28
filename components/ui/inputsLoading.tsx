import { Loader2 } from "lucide-react";

export default function InputLoading({
  loading,
}: {
  loading: boolean | undefined;
}) {
  if (!loading) return null;
  return (
    <span className="spin | h-4 w-4  aspect-square">
      <Loader2 size={16} stroke="currentcolor" className="aspect-square" />
    </span>
  );
}
