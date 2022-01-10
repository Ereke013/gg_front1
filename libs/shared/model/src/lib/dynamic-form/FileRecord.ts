export interface FileRecord {
  id: string;
  name: string;
  percentDone: number;
  localId: string; // временный идентификатор файла на стороне клиента, пока не будет загружен польностью на сервер
}
