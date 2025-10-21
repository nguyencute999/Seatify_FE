import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import './css/EventComponents.css';

const EventCard = ({ event, onBookNow, onViewDetails, showBookButton = true }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/events/${event.event_id}`);
  };
  const getStatusBadge = (status) => {
    const statusConfig = {
      'UPCOMING': { variant: 'success', text: 'Sắp diễn ra' },
      'ONGOING': { variant: 'warning', text: 'Đang diễn ra' },
      'FINISHED': { variant: 'secondary', text: 'Đã kết thúc' },
      'CANCELLED': { variant: 'danger', text: 'Đã hủy' }
    };
    
    const config = statusConfig[status] || { variant: 'secondary', text: status };
    return (
      <Badge variant={config.variant} className="mb-2">
        {config.text}
      </Badge>
    );
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCapacity = (capacity) => {
    return capacity.toLocaleString('vi-VN');
  };

  return (
    <Card className="h-100 event-card">
      {event.thumbnail && (
        <div className="event-thumbnail">
          <img 
            src={event.thumbnail} 
            alt={event.event_name}
            className="card-img-top"
            style={{ height: '200px', objectFit: 'cover' }}
          />
        </div>
      )}
      
      <CardContent className="d-flex flex-column h-100">
        <div className="mb-2">
          {getStatusBadge(event.status)}
        </div>
        
        <CardTitle className="h5 mb-3 text-truncate" title={event.event_name}>
          {event.event_name}
        </CardTitle>
        
        <div className="mb-3">
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-calendar-event me-2 text-primary"></i>
            <small className="text-muted">
              {formatDateTime(event.start_time)}
            </small>
          </div>
          
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-clock me-2 text-primary"></i>
            <small className="text-muted">
              {formatDateTime(event.end_time)}
            </small>
          </div>
          
          {event.location && (
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-geo-alt me-2 text-primary"></i>
              <small className="text-muted text-truncate" title={event.location}>
                {event.location}
              </small>
            </div>
          )}
          
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-people me-2 text-primary"></i>
            <small className="text-muted">
              Sức chứa: {formatCapacity(event.capacity)} chỗ
            </small>
          </div>
        </div>
        
        {event.description && (
          <p className="card-text text-muted small mb-3 flex-grow-1">
            {event.description.length > 100 
              ? `${event.description.substring(0, 100)}...` 
              : event.description
            }
          </p>
        )}
        
        <div className="mt-auto">
          <div className="d-flex gap-2">
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={handleViewDetails}
              className="flex-grow-1"
            >
              Chi tiết
            </Button>
            
            {showBookButton && event.status === 'UPCOMING' && (
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => onBookNow(event)}
                className="flex-grow-1"
              >
                Đặt chỗ
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
