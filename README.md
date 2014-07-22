Azix
====
We’re trying to abstract away execution and version-control from data analytics by building a Github for data science projects.  It will allow a user to run scripts on AWS VMs and easily access and share the reports/output through a CLI and web application.

## Workflow

1. `azix init`
2. Add data to the data directory, add scripts to the scripts directory with a `main.R` or `main.py` file. If you can `cd` into the scripts directory and `Rscript` or `python` the `main.R` or `main.py` file and have it run successfully, it will run on EC2.
3. `azix run`
4. wait
5. `azix fetch`

## Features we would like to add

- Auth
- A list of users' run logs and the ability to click on one and download/view the data/scripts/output from that run
  - note that output is not necessarily only stdout, could also be plots or other images generated from the scripts
- A way to start a project in the browser, ie upload data, write/edit scripts and run them
- Some way to produce and publish a nice looking write up of results

## Deployment

For anyone that wants to set this up on their own AWS account. This is a painful process that would be automated better if we had worked on it for more than a week.

### Set up AWS

1. Create an AWS account or ask jlburkhead for his email/password since there is the potential for small charges.
2. Log into the AWS console and click on EC2 under Compute & Networking
3. Click `Launch Instance` and under Community AMIs search for 'ami-988a43f0' (you might have to select 'Other Linux') and click select
4. Make sure the next screen has 't1.micro' selected then click `Review and Launch`
5. Click `Edit Security Groups` and `Add Rule` and change **Port Range** to 8000 and **Source** to 'Anywhere'
   - ssh (port 22) should already be allowed from Anywhere, but just verify that it is
6. Click `Launch` and select `Create a new key pair` and name it whatever you want. Download the Key Pair and save it somewhere convenient.
7. Finally, `Launch Instance`. This might take a few minutes.

### Set up instance

The instance just launched will have everything needed to run azix installed (node, mongo, file system set up, etc.) and it has a cloned version of the Azix/azix repo checked out on the dev branch.

1. Go to the **Instances** panel of the EC2 console. The instance you just created should have a green running state.
2. Click on that instance and copy the Public DNS that shows up in the lower half of the screen.
3. Go to the command line and run

```shell
chmod 600 /PATH/TO/KEYPAIR
ssh -X -c blowfish -i /PATH/TO/KEYPAIR ubuntu@PUBLIC_DNS
```

4. Once you are `ssh`'d into the EC2 instance run `subl deploy.sh`
  - copy the Public DNS into the quotes next to `HOST`
  - Click your name in the top right and click `Security Credentials`. Under `Access Keys` click `Create New Access Key`. Copy the Access Key ID and Secret Access Key into `deploy.sh`
  - Save the changes and close sublime
5. Run `. deploy.sh` in the terminal `ssh`'d into the EC2 instance. Hit Enter when its done and `logout`

At this point you should be able to navigate to `PUBLIC_DNS:8000` and see the Azix login page.

### Set up CLI

1. In your local clone of the repo go to the cli directory and edit `lib/serverutils.js` so that `serverURL` is the public DNS.
2. Run `npm install -g .` from the cli directory

Now everything's set up, and you **should** be able to run azix init/run from the command line.