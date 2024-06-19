import { useQuery } from "@tanstack/react-query";

function App() {
  const startTime = window.performance.now();

  const { data, isLoading, error } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  const endTime = window.performance.now();
  console.log("Load time:" + (endTime - startTime) + " ms");

  return (
    <div className="App">
      {data.map((todo: any) => (
        <div key={todo.id}>
          <h5>ID: {todo.id}</h5>
          <h6>Title: {todo.title}</h6>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
