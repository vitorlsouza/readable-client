import { combineReducers } from 'redux';

import {
  GET_CATEGORIES,
  GET_POST_BY_CATEGORY,
  GET_POSTS,
  GET_POST,
  SET_ORDER_BY,
  GET_COMMENTS,
  REMOVE_POST,
  ADD_POST,
  EDIT_POST,
  CONTROL_EDIT_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  CONTROL_OPEN_MODAL,
  REMOVE_COMMENT,
  CONTROL_EDIT_COMMENT,
  VOTE_POST,
  VOTE_COMMENT
} from '../actions/index';

const INITIAL_STATE_CATEGORIES = {
  categories: [],
  postsCategory: [],
  orderBy: 'voteScore',
}

const INITIAL_STATE_POSTS = {
  posts: [],
  post: [],
  orderBy: 'voteScore',
  control: false,
}

const INITIAL_STATE_COMMENTS = {
  comments: [],
  open: false,
  control: false,
}

const categories = (state = INITIAL_STATE_CATEGORIES, action) => {
  switch(action.type) {

    case GET_CATEGORIES :
      return {
        ...state,
        categories: action.categories
      }
    case GET_POST_BY_CATEGORY :
      return {
        ...state,
        postsCategory: action.postsCategory
      }
    case SET_ORDER_BY :
      return {
        ...state,
        orderBy: action.orderBy,
      }
    default :
      return state;
  }
}

const posts = (state = INITIAL_STATE_POSTS, action) => {
  switch(action.type) {
    case GET_POSTS :
      return {
        ...state,
        posts: action.posts,
      }
      case GET_POST :
        return {
          ...state,
          post: action.post,
        }
      case SET_ORDER_BY :
        return {
          ...state,
          orderBy: action.orderBy,
        }
      case REMOVE_POST :
        return {
          ...state,
          posts: state.posts.filter(p => p.id !== action.post.id)
        }
      case ADD_POST :
        return {
          ...state,
          posts: state.posts.concat(action.post)
        }
      case EDIT_POST :
        return {
          ...state,
          posts: state.posts.map(post => {
            if (post.id === action.idPost) {
              post = action.post
            }
            return post
          }),
          post: action.post,
        }
      case CONTROL_EDIT_POST :
        return {
          ...state,
          control: action.control,
        }
      case VOTE_POST :
        return {
          ...state,
          post: action.post,
        }

    default :
      return state;
  }
}

const comments = (state = INITIAL_STATE_COMMENTS, action) => {
  switch(action.type) {
    case GET_COMMENTS :
      return {
        ...state,
        comments: action.comments,
      }
    case ADD_COMMENT :
      return {
        ...state,
        comments: state.comments.concat(action.comment),
      }
    case EDIT_COMMENT :
      return {
        ...state,
        comments: state.comments.map(comment => {
          if(comment.id === action.idComment) {
            comment = action.comment
          }
          return comment
        }),
        comment: action.comment,
      }
    case CONTROL_OPEN_MODAL :
      return {
        ...state,
        open: action.open,
      }
    case CONTROL_EDIT_COMMENT :
    return {
      ...state,
      control: action.control,
    }
    case REMOVE_COMMENT :
      return {
        ...state,
        comments: state.comments.filter(c => c.id !== action.comment.id)
      }
    case VOTE_COMMENT :
      return {
        ...state,
        comment: action.comment,
      }

      default :
        return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments,
});