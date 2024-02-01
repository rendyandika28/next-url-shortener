export const generateFormData = <T = Record<string, unknown | unknown[]>>(
  forms: T
): FormData => {
  const formData = new FormData();

  for (const name in forms) {
    if (Array.isArray(forms[name as keyof T])) {
      (forms[name as keyof T] as unknown[]).forEach((value: any, index) => {
        for (const property in value) {
          formData.append(
            `${name}[${index}][${property}]`,
            value[property] as string | File
          );
        }
      });
    } else {
      formData.append(name, forms[name as keyof T] as string | File);
    }
  }

  return formData;
};

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export const generateRandomSlug = (length: number) => {
  // Ensure the length is at least 5
  length = Math.max(length, 5);

  let result = "";
  const charactersLength = characters.length;
  let counter = 0;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
};
