// mongodb://<dbuser>:<dbpassword>@ds059938.mongolab.com:59938/azix

module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8000,
  dbhost: process.env.DBHOST || 'ds059938.mongolab.com:59938',
  dbuser: 'azix',
  dbpassword: process.env.DBPASSWORD || 'azix',
  dbname: 'azix',
  bareRepo: 'assets/bareRepo.git',
  repositories: process.env.NODE_ENV === 'prod' ? '/home/ubuntu/repos' : '/tmp/repos',
  ami: 'ami-0e36f866', // Ubuntu 12.04 LTS
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  ec2RepoPath: '/tmp/repo'
};
