export type CommentWithUserInfoDto = {
  userDisplayName: string;
  userAvatar: string;
} & CommentFullDto;

export type CommentFullDto = {
  id: number;
  userId: string;
  guestId: string;
  isDeleted: boolean;
  isEdited: boolean;
  dateCreated: string;
  dateModified: string;
} & CommentCreateDto;

export type CommentCreateDto = {
  parentId?: number;
  content: string;
  ridePostId: number;
};
