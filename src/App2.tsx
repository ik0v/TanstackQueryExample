import { useQuery, useMutation } from "@tanstack/react-query";

function App() {
  const startTime = window.performance.now();

  const { data, isLoading, error } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
  });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newPost: any) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }).then((resp) => resp.json),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || isError) return <p>Error loading data</p>;
  if (isError) return <p>Error mutating data</p>;

  const endTime = window.performance.now();
  console.log("Load time:" + (endTime - startTime) + " ms");

  return (
    <div className="App">
      {isPending && <p>Data is being added...</p>}
      <button
        onClick={() =>
          mutate({
            userId: 7643,
            id: 5601,
            title: "Hey from ik",
            body: "Body of this post",
          })
        }
      >
        Add Post
      </button>

      {data.map((todo: any) => (
        <div key={todo.id}>
          <h4>ID: {todo.id}</h4>
          <h5>Title: {todo.title}</h5>
          <p>{todo.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
