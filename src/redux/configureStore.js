import { createStore, combineReducers, applyMiddleware } from "redux";
import { Campsites } from "./Campsites";
import { Comments } from "./Comments";
import { Partners } from "./Partners";
import { Promotions } from "./Promotions";
import { InitialFeedback } from "./forms";

import { createForms } from "react-redux-form";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      campsites: Campsites,
      comments: Comments,
      partners: Partners,
      promotions: Promotions,
      ...createForms({
        feedbackForm: InitialFeedback,
      }),
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};