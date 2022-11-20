export const ErrorMessage = ({ error }: any) => {
  return (
    <div
      className="text-sm dark:text-red-300 text-red-600 mx-2"
      style={{ height: "1.25rem" }}
    >
      {error || ""}
    </div>
  );
};
