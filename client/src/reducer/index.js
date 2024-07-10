const intial = {
    lists: [],
    listAlldata: [],
    cards: [],
    cardalldata: []
}

const taskreducer = (state = intial, action) => {
    switch (action.type) {
        case 'ADD_LISTS':
            return {
                ...state,
                listAlldata: [...state.listAlldata, action.payload]
            }
        case 'GET_LISTS':
            return {
                ...state,
                listAlldata: action.payload
            }

        case 'ADD_CARD': {
            const { listId } = action.payload;
            const updatedListAlldata = state.listAlldata.map(list => {
                if (list._id === listId) {
                    return {
                        ...list,
                        subtasks: [...list.subtasks, action.payload]
                    };
                }
                return list;
            });

            return {
                ...state,
                listAlldata: updatedListAlldata,
                cardalldata: [...state.cardalldata, action.payload]
            };
        }


        case "GET_CARDS": {
            return {
                ...state,
                cardalldata: action.payload
            }
        }

        case 'MOVE_CARD':
    
            return {
                ...state,
                cardalldata: action.payload
            }


        case 'CHANGE_CARD_TEXT':
            const allcard = state.cardalldata
            const respoae = allcard.findIndex((card) => card._id === action.payload._id);
            allcard[respoae].title = action.payload.title;
            return {
                ...state,
                cardalldata: [...state.cardalldata, [allcard]]
            }

        case 'DELETE_CARD':
            const allcarddata = state.cardalldata
            const result = allcarddata.findIndex((card) => card._id === action.payload)
            allcarddata.splice(result, 1)
            return {
                ...state,
                cardalldata: [...state.cardalldata, [allcarddata]]
            }


        case 'CHANGE_LIST_TEXT':
            const alllist = state.listAlldata.map(list =>
                list._id === action.payload._id
                    ? { ...list, title: action.payload.title }
                    : list
            );
            return { ...state, listAlldata: alllist };

        case 'LIST_DATA_DELETE': {
            const alllistdata = [...state.listAlldata];
            const deletindex = alllistdata.findIndex((list) => list._id === action.payload);

            if (deletindex !== -1) {
                alllistdata.splice(deletindex, 1);
            }

            return {
                ...state,
                listAlldata: alllistdata
            };
        }

        case 'MOVE_LIST':
            return {
                ...state,
                listAlldata: action.payload
            };
           
        default:
            return state

    }
}

export default taskreducer;



