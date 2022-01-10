export interface FileInfo {
  fileId: string,
  name: string,
  size: number,
  data: Blob,
  base64data: string
  mimeType: string
}
