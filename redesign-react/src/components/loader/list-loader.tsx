export const ListLoader = (props: any) => {
  return (
    props.show && (
      <div className="text-center">
        <span className="inline-block animate-spin mx-1 h-8 w-8 rounded-full border border-l-2" />
      </div>
    )
  );
};
