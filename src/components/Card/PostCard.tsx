const PostCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-sm lg:max-w-none rounded w-full shadow-lg flex">
      {children}
    </div>
  );
};

export default PostCard;
