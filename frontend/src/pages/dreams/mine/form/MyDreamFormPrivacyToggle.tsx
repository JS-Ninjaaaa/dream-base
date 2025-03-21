interface MyDreamFormPrivacyToggleProps {
  isPublic: boolean;
  togglePrivacy: () => void;
}

const MyDreamFormPrivacyToggle = ({
  isPublic,
  togglePrivacy,
}: MyDreamFormPrivacyToggleProps) => {
  return (
    <>
      <span className="text-lg text-gray-600">非公開</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={togglePrivacy}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-400"></div>
      </label>
      <span className="text-lg text-pink-500">公開</span>
    </>
  );
};

export default MyDreamFormPrivacyToggle;
