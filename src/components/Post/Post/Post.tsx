import PostCard from "@/components/Card/PostCard";

const Post = ({ post }: { post: any }) => {
  return (
    <PostCard>
      <div className="">{post.title}</div>
    </PostCard>
  );
};
