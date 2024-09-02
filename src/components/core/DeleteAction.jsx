import { useState, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { AiFillWarning } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import { useMutation, useQueryClient } from "react-query";

const DeleteAction = ({ handleDeleteSubmit, isLoading, link }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteAdminMutation = useMutation(
    async () => {
      const url = `${
        import.meta.env.VITE_LOCAL_API_URL
      }/${link}/${handleDeleteSubmit}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete admin");
      }

      return response.json(); // Assuming the API returns some data after successful deletion
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("admins" || "clients");
        toast({
          description: "Deleted Successfully!",
        });
        window.location.reload();

        setOpen(false); // Close the dialog after successful deletion
      },
      onError: (error) => {
        // Handle errors from the delete operation
        console.error("Delete  error:", error);
        toast({
          description: "Failed to delete ",
          type: "error",
        });
      },
    }
  );

  const handleDelete = useCallback(async () => {
    try {
      await deleteAdminMutation.mutateAsync();
    } catch (error) {
      console.error("Delete  error:", error);
      toast({
        description: "Failed to delete",
        type: "error",
      });
    }
  }, [deleteAdminMutation]);

  // const handleDelete = useCallback(async () => {
  //   try {
  //     const url = `${
  //       import.meta.env.VITE_LOCAL_API_URL
  //     }/api/v1/admin/${handleDeleteSubmit}`;
  //     const response = await fetch(url, {
  //       method: "DELETE",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to delete admin");
  //     }

  //     toast({
  //       description: `Deleted Successfully!`,
  //     });
  //     setOpen(!open);
  //   } catch (err) {
  //     for (let key of err.errors) {
  //       toast({
  //         description: `${key?.attr}- ${key?.detail}`,
  //       });
  //     }
  //   }
  // }, [handleDeleteSubmit, open]);

  return (
    <div>
      <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
        <div onClick={() => setOpen(!open)} className="cursor-pointer">
          <TiDelete className="text-red-500 text-4xl" />
        </div>
        <AlertDialogContent className="py-10">
          <div>
            <div className="flex justify-center pb-3">
              <p className="">
                <AiFillWarning className="text-red-500 text-7xl" />
              </p>
            </div>
            <h3 className="text-2xl font-semibold  text-center">
              Confirm Delete
            </h3>
            <p className=" text-center py-2">
              Are you sure you want to <br /> delete this file?
            </p>
          </div>
          <div className="flex justify-center gap-8 ">
            <Button variant="outline" onClick={() => setOpen(!open)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-accent_main hover:bg-accent_main text-white rounded-lg"
              disabled={isLoading}
            >
              Delete
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteAction;
