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
      const new_messages = state.messages.concat(action.payload);

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
     *  Fetch Messages
     */

    case ActionTypes.FETCH_MESSAGES:
      return {...state,
        loading: true,
      }

    case ActionTypes.FETCH_MESSAGES_SUCCESS:
      return {...state,
        messages: action.payload,
        loading: false
      }

    case ActionTypes.FETCH_MESSAGES_FAILED:
      return {...state,
        loading: false
      }

    default:
      return state;
  }
}

/**
 * Returns all messages in the store.
 * @function getAllMessages
 * @param {State} state
 * @returns {[Messages]}
 */
export const getAllMessages = (state: State) => state.messages;