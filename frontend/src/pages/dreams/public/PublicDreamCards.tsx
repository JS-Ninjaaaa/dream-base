import { fetchPublicDreams } from "@/api/dreams/public";
import { LoadingContext } from "@/contexts/LoadingContext";
import { Dream } from "@/types/dream";
import { AlertDialog } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import PublicDreamCard from "./card/PublicDreamCard";
import PublicDreamCardDialog from './dialog/PublicDreamDardDialog'

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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {publicDreams.map((dream, index) => (
          <AlertDialog.Root key={index}>
              <PublicDreamCard
                dream={dream}
                setPublicDreams={setPublicDreams}
              />
            <PublicDreamCardDialog dream={dream} />
          </AlertDialog.Root>
        ))}
      </div>
  );
};

export default PublicDreamCards;
