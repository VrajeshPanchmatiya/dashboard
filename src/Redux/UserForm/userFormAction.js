import { Data, Delete, Edit, Searching, Sorting, SortingCharacter } from "./type";
// UserForm Action
export const userFormAction = (form) => {
  return (dispatch) => {
    dispatch({ type: Data, payload: form });
  };
};

// Sorting Age Action
export const sortingAction = (currentsort) => {
  return (dispatch) => {
    dispatch({ type: Sorting, currentsort: currentsort });
  };
};

// Sorting Character Action
export const sortingCharacterAction = (key, setConfig) => {
  return (dispatch) => {
    dispatch({ type: SortingCharacter, key: key, setConfig: setConfig });
  };
};

//Search Action
export const searchAction = (find) => {
  return (dispatch) => {
    dispatch({ type: Searching, find });
  };
};

//Delete Action
export const deleteAction = (id) => {
  return (dispatch) => {
    dispatch({ type: Delete, payload: id });
  };
};

//Edit Action
export const userEditFormAction = (item) => {
  return (dispatch) => {
    dispatch({ type: Edit, payload: item });
  };
};
