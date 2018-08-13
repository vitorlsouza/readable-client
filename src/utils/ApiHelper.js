const api = "http://localhost:3001";

const headers = { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json' };

export const getAllCategories = async () => {
  const response = await fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
    return response
}

export const getAllPosts = async () => {
  const response = await fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)
    return response
}

export const getPostByCategory = async (category) => {
  const response = await fetch(`${api}${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)
    return response
}

export const getPostById = async (id) => {
  const response = await fetch(`${api}/posts/${id}`, { headers })
  .then(res => res.json())
  .then(data => data)
  return response
}

export const getAllCommentsByPost = async (id) => {
  const response = await fetch(`${api}/posts/${id}/comments`, { headers })
  .then(res => res.json())
  .then(data => data)
  return response
}

export const removePost = async (id) => {
  const response = await fetch(`${api}/posts/${id}`,
  {
    headers,
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => data)
  return response
}

export const addPost = async (post) => {
  const response = await fetch(`${api}/posts`, {
    headers,
    method: 'POST',
    body: JSON.stringify(post)
  })
  .then(res => res.json())
  .then(data => data)
  return response
}

export const editPost = async (post, id) => {
  const response = await fetch(`${api}/posts/${id}`, {
    headers,
    method: "PUT",
    body: JSON.stringify(post)
  })
  .then(res => res.json())
  .then(data => data)
  return response
}

export const addComment = async (comment) => {
  const response = await fetch(`${api}/comments`, {
    headers,
    method: "POST",
    body: JSON.stringify(comment)
  })
  .then(res => res.json())
  .then(data => data)
  return response
}

export const editComment = async (comment, id) => {
  const response = await fetch(`${api}/comments/${id}`, {
    headers,
    method: "PUT",
    body: JSON.stringify(comment)
  })
  .then(res => res.json())
  .then(data => data)
  return response
}

export const removeComment = async (id) => {
  const response = await fetch(`${api}/comments/${id}`, {
    headers,
    method: "DELETE"
  })
  .then(res => res.json())
  .then(data => data)
  return response
}

export const votePost = async (id, option) => {
  const response = await fetch(`${api}/posts/${id}`, {
    headers,
    method: "POST",
    body: JSON.stringify({option})
  })
  .then(res => res.json())
  .then(data => data)
  return response
}

export const voteComment = async (id, option) => {
  const response = await fetch(`${api}/comments/${id}`, {
    headers,
    method: "POST",
    body: JSON.stringify({option})
  })
  .then(res => res.json())
  .then(data => data)
  return response
}