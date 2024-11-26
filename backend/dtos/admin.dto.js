class AdminDto {
  id;
  username;
  role;
  createdAt;
  constructor(admin) {
    this.id = admin._id;
    this.username = admin.username;
    this.role = admin.role;
    this.createdAt = admin.createdAt;
  }
}

module.exports = AdminDto;
