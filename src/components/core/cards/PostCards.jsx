import { Link } from "react-router-dom";
import { useState } from "react";
import Handshake from "./Handshake";
import PostCardsAction from "./PostCardsAction";

//default component
const PostCards = ({ post, posted_time, isNotWhite }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const user_image = post?.client?.image;
  const user_name = post?.client?.name;

  // console.log("post", post);

  return (
    <div
      className={`${
        isNotWhite && "bg-slate-200/30"
      } bg-white shadow-sm rounded-[8px] p-3 md:p-5 space-y-5`}
    >
      {/* user info */}
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to={`/profile/${post?.client?.profile_id}`}>
            <img
              className="w-12 h-12 rounded-full"
              src={
                user_image ===
                  "https://static.vecteezy.com/system/resources/previews/011/675/374/original/man-avatar-image-for-profile-png.png" ||
                user_image ===
                  "https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png"
                  ? user_image
                  : `${
                      import.meta.env.VITE_LOCAL_API_URL
                    }/api/v1/images/uploads/${user_image}`
              }
              alt={user_name}
            />
          </Link>
          <div className="capitalize">
            <Link
              to={`/profile/${post?.client?.profile_id}`}
              className="font-semibold hover:text-blue-500 transition-all"
            >
              {user_name ? user_name : "Unknown User"}
            </Link>

            <div className="flex items-center gap-3">
              <p className="text-slate-500 text-xs grow">
                {posted_time} |
                <span className="text-slate-500 text-xs">
                  {" "}
                  {`${post.thana}, ${post.district}`}
                </span>
              </p>{" "}
            </div>
          </div>
        </div>
        <div>
          <PostCardsAction
            post={post}
            postId={post?.id}
            address1={`${post.road},${post.localArea},${post.ward}, ${post.thana}, ${post.district}`}
            category={`${post.subcategories}, ${post.category}`}
          />
        </div>
      </div>

      {/* post Info */}

      <div className="space-y-3">
        {post?.image && (
          <>
            <h4 className="text-xl font-semibold md:text-2xl">{post?.title}</h4>
            <div>
              {showFullDescription ? (
                <>
                  <p>{post?.post}</p>
                  <button onClick={toggleDescription} className="text-blue-500">
                    Show Less
                  </button>
                </>
              ) : (
                <>
                  <p>{post?.post?.slice(0, 340)}</p>
                  {post?.post?.length > 340 && (
                    <button
                      onClick={toggleDescription}
                      className="text-blue-500"
                    >
                      Show More
                    </button>
                  )}
                </>
              )}
            </div>

            <div>
              <img
                className="w-full object-contain max-h-[280px] mx-auto"
                src={`${
                  import.meta.env.VITE_LOCAL_API_URL
                }/api/v1/images/uploads/${post?.image}`}
                alt={post?.title}
                loading="lazy"
              />
            </div>
          </>
        )}

        <div className="p-3 border-t">
          <Handshake post={post} />
        </div>
      </div>
    </div>
  );
};

export default PostCards;
