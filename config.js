// mongodb://<dbuser>:<dbpassword>@ds059938.mongolab.com:59938/azix
var path = require('path');

module.exports = {
  host: process.env.HOST || 'ec2-54-89-13-96.compute-1.amazonaws.com',
  port: process.env.PORT || 8000,
  dbhost: process.env.DBHOST || 'ds059938.mongolab.com:59938',
  dbuser: 'azix',
  dbpassword: process.env.DBPASSWORD || 'azix',
  dbname: 'azix',
  bareRepo: 'assets/bareRepo.git',
  repositories: process.env.NODE_ENV === 'prod' ? path.join(process.env.HOME, 'repos') : '/tmp/repos',
  ami: 'ami-0e36f866', // Ubuntu 12.04 LTS
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  ec2RepoPath: '/tmp/repo'
};
