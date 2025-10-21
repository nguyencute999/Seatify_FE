import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBolt, 
  faShield, 
  faUsers, 
  faHeart,
  faEye,
  faBullseye,
  faChartBar,
  faAward,
  faTriangleExclamation,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import './css/AboutPage.css';
import avatar01 from '../images/avatar01.jpg';
import avatar02 from '../images/avatar02.jpg';
import avatar03 from '../images/avatar03.jpg';
import avatar04 from '../images/avatar04.jpg';
import avatar05 from '../images/avatar05.jpg';

const AboutPage = () => {
  const team = [
    // { name: 'ABC', role: 'Pro', avatarUrl: 'https...' }
    { name: 'Cao Hữu Đức', role: 'Project Leader & UI/UX Designer', avatar: avatar01 },
    { name: 'Lê Văn Nguyễn', role: 'Frontend & Backend Developer', avatar: avatar02 },
    { name: 'Bùi Dương Bảo Trân', role: 'UI/UX Designer', avatar: avatar05 },
    { name: 'Châu Mai Anh', role: 'QA & Testing', avatar: avatar03 },
    { name: 'Trần Nguyễn Ngọc Phụng', role: 'QA & Testing', avatar: avatar04 }
  ];

  const values = [
    {
      icon: faBolt,
      title: 'Nhanh chóng',
      description: 'Tối ưu hóa trải nghiệm check-in để tiết kiệm thời gian cho tất cả mọi người'
    },
    {
      icon: faShield,
      title: 'Chính xác',
      description: 'Đảm bảo độ chính xác cao trong việc ghi nhận thông tin và điểm danh'
    },
    {
      icon: faUsers,
      title: 'Thân thiện',
      description: 'Giao diện đơn giản, dễ sử dụng cho cả sinh viên và ban tổ chức'
    },
    {
      icon: faHeart,
      title: 'Tận tâm',
      description: 'Luôn lắng nghe và cải thiện dựa trên phản hồi từ người dùng'
    }
  ];

  const milestones = [
    { year: 'Q1 2025', event: 'Khởi động dự án SEATIFY', description: 'Nghiên cứu và phát triển ý tưởng' },
    { year: 'Q2 2025', event: 'Ra mắt phiên bản thử nghiệm', description: 'Thử nghiệm với 100 sinh viên đầu tiên' },
    { year: 'Q3 2025', event: 'Tích hợp điểm rèn luyện', description: 'Kết nối với hệ thống CTSV' },
    { year: 'Q4 2026', event: 'Mở rộng toàn trường', description: 'Triển khai cho tất cả sự kiện FPT' }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          Giới thiệu về SEATIFY
        </h1>
        <p className="hero-description">
          SEATIFY là giải pháp check-in thông minh được phát triển bởi sinh viên FPT University, 
          nhằm giải quyết các vấn đề trong việc điểm danh và quản lý chỗ ngồi tại các sự kiện seminar.
        </p>
      </section>

      {/* Problem & Solution */}
      <section className="problem-solution-section">
        <div className="problem-card">
          <div className="card-header">
            <h3 className="card-title">
              <div className="icon-circle">
                <FontAwesomeIcon icon={faTriangleExclamation} />
              </div>
              Vấn đề hiện tại
            </h3>
          </div>
          <div className="card-content">
            <p><FontAwesomeIcon icon={faTriangleExclamation} className="inline-icon" /> Điểm danh thủ công (ký tên, đọc tên) mất nhiều thời gian, dễ sai sót</p>
            <p><FontAwesomeIcon icon={faTriangleExclamation} className="inline-icon" /> Người đến trễ gây xáo trộn, khó kiểm soát số lượng thực tế</p>
            <p><FontAwesomeIcon icon={faTriangleExclamation} className="inline-icon" /> Ban tổ chức khó có số liệu chính xác về sinh viên tham dự</p>
            <p><FontAwesomeIcon icon={faTriangleExclamation} className="inline-icon" /> Không có hệ thống quản lý chỗ ngồi, gây quá tải hoặc thiếu chỗ</p>
            <p><FontAwesomeIcon icon={faTriangleExclamation} className="inline-icon" /> Khó khăn trong việc xuất báo cáo và minh chứng điểm rèn luyện</p>
          </div>
        </div>

        <div className="solution-card">
          <div className="card-header">
            <h3 className="card-title">
              <div className="icon-circle">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              Giải pháp SEATIFY
            </h3>
          </div>
          <div className="card-content">
            <p><FontAwesomeIcon icon={faCheckCircle} className="inline-icon" /> Điểm danh tự động bằng QR code, chỉ mất {'< 5'} giây/người</p>
            <p><FontAwesomeIcon icon={faCheckCircle} className="inline-icon" /> Hệ thống đặt chỗ trước, quản lý số lượng người tham gia chính xác</p>
            <p><FontAwesomeIcon icon={faCheckCircle} className="inline-icon" /> Dashboard real-time cho ban tổ chức theo dõi tình hình</p>
            <p><FontAwesomeIcon icon={faCheckCircle} className="inline-icon" /> Quản lý chỗ ngồi thông minh, tránh tình trạng quá tải</p>
            <p><FontAwesomeIcon icon={faCheckCircle} className="inline-icon" /> Xuất file báo cáo (Excel)</p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="vision-mission-section">
        <div className="vision-card">
          <div className="card-header">
            <h3 className="card-title">
              <div className="icon-circle">
                <FontAwesomeIcon icon={faEye} />
              </div>
              Tầm nhìn
            </h3>
          </div>
          <div className="card-content">
            <p>
              Trở thành nền tảng quản lý sự kiện hàng đầu tại các trường đại học Việt Nam, 
              mang đến trải nghiệm chuyên nghiệp và hiện đại như các hội nghị quốc tế.
            </p>
          </div>
        </div>

        <div className="mission-card">
          <div className="card-header">
            <h3 className="card-title">
              <div className="icon-circle">
                <FontAwesomeIcon icon={faBullseye} />
              </div>
              Sứ mệnh
            </h3>
          </div>
          <div className="card-content">
            <p>
              Đơn giản hóa quy trình tổ chức sự kiện, tiết kiệm thời gian cho ban tổ chức, 
              và tạo trải nghiệm tốt nhất cho sinh viên khi tham gia các hoạt động học thuật.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <div className="section-header">
          <h2 className="section-title">Giá trị cốt lõi</h2>
          <p className="section-subtitle">
            Những nguyên tắc định hướng phát triển SEATIFY
          </p>
        </div>

        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">
                <FontAwesomeIcon icon={value.icon} />
              </div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2 className="section-title">Cách thức hoạt động</h2>
          <p className="section-subtitle">
            Quy trình sử dụng SEATIFY đơn giản và nhanh chóng
          </p>
        </div>

        <div className="steps-grid">
          <div className="step-item">
            <div className="step-number">1</div>
            <h3 className="step-title">Đăng nhập</h3>
            <p className="step-description">
              Sinh viên đăng nhập hệ thống
            </p>
          </div>

          <div className="step-item">
            <div className="step-number">2</div>
            <h3 className="step-title">Đặt chỗ ngồi</h3>
            <p className="step-description">
              Chọn vị trí ngồi yêu thích trên sơ đồ hội trường
            </p>
          </div>

          <div className="step-item">
            <div className="step-number">3</div>
            <h3 className="step-title">Nhận QR Code</h3>
            <p className="step-description">
              Nhận mã QR xác nhận qua website/app hoặc email
            </p>
          </div>

          <div className="step-item">
            <div className="step-number">4</div>
            <h3 className="step-title">Check-in nhanh</h3>
            <p className="step-description">
              Quét QR tại cổng, vào sự kiện chỉ trong 5 giây
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="tech-section">
        <div className="section-header">
          <h2 className="section-title">Công nghệ sử dụng</h2>
          <p className="section-subtitle">
            Xây dựng trên nền tảng công nghệ hiện đại
          </p>
        </div>

        <div className="tech-grid">
          <div className="tech-card">
            <h3 className="tech-title">Front-end</h3>
            <div className="tech-badges">
              <span className="tech-badge">React.js</span>
              <span className="tech-badge">CSS</span>
              <span className="tech-badge">JavaScript</span>
            </div>
          </div>

          <div className="tech-card">
            <h3 className="tech-title">Back-end</h3>
            <div className="tech-badges">
              <span className="tech-badge">Spring Boot</span>
              {/* <span className="tech-badge">Firebase</span> */}
              <span className="tech-badge">QR Code API</span>
            </div>
          </div>

          <div className="tech-card">
            <h3 className="tech-title">Analytics</h3>
            <div className="tech-badges">
              <span className="tech-badge">Google Analytics</span>
              {/* <span className="tech-badge">Dashboard Real-time</span> */}
              <span className="tech-badge">Export Excel</span>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="section-header">
          <h2 className="section-title">Lộ trình phát triển</h2>
          <p className="section-subtitle">
            Hành trình và kế hoạch của SEATIFY
          </p>
        </div>

        <div className="timeline">
          <div className="timeline-line"></div>
          <div className="timeline-items">
            {milestones.map((milestone, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <div className="timeline-badge">{milestone.year}</div>
                  <h3 className="timeline-title">{milestone.event}</h3>
                  <p className="timeline-description">{milestone.description}</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <div className="section-header">
          <h2 className="section-title">Đội ngũ phát triển</h2>
          <p className="section-subtitle">
            Những con người đằng sau SEATIFY
          </p>
        </div>

        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar">
                <img src={member.avatar} alt={`${member.name} avatar`} className="team-avatar-image" />
              </div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="stats-header">
          <h2 className="stats-title">Thành tựu đạt được</h2>
          <p className="stats-subtitle">
            Những con số ấn tượng của SEATIFY
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">156+</div>
            <p className="stat-label">Sự kiện đã tổ chức</p>
          </div>
          <div className="stat-item">
            <div className="stat-number">12,450+</div>
            <p className="stat-label">Sinh viên sử dụng</p>
          </div>
          <div className="stat-item">
            <div className="stat-number">99.8%</div>
            <p className="stat-label">Độ chính xác</p>
          </div>
          <div className="stat-item">
            <div className="stat-number">{'< 5s'}</div>
            <p className="stat-label">Thời gian check-in</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
