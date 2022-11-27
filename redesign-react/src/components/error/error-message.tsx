export const ErrorMessage = ({ form, control, error }: any) => {
  return (
    <div
      className="text-sm dark:text-red-300 text-red-600 mx-2"
      style={{ minHeight: "1.25rem" }}
    >
      {form?.touched && form?.errors && control
        ? form?.touched[control] && form?.errors[control]
        : error || ""}
    </div>
  );
};
