import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { 
  fetchCommentsByEventId, 
  createComment, 
  updateComment, 
  deleteComment 
} from '../redux/comment/eventCommentSlice';
import './css/EventCommentSection.css';

const EventCommentSection = ({ eventId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, userEmail } = useSelector(state => state.auth);
  const { comments, loading, createLoading, updateLoading, deleteLoading, error } = useSelector(state => state.comments);
  
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0); // 0 means no rating selected
  const [hoveredRating, setHoveredRating] = useState(0);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(0);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchCommentsByEventId(eventId));
    }
  }, [dispatch, eventId]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Vừa xong';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
    
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate('/login');
      return;
    }

    if (!commentText.trim()) {
      return;
    }

    if (!rating || rating < 1 || rating > 5) {
      alert('Vui lòng chọn đánh giá từ 1 đến 5 sao');
      return;
    }

    try {
      await dispatch(createComment({
        eventId: parseInt(eventId),
        content: commentText.trim(),
        rating: rating
      })).unwrap();
      setCommentText('');
      setRating(0);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleStartEdit = (comment) => {
    setEditingCommentId(comment.commentId);
    setEditText(comment.content);
    setEditRating(comment.rating || 0);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditText('');
    setEditRating(0);
  };

  const handleUpdateComment = async (commentId, comment) => {
    if (!editText.trim()) {
      return;
    }

    if (!editRating || editRating < 1 || editRating > 5) {
      alert('Vui lòng chọn đánh giá từ 1 đến 5 sao');
      return;
    }

    try {
      await dispatch(updateComment({
        commentId,
        commentData: { 
          eventId: parseInt(eventId),
          content: editText.trim(),
          rating: editRating
        }
      })).unwrap();
      setEditingCommentId(null);
      setEditText('');
      setEditRating(0);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  // Star Rating Component
  const StarRating = ({ rating, onRatingChange, hoveredRating, onHover, onLeave, disabled = false }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star-btn ${star <= (hoveredRating || rating) ? 'active' : ''}`}
            onClick={() => !disabled && onRatingChange(star)}
            onMouseEnter={() => !disabled && onHover(star)}
            onMouseLeave={() => !disabled && onLeave()}
            disabled={disabled}
          >
            <i className={`bi ${star <= (hoveredRating || rating) ? 'bi-star-fill' : 'bi-star'}`}></i>
          </button>
        ))}
        {rating > 0 && (
          <span className="rating-text ms-2">{rating}/5</span>
        )}
      </div>
    );
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
      return;
    }

    try {
      await dispatch(deleteComment(commentId)).unwrap();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const isMyComment = (comment) => {
    if (!token || !userEmail) return false;
    // Check by email (since we only have userEmail in auth state)
    const commentUserEmail = comment.userEmail || comment.user?.email;
    return commentUserEmail && commentUserEmail === userEmail;
  };

  return (
    <Card className="event-comment-section">
      <CardContent>
        <h3 className="section-title">
          <i className="bi bi-chat-dots me-2"></i>
          Bình luận ({comments.length})
        </h3>

        {/* Comment Form */}
        {token ? (
          <form onSubmit={handleSubmitComment} className="comment-form">
            <div className="form-group">
              <label className="form-label">Đánh giá <span className="text-danger">*</span></label>
              <StarRating
                rating={rating}
                onRatingChange={setRating}
                hoveredRating={hoveredRating}
                onHover={setHoveredRating}
                onLeave={() => setHoveredRating(0)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Bình luận <span className="text-danger">*</span></label>
              <textarea
                className="form-control comment-textarea"
                rows="3"
                placeholder="Viết bình luận của bạn..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={createLoading}
              />
              {error && (
                <div className="alert alert-danger mt-2">
                  <small>{error}</small>
                </div>
              )}
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={!commentText.trim() || !rating || createLoading}
            >
              {createLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Đang gửi...
                </>
              ) : (
                <>
                  <i className="bi bi-send me-2"></i>
                  Gửi bình luận
                </>
              )}
            </Button>
          </form>
        ) : (
          <div className="comment-login-prompt">
            <p className="text-muted">
              <i className="bi bi-info-circle me-2"></i>
              Đăng nhập để bình luận về sự kiện này
            </p>
          </div>
        )}

        {/* Comments List */}
        <div className="comments-list">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-4 text-muted">
              <i className="bi bi-chat-dots fs-1 d-block mb-2"></i>
              <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.commentId} className="comment-item">
                <div className="comment-header">
                  <div className="comment-user-info">
                    <div className="comment-avatar">
                      {comment.userAvatar || comment.user?.avatar ? (
                        <img src={comment.userAvatar || comment.user.avatar} alt={comment.userName || comment.user?.fullName || 'User'} />
                      ) : (
                        <i className="bi bi-person-circle"></i>
                      )}
                    </div>
                    <div className="comment-user-details">
                      <div className="d-flex align-items-center gap-2">
                        <strong className="comment-user-name">
                          {comment.user?.fullName || comment.userName || 'Người dùng'}
                        </strong>
                        {comment.rating && (
                          <div className="comment-rating-display">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <i
                                key={star}
                                className={`bi ${star <= comment.rating ? 'bi-star-fill text-warning' : 'bi-star text-muted'}`}
                              ></i>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="comment-date">{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>
                  {isMyComment(comment) && (
                    <div className="comment-actions">
                      {editingCommentId === comment.commentId ? (
                        <>
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => handleUpdateComment(comment.commentId, comment)}
                            disabled={updateLoading}
                          >
                            <i className="bi bi-check-lg text-success"></i>
                          </Button>
                          <Button
                            variant="link"
                            size="sm"
                            onClick={handleCancelEdit}
                            disabled={updateLoading}
                          >
                            <i className="bi bi-x-lg text-danger"></i>
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => handleStartEdit(comment)}
                            className="text-primary"
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => handleDeleteComment(comment.commentId)}
                            disabled={deleteLoading}
                            className="text-danger"
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="comment-content">
                  {editingCommentId === comment.commentId ? (
                    <>
                      <div className="mb-2">
                        <label className="form-label small">Đánh giá <span className="text-danger">*</span></label>
                        <StarRating
                          rating={editRating}
                          onRatingChange={setEditRating}
                          hoveredRating={hoveredRating}
                          onHover={setHoveredRating}
                          onLeave={() => setHoveredRating(0)}
                        />
                      </div>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                    </>
                  ) : (
                    <p>{comment.content}</p>
                  )}
                </div>
                {comment.updatedAt && comment.updatedAt !== comment.createdAt && (
                  <small className="text-muted">
                    <i className="bi bi-pencil me-1"></i>
                    Đã chỉnh sửa
                  </small>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCommentSection;

