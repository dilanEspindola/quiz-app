interface TypeWithKey<T> {
  [key: string]: T;
}

export const validationError = (error: any) => {
  const codeMatcher: TypeWithKey<string> = {
    "Duplicate entry": "USERNAME_OR_EMAIL_ALREADY_EXISTS",
    "invalid token": "you must provide a valid token",
    "jwt must be provided": "there's not a token",
    "jwt malformed": "invalid token",
    "jwt expired": "invalid token",
    USER_NOT_FOUND: "user not found",
  };

  if (error.includes("Duplicate entry")) {
    error = error.split(" ").splice(0, 2).join(" ");
    return codeMatcher[error];
  }

  return codeMatcher[error] ?? "oops something went wrong";
};
