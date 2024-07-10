import shortid from "shortid";

export default function seed(store) {
  const firstListId = shortid.generate();

  // store.dispatch({
  //   type: "ADD_LIST",
  //   payload: { listId: firstListId, listTitle: "First list" }
  // });


  // const secondListId = shortid.generate();

  // store.dispatch({
  //   type: "ADD_LIST",
  //   payload: { listId: secondListId, listTitle: "Second list" }
  // });


};
