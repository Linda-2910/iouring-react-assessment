export interface PostCardProps {
  post: { id: number; title: string; body: string; userId: number };
  onEdit: (post: any) => void;
  onDelete: (id: number) => void;
}
