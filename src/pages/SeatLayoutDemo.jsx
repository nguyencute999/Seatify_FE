import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeatsByEventId } from '../redux/seat/seatSlice';
import SeatLayoutDisplay from '../components/SeatLayoutDisplay';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const SeatLayoutDemo = () => {
  const dispatch = useDispatch();
  const { seats, loading, error } = useSelector(state => state.seats);
  const [eventId, setEventId] = useState('1'); // Demo event ID

  useEffect(() => {
    // Load seats for demo event
    dispatch(fetchSeatsByEventId(eventId));
  }, [dispatch, eventId]);

  const handleRefresh = () => {
    dispatch(fetchSeatsByEventId(eventId));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <Card>
            <CardContent>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Demo Sơ đồ ghế sự kiện</h2>
                <div className="d-flex gap-2">
                  <input
                    type="number"
                    className="form-control"
                    style={{ width: '100px' }}
                    value={eventId}
                    onChange={(e) => setEventId(e.target.value)}
                    placeholder="Event ID"
                  />
                  <Button onClick={handleRefresh}>
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Refresh
                  </Button>
                </div>
              </div>
              
              <SeatLayoutDisplay 
                seats={seats}
                loading={loading}
                error={error}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SeatLayoutDemo;
