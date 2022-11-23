import { TestConfig } from "yup";

export const whileSpaceValidatory = (field: string = "") => {
  return {
    test: (value) => (value as string)?.trim() != "",
    message: field
      ? `${field} must not be white space`
      : "Must not be white space",
  } as TestConfig;
};

export const minArrayLengthValidatory = (
  length: number,
  field: string = ""
) => {
  return {
    test: (value) => (value as any[])?.length >= length,
    message: `Select at lease ${length} ${field || "item"}`,
  } as TestConfig;
};
