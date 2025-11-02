import React from "react";
import { Box } from "@mui/material";
import PostCard from "../PostCard/PostCard";

const PostList = React.memo(({ data, onEdit, onDelete }: any) => {
  return (
    <Box mt={2} p={2} sx={{ maxHeight: "68vh", overflowY: "auto" }}>
      {data.map((p: any) => (
        <PostCard key={p.id} post={p} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </Box>
  );
});

export default PostList;
