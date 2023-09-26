import { ApplicationException } from '../../common';

export class InvalidPhoneNumberFormatException extends ApplicationException {
  constructor() {
    super(
      `Invalid format for phone number. You must use the phone number format with leading +41 without 0, e.g. +41 79 123 45 76, +41 79 123 5235.`,
    );
  }
}
