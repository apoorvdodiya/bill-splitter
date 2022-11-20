export const InLineLoader = (props: any) => {
  return (
    props.show && (
      <span className="inline-block animate-spin mx-1 h-3.5 w-3.5 rounded-full border border-l-2" />
    )
  );
};
