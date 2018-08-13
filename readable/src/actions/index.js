import * as api from '../utils/ApiHelper';

export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_POSTS = "GET_POSTS";
export const GET_POST_BY_CATEGORY = "GET_POST_BY_CATEGORY";
export const GET_POST = "GET_POST";
export const SET_ORDER_BY = "SET_ORDER_BY";
export const GET_COMMENTS = "GET_COMMENTS";
export const REMOVE_POST = "REMOVE_POST";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const CONTROL_EDIT_POST = "CONTROL_EDIT_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const CONTROL_OPEN_MODAL = "CONTROL_OPEN_MODAL";
export const CONTROL_EDIT_COMMENT = "CONTROL_EDIT_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const VOTE_POST = "VOTE_POST";
export const VOTE_COMMENT = "VOTE_COMMENT";

const getCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    categories,
  }
}

export const getAllCategories = () => {
  return async (dispatch) => {
    const response = await api.getAllCategories();

    dispatch(getCategories(response));
  }
}

const getCategory = (postsCategory) => {
  return {
    type: GET_POST_BY_CATEGORY,
    postsCategory,
  }
}

export const getPostByCategory = (byCategory) => {
  return async (dispatch) => {
    const response = await api.getPostByCategory(byCategory);

    dispatch(getCategory(response));
  }
}

const getPosts = (posts) => {
  return {
    type: GET_POSTS,
    posts,
  }
}

export const getAllPosts = () => {
  return async (dispatch) => {
    const response = await api.getAllPosts();

    dispatch(getPosts(response));
  }
}

const getPost = (post) => {
  return {
    type: GET_POST,
    post,
  }
}

export const getPostId = (id) => {
  return async (dispatch) => {
    const response = await api.getPostById(id);

    dispatch(getPost(response));
  }
}

export const setOrderBy = (orderBy) => {
  return {
    type: SET_ORDER_BY,
    orderBy,
  }
}

const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments,
  }
}

export const getAllComments = (id) => {
  return async (dispatch) => {
    const response = await api.getAllCommentsByPost(id);

    dispatch(getComments(response));
  }
}

const removePost = (post) => {
  return {
    type: REMOVE_POST,
    post,
  }
}

export const removePostId = (id) => {
  return async (dispatch) => {
    const response = await api.removePost(id);

    dispatch(removePost(response));
  }
}

const createPost = (post) => {
  return {
    type: ADD_POST,
    post,
  }
}

export const addAndSavePost = (post) => {
  return async (dispatch) => {
    const response = await api.addPost(post);

    dispatch(createPost(response))
  }
}

const editPost = (post, id) => {
  return {
    type: EDIT_POST,
    post,
    id,
  }
}

export const editAndSavePost = (post, id) => {
  return async (dispatch) => {
    const response = await api.editPost(post, id);

    dispatch(editPost(response))
  }
}

export const controlEditPost = (control) => {
  return {
    type: CONTROL_EDIT_POST,
    control,
  }
}

const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export const addAndSaveComment = (comment) => {
  return async (dispatch) => {
    const response = await api.addComment(comment);

    dispatch(addComment(response));
  }
}

const editComment = (comment, idComment) => {
  return {
    type: EDIT_COMMENT,
    comment,
    idComment
  }
}

export const editAndSaveComment = (comment, id) => {
  return async (dispatch) => {
    const response = await api.editComment(comment, id);

    dispatch(editComment(response));
  }
}

export const controlOpenModal = (open) => {
  return {
    type: CONTROL_OPEN_MODAL,
    open,
  }
}

export const controlEditComment = (control) => {
  return {
    type: CONTROL_EDIT_COMMENT,
    control,
  }
}

const removeComment = (comment) => {
  return {
    type: REMOVE_COMMENT,
    comment,
  }
}

export const removeCommentId = (id) => {
  return async (dispatch) => {
    const response = await api.removeComment(id);

    dispatch(removeComment(response));
  }
}

const votePost = (post, id) => {
  return {
    type: VOTE_POST,
    post,
    id,
  }
}

export const voteScorePost = (option, id) => {
  return async (dispatch) => {
    const response = await api.votePost(option, id)

    dispatch(votePost(response))
  }
}

const voteComment = (comment, id) => {
  return {
    type: VOTE_COMMENT,
    comment,
  }
}

export const voteScoreComment = (option, id) => {
  return async (dispatch) => {
    const response = await api.voteComment(option, id)

    dispatch(voteComment(response))
  }
}