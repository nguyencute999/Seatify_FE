import React, { useMemo } from 'react';
import './css/UserSeatLayout.css';

const UserSeatLayout = ({ seats, selectedSeats, onSeatSelect }) => {
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

  const getSeatStatus = (seat) => {
    if (seat.isBooked) return 'booked';
    if (!seat.isAvailable) return 'locked';
    return 'available';
  };

  const getSeatClass = (seat) => {
    const status = getSeatStatus(seat);
    const isSelected = selectedSeats.find(s => s.id === seat.id);
    return `seat seat-${status} ${isSelected ? 'selected' : ''}`;
  };

  const getSeatIcon = (seat) => {
    const status = getSeatStatus(seat);
    const icons = {
      available: 'bi-circle',
      locked: 'bi-lock-fill',
      booked: 'bi-check-circle-fill'
    };
    return icons[status];
  };

  const handleSeatClick = (seat) => {
    if (seat.isBooked || !seat.isAvailable) {
      return; // Can't select booked or locked seats
    }
    
    if (onSeatSelect) {
      onSeatSelect(seat);
    }
  };

  const getSeatTitle = (seat) => {
    if (seat.isBooked) return `Ghế ${seat.row}${seat.number} - Đã đặt`;
    if (!seat.isAvailable) return `Ghế ${seat.row}${seat.number} - Khóa`;
    return `Ghế ${seat.row}${seat.number} - Trống`;
  };

  const rows = Object.keys(seatsByRow).sort();

  return (
    <div className="user-seat-layout">
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
                  onClick={() => handleSeatClick(seat)}
                  title={getSeatTitle(seat)}
                >
                  <i className={`bi ${getSeatIcon(seat)}`}></i>
                  <span className="seat-number">{seat.number}</span>
                  {seat.price > 0 && (
                    <span className="seat-price">{seat.price.toLocaleString('vi-VN')}đ</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="canvas-instructions">
        <p className="text-muted text-center">
          <i className="bi bi-info-circle me-1"></i>
          Nhấp vào ghế trống để chọn
        </p>
      </div>
    </div>
  );
};

export default UserSeatLayout;
