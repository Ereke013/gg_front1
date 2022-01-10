export interface BoiSelectorRecord {
  boInstanceId: string;
  displayValues: string[];
  amount?: number;
  price?: number;
  cost?: number;

  // Не используется на сервере
  checked?: boolean;

  canEdit?: boolean;
  canDelete?: boolean;
  isRemoved?: boolean;
}
