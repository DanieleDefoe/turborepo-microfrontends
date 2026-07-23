export type TalkRole = "user" | "system";
export type TalkMode = "deep-think" | "online";

export interface IMessage {
  content: string;
  role: TalkRole;
}

type TAIModel = "deepseek-chat";

export interface IChatReq {
  messages: IMessage[];
  model: TAIModel;
  stream: boolean;
}
