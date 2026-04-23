async function getUserProfile(_req, res) {
  res.json({
    _id: 'demo-user',
    name: 'Demo User',
    email: 'demo@example.com',
    isAdmin: false
  });
}

module.exports = {
  getUserProfile
};
