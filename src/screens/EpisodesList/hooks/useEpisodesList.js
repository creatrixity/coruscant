import React, { useEffect } from "react";

const EpisodesListContext = React.createContext();

const initialState = {
  characters: [],
  episode: null,
  sortByColumn: null,
  gender: null,
  sortOrder: null,
};

function episodesListReducer(state, action) {
  return {
    ...state,
    ...action,
  };
}

function EpisodesListProvider({ children }) {
  const [state, dispatch] = React.useReducer(episodesListReducer, initialState);

  const value = { state, dispatch };

  return (
    <EpisodesListContext.Provider value={value}>
      {children}
    </EpisodesListContext.Provider>
  );
}

function useEpisodesList() {
  const context = React.useContext(EpisodesListContext);

  if (context === undefined) {
    throw new Error(
      "useEpisodesList must be used within a EpisodesListProvider"
    );
  }

  const { episode, sortByColumn, gender, sortOrder } = context.state;

  useEffect(() => {
    const searchParamsToTrack = {
      episode,
      sortByColumn,
      gender,
      sortOrder,
    };

    const url = new URL(window.location);

    Object.keys(searchParamsToTrack).forEach((searchParam) => {
      if (searchParamsToTrack[searchParam]) {
        url.searchParams.set(searchParam, searchParamsToTrack[searchParam]);
      } else {
        url.searchParams.delete(searchParam);
      }
    });

    window.history.pushState({}, "", url);
  }, [episode, sortByColumn, gender, sortOrder]);

  return [context.state, context.dispatch];
}
export { EpisodesListProvider, useEpisodesList };
