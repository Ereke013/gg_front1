import {QuillModules} from 'ngx-quill';

export const PHONE_REGEXP = /^[\d+\-()\s]+$/;
export const EMAIL_REGEXP = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
export const PASS_REGEXP = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*?_+-]{8,}$/;
export const BIN_MASK = 'A{3} A{3} A{3} A{3} A{3} A{3} A{3} A{3} A{3} A{3} A{3} A{3} A{3} A{3} A{3} A{3} A{3} A{3} A{3} A{3} A{3} A{3} A{3}';

export const QUILL_EDITOR_CONFIG: QuillModules = {
  clipboard: {
    matchVisual: false,
  },
  toolbar: {
    container: [
      ['bold', 'italic', 'underline'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link'],
    ],
  },
};
