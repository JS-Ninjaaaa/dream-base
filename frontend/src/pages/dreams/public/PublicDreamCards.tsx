import { fetchPublicDreams } from "@/api/dreams/public";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Dream } from "@/types/dream";
import { AlertDialog } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import PublicDreamCard from "./card/PublicDreamCard";
import PublicDreamCardDialog from "./card/dialog/PublicDreamDardDialog";

const PublicDreamCards = () => {
  const [publicDreams, setPublicDreams] = useState<Dream[]>([]);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    const loadPublicDreams = async () => {
      try {
        setIsLoading(true);
        const dreams = await fetchPublicDreams();
        setPublicDreams(dreams);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadPublicDreams();
  }, []);

  return (
    <div className="px-8 pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {publicDreams.map((dream, index) => (
        <AlertDialog.Root key={index}>
          <PublicDreamCard dream={dream} setPublicDreams={setPublicDreams} />
          <PublicDreamCardDialog dream={dream} />
        </AlertDialog.Root>
      ))}
    </div>
  );
};

export default PublicDreamCards;
