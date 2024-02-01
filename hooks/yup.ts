import { useCallback } from "react";
import { AnyObjectSchema, ValidationError } from "yup";

export const useYupValidationResolver = (validationSchema: AnyObjectSchema) =>
  useCallback(
    async (data: unknown) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        if (errors instanceof ValidationError) {
          return {
            values: {},
            errors: errors.inner.reduce(
              (allErrors, currentError) => ({
                ...allErrors,
                [currentError.path as string]: {
                  type: currentError.type ?? "validation",
                  message: currentError.message,
                },
              }),
              {}
            ),
          };
        }
      }
    },
    [validationSchema]
  );
