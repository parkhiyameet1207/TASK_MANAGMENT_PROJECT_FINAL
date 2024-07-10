import axios from 'axios';

export const addAllListAsyncData = (data) => {
    return async (dispatch) => {
        await axios.post('http://localhost:5000/api/board/addlist', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            dispatch({
                type: 'ADD_LISTS',
                payload: res.data
            })
        });

    };
};

export const getAllListAsyncData = () => {
    return async (dispatch) => {
        await axios.get('http://localhost:5000/api/board/getlsit', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            dispatch({
                type: 'GET_LISTS',
                payload: res.data
            })
        });
    };
};


export const addCardAsyncData = (data) => {
    return async (dispatch) => {
        await axios.post('http://localhost:5000/api/board/addcard', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then((res) => {
            console.log("res.data :::::::::::::: >", res.data);
            dispatch({
                type: "ADD_CARD",
                payload: res.data
            });
        })

    }
}


export const getAllCardAsyncData = () => {
    return async (dispatch) => {
        await axios.get('http://localhost:5000/api/board/getcard').then((res) => {
            dispatch({
                type: "GET_CARDS",
                payload: res.data
            });
        })

    }
}

export const editCardTitleAsyncData = (data, id) => {
    return async (dispatch) => {
        await axios.put(
            `http://localhost:5000/api/board/lists/${id}`,
            { title: data },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((res) => {
            dispatch(
                {
                    type: "CHANGE_CARD_TEXT",
                    payload: res.data
                }
            )
        })

    };
};

export const deleteAsyncCardData = (id) => {
    console.log("delete id ;:::::::::::::::::: >", id);
    return async (dispatch) => {
        await axios.delete(
            `http://localhost:5000/api/board/lists/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((res) => {
            console.log("res delete ::::::::::::: >", res);
            dispatch(
                {
                    type: "DELETE_CARD",
                    payload: id
                }
            )
        })

    };
};





export const ChangeListTitle = (data, id) => {
    return async (dispatch) => {
        await axios.put(
            `http://localhost:5000/api/board/card/${id}`,
            { title: data },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((res) => {
            dispatch(
                {
                    type: "CHANGE_LIST_TEXT",
                    payload: res.data
                }
            )
        })

    };
};


export const deleteListTitle = (id) => {
    return async (dispatch) => {
        await axios.delete(
            `http://localhost:5000/api/board/listdata/${id}`,
        ).then((res) => {
            if (res.data) {
                dispatch(
                    {
                        type: "LIST_DATA_DELETE",
                        payload: id
                    }
                )
            }
        })

    };
};


export const moveCardPosition = (data) => {
    return async (dispatch) => {
        axios.put('http://localhost:5000/api/board/cardmove', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log("res ponse move position :::::: >", res.data);

            dispatch({
                type: "MOVE_CARD",
                payload: res.data
            })
        })

    }
}

export const MovelistPosition = (data) => {
    return async (dispatch) => {
        axios.put('http://localhost:5000/api/board/listmove', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log("res ponse list move position :::::: >", res.data);
            dispatch({
                type: "MOVE_LIST",
                payload: res.data
            })
        })
    }
}