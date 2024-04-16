import { useSelector, useDispatch } from "react-redux";

function App() {
  return (
    <h1>
      Hi <ChildOne />
    </h1>
  );
}

function ChildOne() {
  const dispatch = useDispatch();
  const num = useSelector((state) => {
    return state.num;
  });
  const decrement = () => {
    dispatch({ type: "decrement", payload: "2" });
  };
  return (
    <>
      <h1>child one num: {num}</h1>
      <button onClick={decrement}>decrement</button>
    </>
  );
}

export default App;
