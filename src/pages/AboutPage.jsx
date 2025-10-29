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
import mentor from '../images/mentor.jpg';

const AboutPage = () => {
  const team = [
    // { name: 'ABC', role: 'Pro', avatarUrl: 'https...' }
    { name: 'Cao Hữu Đức', role: 'CEO / Team Leader', avatar: avatar01 },
    { name: 'Lê Văn Nguyễn', role: 'CTO/ Frontend & Backend Developer', avatar: avatar02 },
    { name: 'Bùi Dương Bảo Trân', role: 'CMO (Giám đốc Marketing)', avatar: avatar05 },
    { name: 'Châu Mai Anh', role: 'COO (Giám đốc Vận hành)', avatar: avatar03 },
    { name: 'Trần Nguyễn Ngọc Phụng', role: 'CFO (Giám đốc Tài chính)', avatar: avatar04 }
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

        {/* Mentor (placed under subtitle) */}
        <section className="mentor-section">
          <div className="mentor-card">
            <div className="mentor-star" aria-hidden="true">
              {/* Glowing 5-point star with gradient */}
              <svg viewBox="0 0 64 64" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="mentorStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <filter id="mentorStarGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <polygon filter="url(#mentorStarGlow)" fill="url(#mentorStarGradient)" points="32,4 39,23 60,24 43,36 48,56 32,45 16,56 21,36 4,24 25,23" />
              </svg>
            </div>

            <div className="mentor-bg" aria-hidden="true">
              {/* Enhanced decorative backdrop */}
              <svg viewBox="0 0 400 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="mentorLine" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient id="mentorParticle" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  </linearGradient>
                  <filter id="mentorGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Constellation stars and lines */}
                <g opacity="0.2" stroke="url(#mentorLine)" fill="none">
                  <circle cx="30" cy="30" r="1.5" fill="#8b5cf6" />
                  <circle cx="80" cy="50" r="1.2" fill="#3b82f6" />
                  <circle cx="150" cy="25" r="1.8" fill="#8b5cf6" />
                  <circle cx="220" cy="60" r="1.3" fill="#3b82f6" />
                  <circle cx="280" cy="35" r="1.6" fill="#8b5cf6" />
                  <circle cx="340" cy="55" r="1.4" fill="#3b82f6" />
                  <circle cx="370" cy="25" r="1.1" fill="#8b5cf6" />
                  
                  <polyline points="30,30 80,50 150,25 220,60 280,35 340,55 370,25" strokeWidth="1" />
                </g>
                
                {/* Floating particles */}
                <g opacity="0.3">
                  <circle cx="50" cy="80" r="0.8" fill="url(#mentorParticle)" filter="url(#mentorGlow)" />
                  <circle cx="120" cy="100" r="0.6" fill="url(#mentorParticle)" filter="url(#mentorGlow)" />
                  <circle cx="200" cy="90" r="0.9" fill="url(#mentorParticle)" filter="url(#mentorGlow)" />
                  <circle cx="280" cy="110" r="0.7" fill="url(#mentorParticle)" filter="url(#mentorGlow)" />
                  <circle cx="350" cy="85" r="0.5" fill="url(#mentorParticle)" filter="url(#mentorGlow)" />
                </g>
                
                {/* Geometric patterns */}
                <g opacity="0.1" stroke="url(#mentorLine)" fill="none">
                  <polygon points="60,120 80,100 100,120 80,140" strokeWidth="0.5" />
                  <polygon points="180,130 200,110 220,130 200,150" strokeWidth="0.5" />
                  <polygon points="300,125 320,105 340,125 320,145" strokeWidth="0.5" />
                </g>
                
                {/* Subtle wave pattern */}
                <path d="M0,160 Q100,140 200,160 T400,160" stroke="url(#mentorLine)" strokeWidth="0.5" fill="none" opacity="0.15" />
              </svg>
            </div>

            <div className="mentor-badge">🌟 <span className="mentor-title-gradient">Mentor</span> 🌟</div>
            <div className="mentor-avatar">
              <img src={mentor} alt="Ảnh Mentor" className="mentor-avatar-image" />
            </div>
            <h3 className="mentor-name">Thầy Võ Thiên Ân</h3>
            {/* <p className="mentor-role">Mentor</p> */}
          </div>
        </section>

        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar">
                <img src={member.avatar} alt={`${member.name} avatar`} className="team-avatar-image" />
                {/* Enhanced decorative SVG for team members */}
                <div className="team-decoration" aria-hidden="true">
                  <svg viewBox="0 0 120 120" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id={`teamGradient${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
                      </linearGradient>
                      <filter id={`teamGlow${index}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {/* Enhanced corner decorations */}
                    <g opacity="0.6" filter={`url(#teamGlow${index})`}>
                      <circle cx="8" cy="8" r="2" fill="url(#teamGradient${index})" />
                      <circle cx="112" cy="8" r="1.8" fill="url(#teamGradient${index})" />
                      <circle cx="8" cy="112" r="1.9" fill="url(#teamGradient${index})" />
                      <circle cx="112" cy="112" r="1.7" fill="url(#teamGradient${index})" />
                      {/* Connecting lines with more presence */}
                      <path d="M8,8 L20,20 M112,8 L100,20 M8,112 L20,100 M112,112 L100,100" 
                            stroke="url(#teamGradient${index})" strokeWidth="0.8" fill="none" />
                      {/* Additional decorative elements */}
                      <circle cx="60" cy="15" r="1.2" fill="url(#teamGradient${index})" />
                      <circle cx="60" cy="105" r="1.1" fill="url(#teamGradient${index})" />
                      <circle cx="15" cy="60" r="1.3" fill="url(#teamGradient${index})" />
                      <circle cx="105" cy="60" r="1" fill="url(#teamGradient${index})" />
                    </g>
                  </svg>
                </div>
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
