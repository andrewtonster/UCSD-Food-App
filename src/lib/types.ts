// lib/types.ts
export type UserDTO = {
  id: string;
  name: string | null;
  email: string | null;
  profileImg: string;
};

export type ReviewDTO = {
  id: string;
  comment: string;
  rating: number;
  restaurantId: string; // must always be present
  userId: string;
  createdAt: Date; // ISO string
  user: UserDTO | null;
};
export type FieldErrors = {
  comment?: string[];
  rating?: string[];
  restaurantId: string[];
  userId?: string[];
};

export type ReviewActionState = {
  ok: boolean;
  message: string;
  review: ReviewDTO | null;
  errors?: FieldErrors;
};
