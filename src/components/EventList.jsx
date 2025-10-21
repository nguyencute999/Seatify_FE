import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Tabs } from './ui/Tabs';
import './css/EventComponents.css';

const EventList = ({ events, onBookNow, onViewDetails, loading = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [timeFilter, setTimeFilter] = useState('ALL');
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    let filtered = events;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(event => event.status === statusFilter);
    }

    // Filter by time (real-time filtering)
    if (timeFilter !== 'ALL') {
      const now = new Date();
      
      filtered = filtered.filter(event => {
        const startTime = new Date(event.start_time);
        const endTime = new Date(event.end_time);
        
        switch (timeFilter) {
          case 'ONGOING':
            // Đang diễn ra: thời gian hiện tại nằm trong khoảng bắt đầu - kết thúc
            return now >= startTime && now <= endTime;
          case 'UPCOMING':
            // Sắp diễn ra: thời gian bắt đầu > thời gian hiện tại
            return now < startTime;
          case 'FINISHED':
            // Đã kết thúc: thời gian kết thúc < thời gian hiện tại
            return now > endTime;
          default:
            return true;
        }
      });
    }

    setFilteredEvents(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [events, searchTerm, statusFilter, timeFilter]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const statusTabs = [
    { id: 'ALL', label: 'Tất cả', count: events.length },
    { id: 'UPCOMING', label: 'Sắp diễn ra', count: events.filter(e => e.status === 'UPCOMING').length },
    { id: 'ONGOING', label: 'Đang diễn ra', count: events.filter(e => e.status === 'ONGOING').length },
    { id: 'FINISHED', label: 'Đã kết thúc', count: events.filter(e => e.status === 'FINISHED').length },
  ];

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <Button
          key="prev"
          variant="outline-primary"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <i className="bi bi-chevron-left"></i>
        </Button>
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "primary" : "outline-primary"}
          size="sm"
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <Button
          key="next"
          variant="outline-primary"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <i className="bi bi-chevron-right"></i>
        </Button>
      );
    }

    return (
      <div className="d-flex justify-content-center gap-2 mt-4">
        {pages}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container-fluid px-4 py-5">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Đang tải sự kiện...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Danh sách sự kiện</h2>
            <div className="text-muted">
              Hiển thị {startIndex + 1}-{Math.min(endIndex, filteredEvents.length)} trong {filteredEvents.length} sự kiện
            </div>
          </div>

          {/* Search and Filter */}
          <div className="events-filter mb-4">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="events-search">
                  <div className="position-relative">
                    <Input
                      type="text"
                      placeholder="Tìm kiếm sự kiện..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="ps-5"
                    />
                    <i className="bi bi-search search-icon"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex justify-content-md-end">
                  <Tabs
                    tabs={statusTabs}
                    activeTab={statusFilter}
                    onTabChange={setStatusFilter}
                    className="justify-content-end"
                  />
                </div>
              </div>
            </div>
            
            {/* Time-based Filter */}
            <div className="row mt-3">
              <div className="col-12">
                <div className="time-filter-container">
                  <div className="time-filter-label mb-2">
                    <i className="bi bi-clock me-2"></i>
                    <span className="fw-semibold">Lọc theo thời gian:</span>
                  </div>
                  <div className="time-filter-buttons">
                    <button
                      className={`time-filter-btn ${timeFilter === 'ALL' ? 'active' : ''}`}
                      onClick={() => setTimeFilter('ALL')}
                    >
                      <i className="bi bi-grid-3x3-gap me-2"></i>
                      Tất cả
                    </button>
                    <button
                      className={`time-filter-btn ${timeFilter === 'ONGOING' ? 'active' : ''}`}
                      onClick={() => setTimeFilter('ONGOING')}
                    >
                      <i className="bi bi-play-circle me-2"></i>
                      Đang diễn ra
                    </button>
                    <button
                      className={`time-filter-btn ${timeFilter === 'UPCOMING' ? 'active' : ''}`}
                      onClick={() => setTimeFilter('UPCOMING')}
                    >
                      <i className="bi bi-calendar-plus me-2"></i>
                      Sắp diễn ra
                    </button>
                    <button
                      className={`time-filter-btn ${timeFilter === 'FINISHED' ? 'active' : ''}`}
                      onClick={() => setTimeFilter('FINISHED')}
                    >
                      <i className="bi bi-check-circle me-2"></i>
                      Đã kết thúc
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          {currentEvents.length > 0 ? (
            <>
              <div className="row g-4">
                {currentEvents.map((event) => (
                  <div key={event.event_id} className="col-lg-4 col-md-6">
                    <EventCard 
                      event={event}
                      onBookNow={onBookNow}
                      onViewDetails={onViewDetails}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {renderPagination()}
            </>
          ) : (
            <div className="text-center text-muted py-5">
              <i className="bi bi-calendar-event fs-1 mb-3 d-block"></i>
              <h4>Không tìm thấy sự kiện</h4>
              <p>Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventList;
