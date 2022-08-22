export const CHANGE_PASSWORD_DEFAULT_EXCEPTION = {
  code: 'CHANGE_PASSWORD_DEFAULT_EXCEPTION',
  error: {
    message: 'Change Your Password Default',
  },
};
export const MAHASISWA_NOT_FOUND_EXCEPTION = {
  code: 'MAHASISWA_NOT_FOUND_EXCEPTION',
  error: {
    message: 'Mahasiswa not found with nim / email',
  },
};
export const WRONG_PASSWORD_EXCEPTION = {
  code: 'WRONG_PASSWORD_EXCEPTION',
  error: {
    message: 'Your password is invalid, please try again',
  },
};

export const NEW_PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH = {
  code: 'NEW_PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCH',
  error: {
    message:
      'Your new password and confirm password does not match, please try again',
  },
};

export const PASSWORD_AND_NEW_PASSWORD_ALREADY_SAME = {
  code: 'PASSWORD_AND_NEW_PASSWORD_ALREADY_SAME',
  error: {
    message:
      'Your current password and new password already same, please try again',
  },
};

export const WRONG_IMEI_EXCEPTION = {
  code: 'WRONG_IMEI_EXCEPTION',
  error: {
    message:
      'Your imei is invalid, make sure your imei is registered with this account',
  },
};

export const MAHASISWA_IS_INACTIVE = {
  code: 'MAHASISWA_IS_INACTIVE',
  error: {
    message: 'Mahasiswa is inactive, please contact admin.',
  },
};
