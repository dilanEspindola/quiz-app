interface TypeWithKey<T> {
  [key: string]: T;
}

export const validationError = (error: any) => {
  const codeMatcher: TypeWithKey<string> = {
    "Duplicate entry": "USERNAME_OR_EMAIL_ALREADY_EXISTS",
    "invalid token": "you must provide a valid token",
    "jwt must be provided": "A token must be provided",
  };

  if (error.includes("Duplicate entry")) {
    error = error.split(" ").splice(0, 2).join(" ");
    return codeMatcher[error];
  }

  return codeMatcher[error];
};
