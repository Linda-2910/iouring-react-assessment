import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import type { PostCardProps } from "./PostCard.types";

export default function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  return (
    <Card
      sx={{
        mt: 4,
        mb: 2,
        position: "relative",
        borderRadius: 3,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          transform: "translateY(-3px)",
        },
      }}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          User ID: {post.userId}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {post.title}
        </Typography>
        <Typography sx={{ mb: 1.5, whiteSpace: "pre-line" }}>
          {post.body}
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            display: "flex",
            gap: 2,
          }}
        >
          <Tooltip title="Edit">
            <IconButton
              onClick={() => onEdit(post)}
              color="primary"
              size="large"
              sx={{
                bgcolor: "rgba(25,118,210,0.1)",
                "&:hover": { bgcolor: "rgba(25,118,210,0.2)" },
              }}
            >
              <EditIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => onDelete(post.id)}
              color="error"
              size="large"
              sx={{
                bgcolor: "rgba(211,47,47,0.1)",
                "&:hover": { bgcolor: "rgba(211,47,47,0.2)" },
              }}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}
