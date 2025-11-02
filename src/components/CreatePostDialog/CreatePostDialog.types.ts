export interface CreatePostDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (post: {
    title: string;
    body: string;
    userId: number;
  }) => Promise<void> | void;
  loading?: boolean;
}
