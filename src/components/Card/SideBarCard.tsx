const SideBarCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-xs h-fit hidden bg-white xl:!block rounded w-full overflow-hidden shadow-lg">
      {children}
    </div>
  );
};

export default SideBarCard;
