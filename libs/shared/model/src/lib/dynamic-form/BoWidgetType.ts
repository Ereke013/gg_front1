export enum BoWidgetType {
  SIGNATURE = 'SIGNATURE',
  BUTTON = 'BUTTON',
}

export const BoWidgetTypeF = {
  uiValue(field: BoWidgetType) {
    return 'form_widget_type_' + field.toString().toLowerCase();
  },
};
