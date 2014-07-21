module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8000,
  dbhost: process.env.DBHOST || 'localhost',
  dbname: 'azix',
  bareRepo: 'assets/bareRepo.git',
  repositories: '/tmp/repos',
  ami: 'ami-983cf2f0', // Ubuntu 12.04 LTS
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  ec2RepoPath: '/tmp/repo'
};
