const initialState = {
  searchId: "",
};

const searchIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_ID":
      return {
        ...state,
        searchId: action.payload,
      };
    default:
      return state;
  }
};

export default searchIdReducer;
