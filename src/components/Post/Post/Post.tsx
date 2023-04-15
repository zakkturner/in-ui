import PostCard from "@/components/Card/PostCard";

const Post = ({ post }) => {
  return (
    <PostCard>
      <div className="">{post.title}</div>
    </PostCard>
  );
};
