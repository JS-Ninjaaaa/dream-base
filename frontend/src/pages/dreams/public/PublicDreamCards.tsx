import { Dream } from "@/types/dream";
import { AlertDialog } from "@radix-ui/themes";
import PublicDreamCard from "./card/PublicDreamCard";
import PublicDreamCardDialog from "./dialog/PublicDreamCardDialog";

interface Propes {
  publicDreams: Dream[];
  updatePublicDreams: () => Promise<void>;
}

const PublicDreamCards = ({ publicDreams, updatePublicDreams }: Propes) => {
  return (
    <div className="px-8 pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {publicDreams.map((dream, index) => (
        <AlertDialog.Root key={index}>
          <PublicDreamCard
            dream={dream}
            updatePublicDreams={updatePublicDreams}
          />
          <PublicDreamCardDialog dream={dream} />
        </AlertDialog.Root>
      ))}
    </div>
  );
};

export default PublicDreamCards;
