import useGetPaidImageData from "@/components/hooks/paidImage/paidImage";
import { Input } from "@/components/ui/input";
import { formattedTime } from "@/utils/getPostTime";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

// search field
const PostsSearchField = () => {
  return (
    <div className="flex border border-slate-500 rounded-[8px] items-center ">
      <Input className="border-none" placeholder="Search Post..." />
      <div className="pr-3">
        <FaSearch />
      </div>
    </div>
  );
};

// posts short details
const PopularPostsShortDetailsCard = ({
  image,
  title,
  posted_time,
  posts_url,
}) => {
  return (
    <Link to={posts_url ? posts_url : "#"} className="flex gap-3 items-center ">
      <div className="w-1/4">
        <img
          className="w-16 h-16 rounded-full"
          src={
            image ===
              "https://static.vecteezy.com/system/resources/previews/011/675/374/original/man-avatar-image-for-profile-png.png" ||
            image ===
              "https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png"
              ? image
              : `${
                  import.meta.env.VITE_LOCAL_API_URL
                }/api/v1/images/uploads/${image}`
          }
          alt={title ? title : "Gaming PC Core i5 4th Gen 8GB RAM 1TB HDD"}
        />
      </div>
      <div className="w-3/4">
        <p className="font-bold">
          {title
            ? title.length > 25
              ? title.slice(0, 25) + "..."
              : title
            : "Gaming PC Core i5 4th Gen 8GB RAM 1TB HDD"}
        </p>
        <p>{posted_time ? posted_time : "Feb, 6th 2024 10:35 AM"}</p>
      </div>
    </Link>
  );
};

const PopularPostAside = () => {
  const [paidImagePosts, loading, error] = useGetPaidImageData(
    `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/paid_image`
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <aside className="p-3 pb-16 space-y-8 bg-white">
      <h3 className="text-xl md:text-2xl xl:text-3xl font-semibold ">
        Important Post
      </h3>
      <div>
        <PostsSearchField />
      </div>
      <div className="space-y-4">
        {paidImagePosts.map((post) => (
          <div key={Math.random()}>
            <PopularPostsShortDetailsCard
              image={post.image}
              title={post.title}
              posts_url={`/paid-image-post/${post.id}`}
              posted_time={formattedTime(post.created_at)}
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default PopularPostAside;
