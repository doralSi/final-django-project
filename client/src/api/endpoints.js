import apiClient from './apiClient';

// Auth endpoints
export const register = (data) => apiClient.post('/register/', data);

export const login = (data) => apiClient.post('/token/', data);

export const refreshToken = (refreshToken) => 
  apiClient.post('/token/refresh/', { refresh: refreshToken });

export const getMe = () => apiClient.get('/me/');

// Articles endpoints
export const getArticles = (params) => apiClient.get('/articles/', { params });

export const getArticle = (id) => apiClient.get(`/articles/${id}/`);

export const createArticle = (data) => apiClient.post('/articles/', data);

export const updateArticle = (id, data) => apiClient.put(`/articles/${id}/`, data);

export const partialUpdateArticle = (id, data) => apiClient.patch(`/articles/${id}/`, data);

export const deleteArticle = (id) => apiClient.delete(`/articles/${id}/`);

// Comments endpoints
export const getArticleComments = (articleId, params) => 
  apiClient.get(`/articles/${articleId}/comments/`, { params });

export const createComment = (articleId, data) => 
  apiClient.post(`/articles/${articleId}/comments/`, data);

export const getComment = (id) => apiClient.get(`/comments/${id}/`);

export const updateComment = (id, data) => apiClient.patch(`/comments/${id}/`, data);

export const deleteComment = (id) => apiClient.delete(`/comments/${id}/`);
