import React, { useMemo } from 'react';
import './css/SeatLayoutDisplay.css';

const SeatLayoutDisplay = ({ seats, loading, error }) => {
  // Group seats by row
  const seatsByRow = useMemo(() => {
    const grouped = {};
    seats.forEach(seat => {
      if (!grouped[seat.row]) {
        grouped[seat.row] = [];
      }
      grouped[seat.row].push(seat);
    });
    
    // Sort each row by seat number
    Object.keys(grouped).forEach(row => {
      grouped[row].sort((a, b) => a.number - b.number);
    });
    
    return grouped;
  }, [seats]);

  const getSeatClass = (seat) => {
    if (seat.isAvailable) {
      return 'seat seat-available'; // Xanh - trống
    } else {
      return 'seat seat-booked'; // Đỏ - đã đặt
    }
  };

  const getSeatIcon = (seat) => {
    return seat.isAvailable ? '🟩' : '🔴';
  };

  if (loading) {
    return (
      <div className="seat-layout-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Đang tải sơ đồ ghế...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="seat-layout-error">
        <div className="alert alert-danger">
          <h5>Lỗi tải sơ đồ ghế</h5>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!seats || seats.length === 0) {
    return (
      <div className="seat-layout-empty">
        <div className="alert alert-info">
          <h5>Chưa có sơ đồ ghế</h5>
          <p>Sự kiện này chưa có sơ đồ ghế được thiết lập.</p>
        </div>
      </div>
    );
  }

  const rows = Object.keys(seatsByRow).sort();

  return (
    <div className="seat-layout-display">
      <h4 className="seat-layout-title">Sơ đồ ghế sự kiện</h4>
      
      {/* Stage Area */}
      <div className="stage-area">
        <div className="stage">
          <i className="bi bi-mic"></i>
          <span>Sân khấu</span>
        </div>
      </div>

      {/* Seats Grid */}
      <div className="seats-container">
        {rows.map(row => (
          <div key={row} className="seat-row">
            <div className="row-label">
              <span className="row-letter">{row}</span>
            </div>
            <div className="seats-in-row">
              {seatsByRow[row].map(seat => (
                <div
                  key={seat.id}
                  className={getSeatClass(seat)}
                  title={`Ghế ${seat.row}${seat.number} - ${seat.isAvailable ? 'Trống' : 'Đã đặt'}`}
                >
                  <span className="seat-icon">{getSeatIcon(seat)}</span>
                  <span className="seat-number">{seat.number}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="seat-legend">
        <div className="legend-item">
          <span className="seat-icon">🟩</span>
          <span>Ghế trống</span>
        </div>
        <div className="legend-item">
          <span className="seat-icon">🔴</span>
          <span>Ghế đã đặt</span>
        </div>
      </div>
    </div>
  );
};

export default SeatLayoutDisplay;
