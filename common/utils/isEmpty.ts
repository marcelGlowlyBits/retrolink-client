export const isEmpty = (value: string) => {
  return (
    value === null || (typeof value === "string" && value.trim().length === 0)
  );
};
