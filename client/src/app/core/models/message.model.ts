interface sentBy {
  avatar: string;
  email: string;
  username: string;
}

export class Message {
  _id?: string;
  userId?: string;
  sentBy: sentBy;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}