import { AxiosError } from "axios";

export type OnlyKeys = keyof typeof CODE_MATCHER;

export const CODE_MATCHER = {
  ERR_NETWORK: "Oops there's a problem in the network :(",
  ERR_BAD_OPTION: "error bad option",
  USERNAME_OR_EMAIL_ALREADY_EXISTS: "username or email already exists",
  PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS:
    "password must be at least 6 characters",
  UNEXPECTED_ERROR: "something went wrong",
  USER_NOT_FOUND: "user does not exist",
  INVALID_PASSWORD: "invalid password",
};

export const errorHandleHttp = (error: any) => {
  if (error instanceof AxiosError && error.response?.data) {
    if (Array.isArray(error.response.data?.message)) {
      return CODE_MATCHER[error.response.data.message[0] as OnlyKeys];
    }
    return CODE_MATCHER[error.response.data?.message as OnlyKeys];
  }

  if (error instanceof AxiosError) {
    return CODE_MATCHER[error.code as OnlyKeys];
  }

  return CODE_MATCHER["UNEXPECTED_ERROR" as OnlyKeys];
};
