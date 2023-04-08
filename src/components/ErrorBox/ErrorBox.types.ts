export type ErrorBoxProps = {
  error: string | null;
  onClose: () => void;
  children: React.ReactNode;
};
