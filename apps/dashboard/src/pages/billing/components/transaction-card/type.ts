export interface File {
  filename: string;
  id: number | string;
  size: string;
  type: "image" | "pdf";
}
export interface Payment {
  isSuccess: boolean;
  time: string;
  title: string;
}
