import { ActionTypes, Actions } from './chat.actions';

export interface State {
  /** The array that holds the messages */
  messages: Array<object>,

  /** True if messages are loaded */
  loaded: boolean

  /** True when loading messages from server */
  loading: boolean

  /** Error message */
  error?: string;
}

const initialState: State = {
  messages: [],
  loaded: false,
  loading: false
}
export function reducer(state: any = initialState, action: Actions): State {
  switch (action.type) {
    /**
     * Add Message
     */
    case ActionTypes.ADD_MESSAGE:
      return {...state, loading: true};
    
    case ActionTypes.ADD_MESSAGE_SUCCESS:
      var new_messages = state.messages.concat(action.payload);

      return {...state, 
        messages: new_messages,
        loaded: true,
        loading: false
      };
    
    case ActionTypes.ADD_MESSAGE_FAILED:
      return {...state,
        loading: false,
        error: action.payload.error.message
      };

    /**
     *  Delete Message
     */

    case ActionTypes.DELETE_MESSAGE:
      return {...state,
        loading: true};

    case ActionTypes.DELETE_MESSAGE_SUCCESS:
      var new_messages = state.messages.filter(message => message._id !== action.payload._id);

      return {...state,
        messages: new_messages
      };

    case ActionTypes.DELETE_MESSAGE_FAILED:
      return {...state,
        loading: false,
        error: action.payload.error.message
      };

    /**
     *  Fetch Messages
     */

    case ActionTypes.FETCH_MESSAGES:
      return {...state,
        loading: true,
      };

    case ActionTypes.FETCH_MESSAGES_SUCCESS:
      return {...state,
        messages: action.payload.data,
        loading: false
      }

    case ActionTypes.FETCH_MESSAGES_FAILED:
      return {...state,
        loading: false,
        error: action.payload.error.message
      };

    default:
      return state;
  } // End switch statement
} // End reducer

/**
 * Returns all messages in the store.
 * @function getAllMessages
 * @param {State} state
 * @returns {[Message]}
 */
export const getAllMessages = (state: State) => state.messages;