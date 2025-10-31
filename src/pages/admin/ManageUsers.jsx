import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminUsers, addAdminUser } from '../../redux/user/adminUserSlice';

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error, addLoading, addError, addSuccess } = useSelector((state) => state.adminUsers);
  
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mssv: '',
    phone: '',
    status: 'ACTIVE',
    roles: []
  });
  // modal/form cho thêm user mới
  const [showAddModal, setShowAddModal] = useState(false);
  const [formAddData, setFormAddData] = useState({
    fullName: '',
    email: '',
    mssv: '',
    phone: '',
    password: '',
    confirmPassword: '',
    avatarFile: null,
    roles: [],
  });
  const availableRoles = [
    { id: 1, roleName: 'ROLE_USER', description: 'Người dùng thông thường' },
    { id: 2, roleName: 'ROLE_ADMIN', description: 'Quản trị viên' }
  ];

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  // Mapping mới từ API: userId, fullName, email, ...
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       (user.mssv && user.mssv.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter;
    const matchesRole = roleFilter === 'ALL' || user.roles.includes(roleFilter);
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusBadge = (status) => {
    const badges = { 'ACTIVE': 'badge bg-success', 'INACTIVE': 'badge bg-danger' };
    return badges[status] || 'badge bg-secondary';
  };
  const getStatusText = (status) => {
    const texts = { 'ACTIVE': 'Hoạt động', 'INACTIVE': 'Không hoạt động' };
    return texts[status] || status;
  };
  const getAuthProviderBadge = (provider) => {
    const badges = { 'LOCAL': 'badge bg-primary', 'GOOGLE': 'badge bg-danger' };
    return badges[provider] || 'badge bg-secondary';
  };
  const getAuthProviderText = (provider) => {
    const texts = { 'LOCAL': 'Tài khoản nội bộ', 'GOOGLE': 'Google' };
    return texts[provider] || provider;
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      mssv: user.mssv || '',
      phone: user.phone || '',
      status: user.status,
      roles: [...user.roles]
    });
    setShowModal(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    
    // This part needs to be updated to call an API to update the user
    // For now, it will just update the local state, which won't persist
    // setUsers(prev => prev.map(user => 
    //   user.id === editingUser.id 
    //     ? { ...user, ...formData }
    //     : user
    // ));
    
    setShowModal(false);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      // This part needs to be updated to call an API to delete the user
      // For now, it will just update the local state, which won't persist
      // setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const handleStatusToggle = (userId) => {
    // This part needs to be updated to call an API to update the user's status
    // For now, it will just update the local state, which won't persist
    // setUsers(prev => prev.map(user => 
    //   user.id === userId 
    //     ? { ...user, status: user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
    //     : user
    // ));
  };

  const handleRoleToggle = (roleName) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(roleName)
        ? prev.roles.filter(role => role !== roleName)
        : [...prev.roles, roleName]
    }));
  };

  // Mở modal thêm mới
  const handleOpenAddModal = () => {
    setFormAddData({
      fullName: '', email: '', mssv: '', phone: '',
      password: '', confirmPassword: '', avatarFile: null, roles: []
    });
    setShowAddModal(true);
  };
  // Đóng modal và reset
  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setFormAddData({
      fullName: '', email: '', mssv: '', phone: '',
      password: '', confirmPassword: '', avatarFile: null, roles: []
    });
  };
  // Toggle role
  const handleAddRoleToggle = (roleName) => {
    setFormAddData(prev => ({
      ...prev,
      roles: prev.roles.includes(roleName)
        ? prev.roles.filter(role => role !== roleName)
        : [...prev.roles, roleName]
    }));
  };
  // Submit tạo mới
  const handleFileChange = (e) => {
    setFormAddData(d => ({ ...d, avatarFile: e.target.files?.[0] || null }));
  };
  const handleAddUser = (e) => {
    e.preventDefault();
    // validate
    if (!formAddData.fullName.trim() || !formAddData.email.trim() || !formAddData.password.trim() || !formAddData.confirmPassword.trim() || formAddData.roles.length === 0) {
      alert('Vui lòng điền đủ các trường bắt buộc');
      return;
    }
    if (formAddData.password !== formAddData.confirmPassword) {
      alert('Xác nhận mật khẩu chưa đúng');
      return;
    }
    dispatch(addAdminUser(formAddData)).then((res) => {
      if (res.type.endsWith('fulfilled')) {
        handleCloseAddModal();
      }
      // (Có thể show toast/info nếu muốn)
    });
  };
  // Reset form nếu thêm thành công
  useEffect(() => {
    if (showAddModal && addSuccess) handleCloseAddModal();
  }, [addSuccess]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return <div className="alert alert-danger">Lỗi: {error}</div>;
  }

  return (
    <div className="manage-users">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Quản lý người dùng</h2>
          <p className="text-muted">Quản lý tất cả người dùng trong hệ thống</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary">
            <i className="bi bi-download me-2"></i>
            Xuất Excel
          </button>
          <button className="btn btn-primary" onClick={handleOpenAddModal}>
            <i className="bi bi-person-plus me-2"></i>
            Thêm người dùng
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{users.length}</h4>
                  <p className="mb-0">Tổng người dùng</p>
                </div>
                <i className="bi bi-people" style={{ fontSize: '2rem' }}></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{users.filter(u => u.status === 'ACTIVE').length}</h4>
                  <p className="mb-0">Đang hoạt động</p>
                </div>
                <i className="bi bi-person-check" style={{ fontSize: '2rem' }}></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{users.filter(u => !u.verified).length}</h4>
                  <p className="mb-0">Chưa xác thực</p>
                </div>
                <i className="bi bi-person-x" style={{ fontSize: '2rem' }}></i>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4>{users.filter(u => u.roles.includes('ROLE_ADMIN')).length}</h4>
                  <p className="mb-0">Quản trị viên</p>
                </div>
                <i className="bi bi-shield-check" style={{ fontSize: '2rem' }}></i>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo tên, email hoặc MSSV..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="ACTIVE">Đang hoạt động</option>
            <option value="INACTIVE">Không hoạt động</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="ALL">Tất cả vai trò</option>
            <option value="ROLE_USER">Người dùng</option>
            <option value="ROLE_ADMIN">Quản trị viên</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-outline-secondary w-100">
            <i className="bi bi-funnel me-1"></i>
            Lọc
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Thông tin</th>
                  <th>MSSV</th>
                  <th>Liên hệ</th>
                  <th>Trạng thái</th>
                  <th>Vai trò</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.userId}>
                    <td>
                      <img
                        src={user.avatarUrl || '/images/default-avatar.jpg'}
                        alt={user.fullName}
                        className="rounded-circle"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>
                      <div>
                        <div className="fw-bold">{user.fullName}</div>
                        <div className="text-muted small">
                          <span className={getAuthProviderBadge(user.authProvider)}>
                            {getAuthProviderText(user.authProvider)}
                          </span>
                          {user.verified && (
                            <span className="badge bg-success ms-1">
                              <i className="bi bi-check-circle"></i> Xác thực
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{user.mssv || '-'}</td>
                    <td>
                      <div>
                        <div><i className="bi bi-envelope me-1"></i>{user.email}</div>
                        {user.phone && (
                          <div><i className="bi bi-phone me-1"></i>{user.phone}</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={getStatusBadge(user.status)}>
                        {getStatusText(user.status)}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-wrap gap-1">
                        {user.roles.map(role => (
                          <span key={role} className="badge bg-secondary">
                            {role === 'ROLE_ADMIN' ? 'Admin' : 'User'}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEditUser(user)}
                          title="Chỉnh sửa"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-info"
                          title="Xem chi tiết"
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button
                          className={`btn btn-sm ${user.status === 'ACTIVE' ? 'btn-outline-warning' : 'btn-outline-success'}`}
                          onClick={() => handleStatusToggle(user.userId)}
                          title={user.status === 'ACTIVE' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                        >
                          <i className={`bi bi-${user.status === 'ACTIVE' ? 'pause' : 'play'}`}></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteUser(user.userId)}
                          title="Xóa"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-person-x text-muted" style={{ fontSize: '3rem' }}></i>
              <h5 className="mt-3 text-muted">Không tìm thấy người dùng nào</h5>
              <p className="text-muted">Thử thay đổi bộ lọc hoặc tìm kiếm</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit User Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chỉnh sửa người dùng</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSaveUser}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Họ và tên *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">MSSV</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.mssv}
                        onChange={(e) => setFormData(prev => ({ ...prev, mssv: e.target.value }))}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Số điện thoại</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Trạng thái</label>
                    <select
                      className="form-select"
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="ACTIVE">Hoạt động</option>
                      <option value="INACTIVE">Không hoạt động</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Vai trò</label>
                    <div className="d-flex flex-wrap gap-2">
                      {availableRoles.map(role => (
                        <div key={role.id} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`role-${role.id}`}
                            checked={formData.roles.includes(role.roleName)}
                            onChange={() => handleRoleToggle(role.roleName)}
                          />
                          <label className="form-check-label" htmlFor={`role-${role.id}`}>
                            {role.description}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Cập nhật
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* ADD USER MODAL */}
      {showAddModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm người dùng mới</h5>
                <button type="button" className="btn-close" onClick={handleCloseAddModal}></button>
              </div>
              <form onSubmit={handleAddUser}>
                <div className="modal-body">
                  {addError && <div className="alert alert-danger">{addError}</div>}
                  <div className="mb-3">
                    <label className="form-label">Họ và tên *</label>
                    <input type="text" className="form-control" value={formAddData.fullName} onChange={e => setFormAddData(d => ({ ...d, fullName: e.target.value }))} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email *</label>
                    <input type="email" className="form-control" value={formAddData.email} onChange={e => setFormAddData(d => ({ ...d, email: e.target.value }))} required />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">MSSV</label>
                      <input type="text" className="form-control" value={formAddData.mssv} onChange={e => setFormAddData(d => ({ ...d, mssv: e.target.value }))} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Số điện thoại</label>
                      <input type="text" className="form-control" value={formAddData.phone} onChange={e => setFormAddData(d => ({ ...d, phone: e.target.value }))} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Mật khẩu *</label>
                      <input type="password" className="form-control" value={formAddData.password} onChange={e => setFormAddData(d => ({ ...d, password: e.target.value }))} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Xác nhận mật khẩu *</label>
                      <input type="password" className="form-control" value={formAddData.confirmPassword} onChange={e => setFormAddData(d => ({ ...d, confirmPassword: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Avatar (file ảnh)</label>
                    <input type="file" className="form-control" onChange={handleFileChange} accept="image/*" />
                    {formAddData.avatarFile && (
                      <span className="text-success small">Đã chọn: {formAddData.avatarFile.name}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Vai trò *</label>
                    <div className="d-flex flex-wrap gap-2">
                      {availableRoles.map(role => (
                        <div key={role.id} className="form-check">
                          <input className="form-check-input" type="checkbox" id={`addrole-${role.id}`} checked={formAddData.roles.includes(role.roleName)} onChange={() => handleAddRoleToggle(role.roleName)} />
                          <label className="form-check-label" htmlFor={`addrole-${role.id}`}>{role.description}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseAddModal}>Hủy</button>
                  <button type="submit" className="btn btn-primary" disabled={addLoading}>{addLoading ? 'Đang lưu...' : 'Tạo mới'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;