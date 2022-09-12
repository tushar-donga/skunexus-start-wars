export const fetchData = (link) => async (dispatch) => {
  let response = await fetch(link);
  response = await response.json();
  dispatch({
    type: "PLANET",
    payload: response.results,
  });
};

export const fetchFilms = (link) => async (dispatch) => {
  let response = await fetch(link);
  response = await response.json();
  dispatch({
    type: "FILMS",
    payload: response,
  });
};

export const fetchResident = (link) => async (dispatch) => {
  let response = await fetch(link);
  response = await response.json();
  dispatch({
    type: "RES",
    payload: response,
  });
};
