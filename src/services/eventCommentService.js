import api from './apiService';

const eventCommentService = {
  // Tạo bình luận mới cho sự kiện
  // Yêu cầu: User phải đăng nhập, có booking và đã check-in
  createComment: async (commentData) => {
    const response = await api.post('/user/comments', commentData);
    return response.data;
  },

  // Lấy tất cả comment của một event (Public API - không cần đăng nhập)
  getCommentsByEventId: async (eventId) => {
    const response = await api.get(`/user/comments/event/${eventId}`);
    return response.data;
  },

  // Lấy tất cả comment của user hiện tại (Yêu cầu đăng nhập)
  getMyComments: async () => {
    const response = await api.get('/user/comments/my-comments');
    return response.data;
  },

  // Xóa comment của mình (Yêu cầu đăng nhập)
  deleteComment: async (commentId) => {
    await api.delete(`/user/comments/${commentId}`);
    return commentId;
  },

  // Cập nhật comment của mình (Yêu cầu đăng nhập)
  updateComment: async (commentId, commentData) => {
    const response = await api.put(`/user/comments/${commentId}`, commentData);
    return response.data;
  }
};

export default eventCommentService;

