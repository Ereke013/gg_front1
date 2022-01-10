import {EdsInfo, OtpInfo, SignDocument, SignatureType} from '@finance.workspace/shared/model';

export interface SignatureInfo {
  type: SignatureType;
  documents: SignDocument[];

  /* Заполнено если type === OTP */
  otpInfo: OtpInfo;
  /* Заполнено если type === EDS */
  edsInfo: EdsInfo;
}
