export interface Message {
  id: string;
  text: string;
  username: string;
  userFio: string;
  userAvatarFileId: string;
  userId: string;
  createdAt: Date;
  replyMessageId: string;
  imageFileId: string;
}
