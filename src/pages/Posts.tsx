import AddIcon from "@mui/icons-material/Add";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CreatePostDialog from "../components/CreatePostDialog/CreatePostDialog";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import PostList from "../components/PostList/PostList";
import withLoader from "../hoc/withLoader";
import { addPost, deletePost, setPosts, updatePost } from "../redux/slice";
import type { AppDispatch, RootState } from "../redux/store";
import {
  createPost,
  deletePostApi,
  fetchPosts,
  updatePostApi,
} from "../services/apiService";

export default function Posts() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.list);
  const username = localStorage.getItem("username");

  const [edit, setEdit] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [createDialog, setCreateDialog] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const PostListWithLoader = withLoader(PostList);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPosts();
        dispatch(setPosts(data));
      } catch (error: any) {
        toast.error(
          error.message || "Something went wrong while fetching posts!"
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  const handleCreate = async (form: any) => {
    setCreateLoading(true);
    try {
      const newPost = await createPost(form);
      dispatch(addPost(newPost));
      setCreateDialog(false);
      toast.success("Post created successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to create post.");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdate = async () => {
    setUpdateLoading(true);
    try {
      const updated = await updatePostApi(edit.id, edit);
      dispatch(updatePost(updated));
      setEdit(null);
      toast.info("Post updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update post.");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      if (deleteConfirm === null) return;
      await deletePostApi(deleteConfirm);
      dispatch(deletePost(deleteConfirm));
      setDeleteConfirm(null);
      toast.error("Post deleted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete post.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Box>
      <Header username={username} />

      {/* Create Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: 12,
          px: 3,
        }}
      >
        <LoadingButton
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
          size="large"
          loading={createLoading}
          loadingPosition="start"
          onClick={() => setCreateDialog(true)}
        >
          Create Post
        </LoadingButton>
      </Box>

      <PostListWithLoader
        loading={loading}
        data={posts}
        onEdit={setEdit}
        onDelete={(id: number) => setDeleteConfirm(id)}
      />

      {/* Create Dialog */}
      <CreatePostDialog
        open={createDialog}
        onClose={() => setCreateDialog(false)}
        onCreate={handleCreate}
        loading={createLoading}
      />

      {/* Edit Dialog */}
      <Dialog
        open={!!edit}
        onClose={() => setEdit(null)}
        fullWidth
        disableScrollLock
      >
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Title"
            value={edit?.title || ""}
            onChange={(e) => setEdit({ ...edit, title: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Body"
            multiline
            minRows={3}
            value={edit?.body || ""}
            onChange={(e) => setEdit({ ...edit, body: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setEdit(null)}>
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            onClick={handleUpdate}
            loading={updateLoading}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        disableScrollLock
      >
        <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
        <DialogActions>
          <Button variant="outlined" onClick={() => setDeleteConfirm(null)}>
            Cancel
          </Button>
          <LoadingButton
            color="error"
            variant="contained"
            onClick={handleDelete}
            loading={deleteLoading}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Footer />
    </Box>
  );
}
