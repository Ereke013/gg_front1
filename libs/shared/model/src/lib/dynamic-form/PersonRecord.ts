export interface PersonRecord {
  personId: string;
  surname: string;
  name: string;
  avatarFileId: string;
}

export const PersonRecordF = {
  getFio(person: PersonRecord): string {
    return (person?.surname || '') + ' ' + (person?.name || '');
  },
};