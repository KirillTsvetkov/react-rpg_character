export function fetchTodos() {
    // fake fetch call
    return Promise.resolve([
      {
        id: "1",
        title: "todo1"
      },
      {
        id: "2",
        title: "todo2"
      },
      {
        id: "3",
        title: "todo3"
      },
      {
        id: "4",
        title: "todo4"
      }
    ]);
  }
  