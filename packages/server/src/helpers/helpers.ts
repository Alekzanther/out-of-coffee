import { isValidObjectId } from 'mongoose';

export function checkIfIdsAreValid(ids: string[]) {
  for (let i = 0; i < ids.length; i++) {
    const isIdValid = isValidObjectId(ids[i]);
    if (!isIdValid) {
      return ids[i];
    }
  }
  return '';
}
