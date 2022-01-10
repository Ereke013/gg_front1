import {EventColor} from 'calendar-utils';

export class ColorUtil {

  public static presetColors: string[] = [
    '#ff0000', '#ff6500', '#ffd600', '#27ff00',
    '#00d9ff', '#0048ff', '#6609ff', '#990202',
    '#ff7c5e', '#d3a52f', '#118607', '#04a59f',
    '#00336c', '#630078',
    '#ff8081', '#c3744a',
    '#294b0b', '#6797fa',
    '#000000',
  ];

  public static darkPresetColors: string[] = [
    '#000000',
    '#9c0000',
    '#166800',
    '#684300',
    '#003768',
    '#680066',
    '#680015',

  ];

  public static getRandomColor(): string {

    const index = Math.floor(Math.random() * this.presetColors.length);

    return this.presetColors[index];

  }
}

export const calendarColors: {
  blue: EventColor,
  silver: EventColor
} = {
  blue: {
    primary: '#74A1E3',
    secondary: '#74A1E3',
  },
  silver: {
    secondary: '#F8F8F8',
    primary: '#E4E4E4',
  },
};
