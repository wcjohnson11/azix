module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8000,
  dbhost: process.env.DBHOST || 'localhost',
  dbname: 'azix',
  bareRepo: 'assets/bareRepo.git',
  repositories: 'repos',
  ami: 'ami-5a75b432'
};
