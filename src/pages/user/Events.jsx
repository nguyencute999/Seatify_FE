import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventList from '../../components/EventList';
import { fetchEvents } from '../../redux/event/eventSlice';

const Events = ({ onViewChange = () => {} }) => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector(state => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleBookNow = (event) => {
    // TODO: Implement booking logic
    console.log('Book now:', event);
    // Navigate to booking page or show booking modal
  };

  const handleViewDetails = (event) => {
    // TODO: Navigate to event details page
    console.log('View details:', event);
    // Navigate to event detail page
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
      />
    </div>
  );
};

export default Events;
