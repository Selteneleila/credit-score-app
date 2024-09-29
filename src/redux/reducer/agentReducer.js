import {
  DELETE_AGENT_FAILURE,
  DELETE_AGENT_REQUEST,
  DELETE_AGENT_SUCCESS,
  FETCH_AGENT_BY_ID_FAILURE,
  FETCH_AGENT_BY_ID_REQUEST,
  FETCH_AGENT_BY_ID_SUCCESS,
  GET_AGENT_LIST_FAILURE,
  GET_AGENT_LIST_REQUEST,
  GET_AGENT_LIST_SUCCESS,
  POST_AGENT_FAILURE,
  POST_AGENT_REQUEST,
  POST_AGENT_SUCCESS,
  UPDATE_AGENT_FAILURE,
  UPDATE_AGENT_REQUEST,
  UPDATE_AGENT_SUCCESS,
} from "../action/actionType";

const initialState = {
  agents: [],
  selectedAgent: {},
  agent: null,
  updatedAgent: {},
  loading: false,
  isLoading: false,
  isDeleting: false,
  isUpdating: false,
  error: null,
};

const agentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AGENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_AGENT_LIST_SUCCESS:
      return {
        ...state,
        agents: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_AGENT_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_AGENT_BY_ID_SUCCESS:
      return {
        ...state,
        selectedAgent: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_AGENT_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_AGENT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_AGENT_REQUEST:
      return {
        ...state,
        isDeleting: true,
      };
    case DELETE_AGENT_SUCCESS:
      const updatedAgents = state.agents.filter(
        (agent) => agent.id !== action.payload
      );
      return { ...state, agents: updatedAgents, isDeleting: false };
    case DELETE_AGENT_FAILURE:
      return { ...state, error: action.payload, isDeleting: false };
    case UPDATE_AGENT_REQUEST:
      return {
        ...state,
        error: null,
      };
    case UPDATE_AGENT_SUCCESS:
      const { payload } = action;
      return {
        ...state,
        error: null,
        agent: payload,
        agents: state.agents.map((agent) =>
          agent.id === payload.id ? payload : agent
        ),
      };
    case UPDATE_AGENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case POST_AGENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_AGENT_SUCCESS:
      return {
        ...state,
        loading: false,
        agent: action.payload,
        error: "",
      };
    case POST_AGENT_FAILURE:
      return {
        ...state,
        loading: false,
        agent: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default agentReducer;
