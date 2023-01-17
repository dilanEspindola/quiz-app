interface TypeWithKey<T> {
  [key: string]: T;
}

export const validationError = (error: any) => {
  const codeMatcher: TypeWithKey<string> = {
    "Duplicate entry": "USERNAME_OR_EMAIL_ALREADY_EXISTS",
  };

  if (error.includes("Duplicate entry")) {
    error = error.split(" ").splice(0, 2).join(" ");
    return codeMatcher[error];
  }

  return codeMatcher[error];
};
