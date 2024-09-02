import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import TextareaInput from "../inputs/TextareaInput";
import TextInput from "../inputs/TextInput";
import { useQueryClient } from "react-query";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/context/AuthContext";

const PostCardsAction = ({ post, address1, postId, category }) => {
  const { clients, admins, employees } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // Dropdown state
  const [showEditModal, setShowEditModal] = useState(false); // Edit modal state
  const [showTrashModal, setShowTrashModal] = useState(false); // Edit modal state

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleEditModal = () => {
    setShowEditModal(true);
    setIsOpen(false); // Close dropdown when opening edit modal
  };
  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const toggleTrashModal = () => {
    setShowTrashModal(true);
    setIsOpen(false); // Close dropdown when opening edit modal
  };

  const closeTrashModal = () => {
    setShowTrashModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [formData, setFormData] = useState({
    title: post?.title || "",
    post: post?.post || "",
    image: post?.image || null,
  });

  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithFile = new FormData();
    formDataWithFile.append("image", e.target.image.files[0] || formData.image);
    formDataWithFile.append("title", formData.title);
    formDataWithFile.append("post", formData.post);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/hall_room_post/${postId}`,
        {
          method: "PUT",
          body: formDataWithFile,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update admin data");
      }
      queryClient.invalidateQueries("client");

      setShowEditModal(false);
      window.location.reload();

      toast({
        description: "Hall Room Post updated successfully!",
      });
    } catch (error) {
      console.error("Error updating admin data:", error.message);
      // Handle error
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/hall_room_post/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete article");
      }

      // Close the trash modal after successful deletion
      setShowTrashModal(false);

      // Reload the page (optional, if needed)
      window.location.reload();

      toast({
        description: "Article deleted successfully!",
        status: "success",
      });
    } catch (error) {
      console.error("Error deleting article:", error.message);
      toast({
        description: "Failed to delete article",
        status: "error",
      });
    }
  };

  const handleEditAction = async (e) => {
    e.preventDefault();
    const formDataWithFile = new FormData();
    formDataWithFile.append("action", "edit");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/hall_room_post/${postId}`,
        {
          method: "PUT",
          body: formDataWithFile,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete article");
      }

      // console.log("res", response);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting article:", error.message);
      toast({
        description: "Failed to delete article",
        status: "error",
      });
    }
  };

  // Start Bookmarks
  const user_profile = clients || admins || employees;
  const [saveBookmark, setSaveBookmark] = useState({
    post_id: post?.id,
    user_id: user_profile?.profile_id || "",
  });
  const handleSaveBookmark = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/bookmark`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(saveBookmark),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save bookmark article");
      }
      toast({
        description: "Article save bookmark successfully!",
        status: "success",
      });

      // console.log("res", response);
      // window.location.reload();
    } catch (error) {
      console.error("Error save bookmark article:", error.message);
      toast({
        description: "Failed to save bookmark article",
        status: "error",
      });
    }
  };
  // Start Bookmarks

  return (
    <div>
      <div className="dropdown" onClick={toggleDropdown}>
        <button className="dropbtn">
          <BsThreeDots className="text-2xl rotate-90" />
        </button>
        {isOpen && (
          <div className="dropdown-content p-3 text-sm rounded-[8px]">
            {post?.client?.profile_id === clients?.profile_id ||
              (admins && (
                <>
                  <div className="dropdown" onClick={toggleEditModal}>
                    <button className="d_options p-3 rounded-[5px] w-full text-start">
                      Edit Post
                    </button>
                  </div>
                  <div className="dropdown" onClick={toggleTrashModal}>
                    <button className="d_options p-3 rounded-[5px] w-full text-start">
                      Move to trash
                    </button>
                  </div>
                </>
              ))}
            {admins && (
              <div>
                <div className="dropdown" onClick={handleEditAction}>
                  <button className="d_options p-3 rounded-[5px] w-full text-start">
                    Post Need Edit (Admin)
                  </button>
                </div>
                <div className=" border-2  "></div>
              </div>
            )}

            <button
              onClick={handleSaveBookmark}
              className="d_options p-3 rounded-[5px] w-full text-start"
            >
              Save Bookmark
            </button>

            <div className=" border-2  "></div>

            <button className="d_options p-3 rounded-[5px] w-full text-start">
              Report This Post
            </button>

            <button className="d_options p-3 rounded-[5px] w-full text-start">
              Share This Post
            </button>
          </div>
        )}
      </div>

      {/* Edit Post Modal */}
      {showEditModal && (
        <AlertDialog open={showEditModal} onClose={closeEditModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Post</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              <form
                className="mt-10 space-y-4"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                method="post"
              >
                <div>
                  <input
                    type="file"
                    id={"image"}
                    name="image"
                    // value={formData.image}
                    onChange={handleInputChange}
                    className="mb-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    placeholder="image"
                  />
                </div>
                <div>
                  <TextInput
                    label="Title"
                    labelClassName="text-green-600 font-semibold"
                    className="capitalize"
                    name="title"
                    value={formData?.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full">
                  <TextareaInput
                    className="w-full h-full whitespace-pre-line"
                    name="post"
                    label="What's on your mind.."
                    value={formData?.post}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Location */}
                <TextInput
                  label="Address"
                  labelClassName="text-green-600 font-semibold"
                  className="capitalize"
                  value={formData.division ? formData.division : address1}
                  onChange={handleInputChange}
                  disabled
                />

                {/* Category */}
                <TextInput
                  label="Category"
                  labelClassName="text-green-600 font-semibold"
                  className="capitalize"
                  value={formData.category ? formData.category : category}
                  onChange={handleInputChange}
                  disabled
                />

                <div className="w-full">
                  <Button className="w-full" type="submit">
                    Post
                  </Button>
                </div>
              </form>
            </AlertDialogDescription>
            <AlertDialogFooter>
              {/* Button to cancel editing */}
              <AlertDialogCancel onClick={closeEditModal}>
                Cancel
              </AlertDialogCancel>
              {/* Button to save changes */}
              {/* <AlertDialogAction onClick={closeEditModal}>
                Save Changes
              </AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {/* Trash */}
      {showTrashModal && (
        <AlertDialog open={showTrashModal} onClose={closeTrashModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-bold">
                Delete Article?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Are you sure you want to delete this article?
            </AlertDialogDescription>
            <AlertDialogFooter>
              {/* Button to confirm deletion */}
              <AlertDialogAction className="bg-red-600" onClick={handleDelete}>
                Delete
              </AlertDialogAction>
              {/* Button to cancel deletion */}
              <AlertDialogCancel onClick={closeTrashModal}>
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default PostCardsAction;
