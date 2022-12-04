import { useEffect, useState } from "react";

export const Settings = () => {
  const [aState, setAState] = useState(false);
  const [count, setCount] = useState(0);
  const aFunction = () => {
    console.log(aState)
    setAState(!aState);
    console.log(setAState(s => s))
    // setCount(count + 1)
  };
  useEffect(() => {
    console.log("effect");
  }, [aFunction]);
  return (
    <>
      Settings coming soon
      <div onClick={aFunction}>Click me</div>
      <div>{JSON.stringify(aState)}</div>
      <div>{count}</div>
    </>
  );
};
