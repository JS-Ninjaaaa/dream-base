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
      <span className="text-gray-600">close</span>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={togglePrivacy}
          className="sr-only peer"
        />
        <div className="w-10 h-5 bg-gray-300 peer-focus:ring-4 peer-focus:ring-pink-200 rounded-full peer peer-checked:bg-pink-400 after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:border after:rounded-full after:transition-all after:left-1 after:top-0.5 peer-checked:after:translate-x-5"></div>
      </label>
      <span className="text-pink-500">open</span>
    </>
  );
};

export default MyDreamFormPrivacyToggle;
