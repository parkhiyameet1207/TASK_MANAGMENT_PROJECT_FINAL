import "../styles/List.css";

import React, { Component, memo, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

// import Card from "./Card";
// import CardEditor from "./CardEditor";
// import ListEditor from "./ListEditor";
// import AddIcon from '@mui/icons-material/Add';

import shortid from "shortid";
import axios from "axios";
import { set } from "mongoose";
import NewTaskForm from "./NewTaskForm";
import CardEditor from "./CardEditor";
import Card from "./Card";
import { addCardAsyncData, ChangeListTitle, deleteListTitle, getAllCardAsyncData } from "../action";
import store from "../store";
import AddIcon from '@mui/icons-material/Add';
import Listeditor from "./Listeditor";


function List(props) {

  const card = useSelector(state => state.taskreducer.cardalldata);

  console.log("card :::::::::: >",card);

  const { listId, index, data } = props;
  const dispatch = useDispatch()
  const [listedit, setListedit] = useState(false);

  const [state, setState] = useState({
    editingTitle: false,
    title: data.title,
    addingCard: false
  });
  const { editingTitle, addingCard, title } = state;

  const [carddata, setCarddata] = useState(false)

  const filteredCards = card?.filter(card => card.listId === listId);

  const toggleAddingCard = () =>
    setState({ addingCard: !state.addingCard });
  const cardId = shortid.generate();
  const addCard = async (cardText) => {
console.log("card",filteredCards.length);

    toggleAddingCard();
    const data = {
      cardText,
      cardId,
      listId,
      index: filteredCards.length
    }

    dispatch(addCardAsyncData(data));

  };
  const toggleEditingTitle = () =>
    setState({ editingTitle: !state.editingTitle });

  const handleChangeTitle = e => setState({ title: e.target.value });

  const editListTitle = async (text) => {
    console.log("edited text", text);
    dispatch(ChangeListTitle(text, listId));
    toggleEditingTitle();
  };

  const deleteList = async () => {
    dispatch(deleteListTitle(listId));
    toggleEditingTitle();


  };



  useEffect(() => {
    dispatch(getAllCardAsyncData());
  }, [])

  return (

    <Draggable draggableId={data._id} index={index} >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="List"
        >
          {editingTitle ? (
            <Listeditor
              title={data.title}
              handleChangeTitle={handleChangeTitle}
              saveListdata={editListTitle}
              onClickOutside={editListTitle}
              deleteList={deleteList}
            />

          ) : (
            <div className="List-Title">
              <div className="list-title" onClick={toggleEditingTitle}>
                {data.title}
              </div>
              <div className="icon-more">
                {/* <MoreVertIcon /> */}
              </div>
            </div>
          )}

          <Droppable droppableId={data._id}>
            {(provided, _snapshot) => (
              <div ref={provided.innerRef} className="Lists-Cards">
                {
                  filteredCards ? filteredCards?.map((val, index) => (
                    <Card
                      key={index}
                      data={val}
                      index={index}
                      listId={val._id}
                    />
                  ))
                    : ''
                }

                {provided.placeholder}

                {addingCard ? (

                  <CardEditor
                    onSave={addCard}
                    onCancel={toggleAddingCard}
                    adding
                  />
                ) : (
                  <div className="Toggle-Add-Card" onClick={toggleAddingCard}>
                    <AddIcon sx={{ mr: 1, color: '#378CE7' }} />Add a card
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}


export default React.memo(List);



