const initialState = {
  planet: [],
  films: [],
  residents: [],
};

export const planetReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PLANET":
      return {
        ...state,
        planet: action.payload,
      };
    case "FILMS":
      return {
        ...state,
        planet: [action.payload],
      };
    case "RES":
      return {
        ...state,
        planet: [action.payload],
      };
    default:
      return state;
  }
};
