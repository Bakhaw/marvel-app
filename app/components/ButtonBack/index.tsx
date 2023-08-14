import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

function ButtonBack() {
  const router = useRouter();

  return (
    <button className="text-white flex gap-2 text-sm" onClick={router.back}>
      <ArrowLeft /> go back
    </button>
  );
}

export default ButtonBack;
