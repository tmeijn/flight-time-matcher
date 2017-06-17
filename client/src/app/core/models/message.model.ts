interface sentBy {
  avatar: string;
  email: string;
}

export class Message {
  _id?: string;
  sentBy: sentBy;
  text: string;
}