const UserSettings = ({ close }: { close: Function }) => {
  return (
    <div className="fixed top-0 z-10 left-0 bg-[rgba(255,255,255,0.5)] flex items-center justify-center">
      <div className="bg-red-400">user settings</div>
    </div>
  );
};

export default UserSettings;
