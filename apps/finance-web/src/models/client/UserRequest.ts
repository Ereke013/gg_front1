import {CodeResponse} from "@finance-web/models/response/CodeResponse";

export interface UserRequest {
  id: number,
  name: string,
  surname: string,
  patronymic: string,
  roles: string[],
  tokenId: string,
  codeResponse: CodeResponse
}
