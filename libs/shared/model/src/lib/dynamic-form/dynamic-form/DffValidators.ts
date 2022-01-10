import {BoFieldType, FormField} from '@finance.workspace/shared/model';
import {DffValidator, DffValue} from '@finance.workspace/dynamic-form';
import {EMAIL_REGEXP, PHONE_REGEXP} from '@finance.workspace/shared/util';

export function createValidators(field: FormField): DffValidator[] {
  const ret: DffValidator[] = [];
  if (field.isRequired) {
    ret.push(new DffValidator_Required());
  }
  if (field.type === BoFieldType.INPUT_PHONE) {
    ret.push(new DffValidator_Regex(PHONE_REGEXP, 'validate_need_phone'));
  }
  if (field.type === BoFieldType.INPUT_EMAIL) {
    ret.push(new DffValidator_Regex(EMAIL_REGEXP, 'validate_need_email'));
  }

  return ret;
}

class DffValidator_Required implements DffValidator {

  validate(value: DffValue): string | undefined {
    return value.isEmpty() ? 'validate_required' : undefined;
  }

}


class DffValidator_Regex implements DffValidator {

  constructor(
    public readonly regex: RegExp,
    public readonly errText: string,
  ) {}

  validate(value: DffValue): string | undefined {
    if (value.isEmpty()) { return undefined; }
    return this.regex.test(value.storedValue()) ? undefined : this.errText;
  }

}

