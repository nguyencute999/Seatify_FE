import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublishedNews, fetchPublishedNewsById } from '../redux/news/newsSlice';
import './css/NewsPage.css';

const NewsPage = () => {
  const dispatch = useDispatch();
  const { news, loading, error, currentNews } = useSelector((state) => state.news);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    dispatch(fetchPublishedNews());
  }, [dispatch]);

  useEffect(() => {
    if (selectedNews?.newsId && selectedNews.newsId !== currentNews?.newsId) {
      dispatch(fetchPublishedNewsById(selectedNews.newsId));
    }
  }, [dispatch, selectedNews?.newsId, currentNews?.newsId]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsClick = (newsItem) => {
    setSelectedNews(newsItem);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

  // Client-side pagination
  const totalItems = news.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNews = news.slice(startIndex, endIndex);

  if (loading && news.length === 0) {
    return (
      <div className="news-page">
        <div className="news-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Đang tải tin tức...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-page">
        <div className="news-container">
          <div className="alert alert-danger">
            <h4>Lỗi tải dữ liệu!</h4>
            <p>{error}</p>
            <button 
              className="btn btn-danger"
              onClick={() => dispatch(fetchPublishedNews())}
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show full page news detail view
  if (selectedNews) {
    return (
      <div className="news-detail-page">
        <div className="news-detail-container">
          <button className="news-detail-back-btn" onClick={handleCloseModal}>
            <i className="bi bi-arrow-left"></i>
            Quay lại
          </button>
          
          {loading && !currentNews ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="news-detail-content">
              {(currentNews?.thumbnail || selectedNews.thumbnail) && (
                <div className="news-detail-image">
                  <img 
                    src={currentNews?.thumbnail || selectedNews.thumbnail} 
                    alt={currentNews?.title || selectedNews.title}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&h=600&fit=crop';
                    }}
                  />
                </div>
              )}
              
              <div className="news-detail-body">
                <h1 className="news-detail-title">{currentNews?.title || selectedNews.title}</h1>
                
                {(currentNews?.publishedAt || selectedNews.publishedAt) && (
                  <div className="news-detail-meta">
                    <div className="news-detail-date">
                      <i className="bi bi-calendar3"></i>
                      <span>{formatDate(currentNews?.publishedAt || selectedNews.publishedAt)}</span>
                    </div>
                  </div>
                )}

                <div className="news-detail-content-text">
                  <p>{currentNews?.content || selectedNews.content || 'Không có nội dung'}</p>
                </div>

                {(currentNews?.event || selectedNews.event) && (
                  <div className="news-detail-event">
                    <h4>Sự kiện liên quan:</h4>
                    <div className="event-info">
                      <i className="bi bi-calendar-event"></i>
                      <span>{(currentNews?.event?.eventName || selectedNews.event?.eventName || currentNews?.eventName || selectedNews.eventName)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="news-page">
      <div className="news-container">
        {/* Header */}
        <div className="news-header">
          <h1 className="news-title">Tin tức & Sự kiện</h1>
          <p className="news-subtitle">
            Cập nhật những thông tin mới nhất về các sự kiện
          </p>
        </div>

        {/* News Grid */}
        {paginatedNews.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-newspaper text-muted" style={{ fontSize: '3rem' }}></i>
            <h5 className="mt-3 text-muted">Chưa có tin tức nào</h5>
          </div>
        ) : (
          <div className="news-grid">
            {paginatedNews.map((newsItem) => (
              <article key={newsItem.newsId} className="news-card" onClick={() => handleNewsClick(newsItem)}>
                <div className="news-card-image">
                  <img 
                    src={newsItem.thumbnail || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop'} 
                    alt={newsItem.title}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop';
                    }}
                  />
                  <div className="news-card-overlay">
                    <span className="news-card-category">Tin tức</span>
                  </div>
                </div>
                
                <div className="news-card-content">
                  <h3 className="news-card-title">{newsItem.title}</h3>
                  <p className="news-card-excerpt">
                    {newsItem.content && newsItem.content.length > 150 
                      ? `${newsItem.content.substring(0, 150)}...` 
                      : newsItem.content || 'Không có mô tả'
                    }
                  </p>
                  
                  <div className="news-card-meta">
                    {newsItem.publishedAt && (
                      <div className="news-card-date">
                        <i className="bi bi-calendar3"></i>
                        <span>{formatDate(newsItem.publishedAt)}</span>
                      </div>
                    )}
                  </div>

                  {newsItem.event && (
                    <div className="news-card-event">
                      <i className="bi bi-calendar-event"></i>
                      <span>Sự kiện: {newsItem.event.eventName || newsItem.eventName}</span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="news-pagination">
            <button 
              className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="bi bi-chevron-left"></i>
              Trước
            </button>
            
            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => {
                const page = i + 1;
                // Show first page, last page, current page and pages around current
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="pagination-ellipsis">...</span>;
                }
                return null;
              })}
            </div>
            
            <button 
              className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Sau
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
