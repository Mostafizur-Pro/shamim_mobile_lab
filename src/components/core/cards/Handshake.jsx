import disLikeIcon from "@/assets/like/dislike.png";
import likeIcon from "@/assets/like/like.png";
import { useState } from "react";
import { useAuth } from "@/components/context/AuthContext";
import { QueryClient, useMutation, useQuery } from "react-query";
import { PiShareFat } from "react-icons/pi";
import CustomSpinner from "../spinner/Spinner";

const Handshake = ({ post }) => {
  const queryClient = new QueryClient();
  const { clients, employees, admins, users } = useAuth();

  const LikeId =
    clients?.profile_id ||
    employees?.profile_id ||
    admins?.profile_id ||
    users?.profile_id;

  const likes = JSON.parse(post?.like) || [];
  const [isLiked, setIsLiked] = useState(likes.includes(LikeId));

  const {
    data: postData,
    isLoading,
    refetch,
  } = useQuery(["post", post.id], async () => {
    const response = await fetch(
      `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/hall_room_post/${post.id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    return response.json();
  });

  // Mutation function for updating likes
  const { mutate } = useMutation(
    ({ postId, clientId, action }) => {
      return fetch(
        `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/hall_room_post/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId, clientId, action }),
        }
      );
    },
    {
      onSuccess: () => {
        setIsLiked((prev) => !prev);
        refetch();
        // Toggle isLiked state on success
      },
      onError: (error) => {
        console.error("Failed to update like:", error);
      },
      onSettled: () => {
        // Refetch post data after updating likes
        queryClient.invalidateQueries(["post", post.id]);
        refetch();
      },
    }
  );

  const handleLikeClick = async () => {
    const action = isLiked ? "unlike" : "like";
    mutate({ postId: post.id, clientId: LikeId, action });
    refetch();
  };

  if (isLoading)
    return (
      <p>
        <CustomSpinner />
      </p>
    );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center -space-x-4">
          <div className="pr-3">
            <button onClick={handleLikeClick}>
              {isLiked ? (
                <>
                  <img src={likeIcon} className="w-6 h-6" alt="Liked" />
                </>
              ) : (
                <img src={disLikeIcon} className="w-6 h-6" alt="Not Liked" />
              )}
            </button>
          </div>
          <div className="px-2">
            {postData?.data?.like &&
              JSON.parse(postData?.data?.like).length !== 0 && (
                <div>
                  <p>
                    {JSON.parse(postData?.data?.like).length}{" "}
                    {JSON.parse(postData?.data?.like).length === 1
                      ? "like"
                      : "likes"}
                  </p>
                </div>
              )}
          </div>
        </div>
        <div className="text-2xl">
          <PiShareFat />
        </div>
      </div>
    </div>
  );
};
export default Handshake;
