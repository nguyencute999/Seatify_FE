import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EventList from '../../components/EventList';
import { fetchEvents } from '../../redux/event/eventSlice';

const Events = ({ onViewChange = () => {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, loading, error, pagination } = useSelector(state => state.events);
  const { token } = useSelector(state => state.auth);
  const lastParamsRef = useRef(null);

  useEffect(() => {
    const initial = { page: 0, size: 6, sortBy: 'startTime', desc: false };
    lastParamsRef.current = initial;
    dispatch(fetchEvents(initial));
  }, [dispatch]);

  const handleBookNow = (event) => {
    const id = event?.eventId || event?.event_id || event?.id;
    if (!id) {
      navigate('/events');
      return;
    }
    if (!token) {
      navigate('/login');
      return;
    }
    navigate(`/events/${id}/seats`);
  };

  const handleViewDetails = (event) => {
    const id = event?.eventId || event?.event_id || event?.id;
    navigate(id ? `/events/${id}` : '/events');
  };

  if (error) {
    return (
      <div className="container-fluid px-4 py-5">
        <div className="row">
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Lỗi tải dữ liệu!</h4>
              <p>{error}</p>
              <hr />
              <button 
                className="btn btn-danger"
                onClick={() => dispatch(fetchEvents())}
              >
                Thử lại
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="events-page">
      <EventList
        events={events}
        onBookNow={handleBookNow}
        onViewDetails={handleViewDetails}
        loading={loading}
        pagination={pagination}
        onFiltersChange={(params) => {
          // avoid duplicate dispatches if params unchanged
          const prev = lastParamsRef.current || {};
          const changed = JSON.stringify(prev) !== JSON.stringify(params);
          if (changed) {
            lastParamsRef.current = params;
            dispatch(fetchEvents(params));
          }
        }}
      />
    </div>
  );
};

export default Events;
