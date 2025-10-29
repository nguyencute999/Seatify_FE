import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/NewsPage.css';

// Mock news data
const mockNews = [
  {
    newsId: 1,
    title: "Hội thảo Công nghệ Thông tin 2024 - Xu hướng AI và Machine Learning",
    content: "Hội thảo Công nghệ Thông tin 2024 sẽ diễn ra vào ngày 15/12/2024 tại Hội trường A, Trường Đại học FPT. Chương trình sẽ tập trung vào các xu hướng mới nhất trong lĩnh vực Trí tuệ nhân tạo và Machine Learning, với sự tham gia của các chuyên gia hàng đầu trong ngành.",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
    publishedAt: "2024-12-10T10:00:00",
    authorId: 1,
    eventId: 1,
    author: {
      fullName: "Nguyễn Văn A",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
    },
    event: {
      eventName: "Hội thảo Công nghệ Thông tin 2024",
      startTime: "2024-12-15T08:00:00"
    }
  },
  {
    newsId: 2,
    title: "Workshop Phát triển Web Full-stack với React và Node.js",
    content: "Workshop này sẽ hướng dẫn các bạn từ cơ bản đến nâng cao về việc phát triển ứng dụng web full-stack sử dụng React cho frontend và Node.js cho backend. Phù hợp cho sinh viên năm 3, 4 và các bạn muốn nâng cao kỹ năng lập trình web.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
    publishedAt: "2024-12-08T14:30:00",
    authorId: 2,
    eventId: 2,
    author: {
      fullName: "Trần Thị B",
      avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face"
    },
    event: {
      eventName: "Workshop Full-stack Development",
      startTime: "2024-12-20T09:00:00"
    }
  },
  {
    newsId: 3,
    title: "Cuộc thi Hackathon FPT 2024 - Giải pháp cho thành phố thông minh",
    content: "Cuộc thi Hackathon FPT 2024 với chủ đề 'Smart City Solutions' sẽ diễn ra trong 48 giờ liên tục. Các đội thi sẽ phát triển các giải pháp công nghệ để giải quyết các vấn đề của thành phố thông minh như giao thông, môi trường, năng lượng...",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
    publishedAt: "2024-12-05T16:00:00",
    authorId: 3,
    eventId: 3,
    author: {
      fullName: "Lê Văn C",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
    },
    event: {
      eventName: "Hackathon FPT 2024",
      startTime: "2024-12-25T08:00:00"
    }
  },
  {
    newsId: 4,
    title: "Seminar về Blockchain và Cryptocurrency - Tương lai của tài chính số",
    content: "Seminar sẽ giới thiệu về công nghệ Blockchain và các ứng dụng trong lĩnh vực tài chính số. Các chuyên gia sẽ chia sẻ về xu hướng phát triển của cryptocurrency và cách thức hoạt động của các hệ thống tài chính phi tập trung.",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    publishedAt: "2024-12-03T11:15:00",
    authorId: 4,
    eventId: 4,
    author: {
      fullName: "Phạm Thị D",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
    },
    event: {
      eventName: "Blockchain & Cryptocurrency Seminar",
      startTime: "2024-12-18T14:00:00"
    }
  },
  {
    newsId: 5,
    title: "Hội thảo An toàn thông tin - Bảo vệ dữ liệu trong thời đại số",
    content: "Với sự gia tăng của các cuộc tấn công mạng, việc bảo vệ thông tin và dữ liệu trở nên quan trọng hơn bao giờ hết. Hội thảo sẽ cung cấp kiến thức về các phương pháp bảo mật hiện đại và cách thức phòng chống các mối đe dọa an ninh mạng.",
    thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
    publishedAt: "2024-12-01T09:45:00",
    authorId: 5,
    eventId: 5,
    author: {
      fullName: "Hoàng Văn E",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face"
    },
    event: {
      eventName: "Cybersecurity Workshop",
      startTime: "2024-12-22T10:00:00"
    }
  },
  {
    newsId: 6,
    title: "Chương trình định hướng nghề nghiệp cho sinh viên IT",
    content: "Chương trình định hướng nghề nghiệp sẽ giúp sinh viên IT hiểu rõ hơn về các cơ hội việc làm trong ngành công nghệ thông tin. Các chuyên gia từ các công ty hàng đầu sẽ chia sẻ kinh nghiệm và đưa ra lời khuyên về con đường phát triển sự nghiệp.",
    thumbnail: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop",
    publishedAt: "2024-11-28T13:20:00",
    authorId: 6,
    eventId: 6,
    author: {
      fullName: "Vũ Thị F",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face"
    },
    event: {
      eventName: "Career Orientation Program",
      startTime: "2024-12-30T09:00:00"
    }
  }
];

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    // Simulate API call with mock data
    const loadNews = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock pagination
        const itemsPerPage = 4;
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedNews = mockNews.slice(startIndex, endIndex);
        
        setNews(paginatedNews);
        setTotalPages(Math.ceil(mockNews.length / itemsPerPage));
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [currentPage]);

  const formatDate = (dateString) => {
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
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
  };

  if (loading) {
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

  return (
    <div className="news-page">
      <div className="news-container">
        {/* Header */}
        <div className="news-header">
          <h1 className="news-title">Tin tức & Sự kiện</h1>
          <p className="news-subtitle">
            Cập nhật những thông tin mới nhất về các sự kiện, hội thảo và hoạt động tại FPT University
          </p>
        </div>

        {/* News Grid */}
        <div className="news-grid">
          {news.map((newsItem) => (
            <article key={newsItem.newsId} className="news-card" onClick={() => handleNewsClick(newsItem)}>
              <div className="news-card-image">
                <img 
                  src={newsItem.thumbnail} 
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
                  {newsItem.content.length > 150 
                    ? `${newsItem.content.substring(0, 150)}...` 
                    : newsItem.content
                  }
                </p>
                
                <div className="news-card-meta">
                  <div className="news-card-author">
                    <img 
                      src={newsItem.author.avatarUrl} 
                      alt={newsItem.author.fullName}
                      className="author-avatar"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face';
                      }}
                    />
                    <span className="author-name">{newsItem.author.fullName}</span>
                  </div>
                  <div className="news-card-date">
                    <i className="bi bi-calendar3"></i>
                    <span>{formatDate(newsItem.publishedAt)}</span>
                  </div>
                </div>

                {newsItem.event && (
                  <div className="news-card-event">
                    <i className="bi bi-calendar-event"></i>
                    <span>Sự kiện: {newsItem.event.eventName}</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="news-pagination">
            <button 
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              <i className="bi bi-chevron-left"></i>
              Trước
            </button>
            
            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`pagination-number ${currentPage === i ? 'active' : ''}`}
                  onClick={() => handlePageChange(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            <button 
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Sau
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        )}
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="news-modal-overlay" onClick={handleCloseModal}>
          <div className="news-modal" onClick={(e) => e.stopPropagation()}>
            <button className="news-modal-close" onClick={handleCloseModal}>
              <i className="bi bi-x-lg"></i>
            </button>
            
            <div className="news-modal-content">
              <div className="news-modal-image">
                <img 
                  src={selectedNews.thumbnail} 
                  alt={selectedNews.title}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop';
                  }}
                />
              </div>
              
              <div className="news-modal-body">
                <h2 className="news-modal-title">{selectedNews.title}</h2>
                
                <div className="news-modal-meta">
                  <div className="news-modal-author">
                    <img 
                      src={selectedNews.author.avatarUrl} 
                      alt={selectedNews.author.fullName}
                      className="modal-author-avatar"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face';
                      }}
                    />
                    <div className="modal-author-info">
                      <span className="modal-author-name">{selectedNews.author.fullName}</span>
                      <span className="modal-publish-date">{formatDate(selectedNews.publishedAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="news-modal-content-text">
                  <p>{selectedNews.content}</p>
                </div>

                {selectedNews.event && (
                  <div className="news-modal-event">
                    <h4>Sự kiện liên quan:</h4>
                    <div className="event-info">
                      <i className="bi bi-calendar-event"></i>
                      <span>{selectedNews.event.eventName}</span>
                    </div>
                    <div className="event-info">
                      <i className="bi bi-clock"></i>
                      <span>{formatDate(selectedNews.event.startTime)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
