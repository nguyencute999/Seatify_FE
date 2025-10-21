// Mock data cho events
export const mockEvents = [
  {
    event_id: 1,
    event_name: "Seminar Công nghệ AI và Machine Learning",
    description: "Khám phá những xu hướng mới nhất trong lĩnh vực trí tuệ nhân tạo và học máy. Buổi seminar sẽ giới thiệu các ứng dụng thực tế và cơ hội nghề nghiệp trong ngành AI.",
    location: "Hội trường A1 - FPT University Hà Nội",
    start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 1 ngày sau
    end_time: new Date(Date.now() + 24 * 60 * 60 * 1000 + 2.5 * 60 * 60 * 1000).toISOString(), // 1 ngày + 2.5 giờ sau
    capacity: 200,
    status: "UPCOMING",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop",
    created_at: "2024-01-15T10:00:00",
    updated_at: "2024-01-15T10:00:00",
    created_by: 1
  },
  {
    event_id: 2,
    event_name: "Workshop Phát triển Web Full-stack",
    description: "Học cách xây dựng ứng dụng web hoàn chỉnh từ frontend đến backend. Workshop thực hành với React, Node.js và MongoDB.",
    location: "Phòng Lab 301 - FPT University Hà Nội",
    start_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 giờ trước
    end_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 giờ sau
    capacity: 50,
    status: "ONGOING",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
    created_at: "2024-01-10T10:00:00",
    updated_at: "2024-01-10T10:00:00",
    created_by: 2
  },
  {
    event_id: 3,
    event_name: "Hội thảo Blockchain và Cryptocurrency",
    description: "Tìm hiểu về công nghệ blockchain, smart contracts và tương lai của tiền điện tử. Diễn giả từ các công ty fintech hàng đầu.",
    location: "Auditorium - FPT University Hà Nội",
    start_time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 ngày trước
    end_time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(), // 3 ngày trước + 2 giờ
    capacity: 300,
    status: "FINISHED",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
    created_at: "2024-01-05T10:00:00",
    updated_at: "2024-01-25T21:00:00",
    created_by: 1
  },
  {
    event_id: 4,
    event_name: "Tech Talk: Cloud Computing và DevOps",
    description: "Chia sẻ kinh nghiệm về triển khai ứng dụng trên cloud và các best practices trong DevOps. Case study từ các dự án thực tế.",
    location: "Phòng họp lớn - Tòa nhà Innovation",
    start_time: "2024-02-20T15:00:00",
    end_time: "2024-02-20T17:30:00",
    capacity: 80,
    status: "UPCOMING",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop",
    created_at: "2024-01-20T10:00:00",
    updated_at: "2024-01-20T10:00:00",
    created_by: 3
  },
  {
    event_id: 5,
    event_name: "Hackathon FPT University 2024",
    description: "Cuộc thi lập trình 48 giờ với chủ đề 'Smart Campus'. Cơ hội thể hiện tài năng và nhận giải thưởng hấp dẫn.",
    location: "Sảnh chính - FPT University Hà Nội",
    start_time: "2024-02-28T08:00:00",
    end_time: "2024-03-01T20:00:00",
    capacity: 100,
    status: "UPCOMING",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
    created_at: "2024-01-28T10:00:00",
    updated_at: "2024-01-28T10:00:00",
    created_by: 2
  },
  {
    event_id: 6,
    event_name: "Seminar Mobile App Development",
    description: "Học cách phát triển ứng dụng di động với React Native và Flutter. So sánh ưu nhược điểm của các framework phổ biến.",
    location: "Phòng Lab 205 - FPT University Hà Nội",
    start_time: "2024-01-30T13:00:00",
    end_time: "2024-01-30T16:00:00",
    capacity: 60,
    status: "FINISHED",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
    created_at: "2024-01-15T10:00:00",
    updated_at: "2024-01-30T16:00:00",
    created_by: 1
  },
  {
    event_id: 7,
    event_name: "Career Fair 2024 - Tech Companies",
    description: "Triển lãm việc làm với sự tham gia của các công ty công nghệ hàng đầu. Cơ hội networking và phỏng vấn trực tiếp.",
    location: "Sân vận động - FPT University Hà Nội",
    start_time: "2024-03-05T09:00:00",
    end_time: "2024-03-05T17:00:00",
    capacity: 500,
    status: "UPCOMING",
    thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=200&fit=crop",
    created_at: "2024-02-01T10:00:00",
    updated_at: "2024-02-01T10:00:00",
    created_by: 3
  },
  {
    event_id: 8,
    event_name: "Workshop Cybersecurity và Ethical Hacking",
    description: "Tìm hiểu về bảo mật thông tin và các kỹ thuật ethical hacking. Thực hành với các công cụ penetration testing.",
    location: "Phòng Lab 401 - FPT University Hà Nội",
    start_time: "2024-02-12T10:00:00",
    end_time: "2024-02-12T12:30:00",
    capacity: 40,
    status: "ONGOING",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=200&fit=crop",
    created_at: "2024-01-12T10:00:00",
    updated_at: "2024-01-12T10:00:00",
    created_by: 2
  },
  {
    event_id: 9,
    event_name: "Tech Conference: Future of Software Development",
    description: "Hội nghị công nghệ với các chủ đề về xu hướng phát triển phần mềm trong tương lai. Keynote speakers từ Google, Microsoft, Amazon.",
    location: "Trung tâm Hội nghị Quốc gia",
    start_time: "2024-03-15T08:00:00",
    end_time: "2024-03-15T18:00:00",
    capacity: 1000,
    status: "UPCOMING",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
    created_at: "2024-02-15T10:00:00",
    updated_at: "2024-02-15T10:00:00",
    created_by: 1
  },
  {
    event_id: 10,
    event_name: "Startup Pitch Competition",
    description: "Cuộc thi thuyết trình ý tưởng khởi nghiệp. Các startup trẻ sẽ trình bày dự án và nhận feedback từ các nhà đầu tư.",
    location: "Hội trường Innovation - FPT University Hà Nội",
    start_time: "2024-01-20T14:00:00",
    end_time: "2024-01-20T18:00:00",
    capacity: 150,
    status: "FINISHED",
    thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop",
    created_at: "2024-01-10T10:00:00",
    updated_at: "2024-01-20T18:00:00",
    created_by: 3
  }
];

// Helper functions để filter events theo status
export const getEventsByStatus = (events, status) => {
  return events.filter(event => event.status === status);
};

export const getFeaturedEvents = (events) => {
  // Lấy các sự kiện sắp diễn ra và đang diễn ra làm nổi bật
  return events.filter(event => 
    event.status === 'UPCOMING' || event.status === 'ONGOING'
  ).slice(0, 6); // Giới hạn 6 sự kiện nổi bật
};

export const getUpcomingEvents = (events) => {
  return getEventsByStatus(events, 'UPCOMING');
};

export const getOngoingEvents = (events) => {
  return getEventsByStatus(events, 'ONGOING');
};

export const getFinishedEvents = (events) => {
  return getEventsByStatus(events, 'FINISHED');
};
