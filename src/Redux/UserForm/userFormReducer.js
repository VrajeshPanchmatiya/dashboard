import { Data, Delete, Searching, Sorting, SortingCharacter } from "./type";
const initialState = {
  data: [],
  search: [],
};
export const userFormReducer = (
  state = initialState,
  { type, payload, currentsort, key, setConfig, find }
) => {
  switch (type) {
    case Data:
      return {
        ...state,
        data: state.data.concat(payload),
      };
    case Sorting:
      if (currentsort === true) {
        console.log("also here");
        return {
          ...state,
          data: state.data.sort((a, b) => b.Age - a.Age),
        };
      } else if (currentsort === false) {
        return {
          ...state,
          data: state.data.sort((a, b) => a.Age - b.Age),
        };
      }
    case SortingCharacter:
      if (setConfig === true)
        return {
          ...state,
          data: state.data.sort((a, b) => {
            if (a[key] < b[key]) {
              return -1;
            }
            if (a[key] > b[key]) {
              return 1;
            }
            return 0;
          }),
        };
      else if (setConfig === false)
        return {
          ...state,
          data: state.data.sort((a, b) => {
            if (a[key] > b[key]) {
              return -1;
            }
            if (a[key] < b[key]) {
              return 1;
            }
            return 0;
          }),
        };
    case Searching:
      return {
        ...state,
        search: state.data.filter(
          (name) =>
            name.FirstName === find ||
            name.LastName === find ||
            name.Age === find ||
            name.Email === find
        ),
      };
    case Delete:
      return {
        ...state,
        data: state.data.filter(({ Id }) => Id !== payload),
      };
    default:
      return state;
  }
};
