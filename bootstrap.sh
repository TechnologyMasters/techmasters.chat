apt-get update # needed to install python-software-properties
apt-get install -y python-software-properties # needed to add apt-get repos
apt-add-repository -y ppa:brightbox/ruby-ng-experimental # needed to install ruby2.0
apt-get update # recognize new repo

# utils
apt-get install -y curl
apt-get install -y git

# jekyll (http://michaelchelen.net/81fa/install-jekyll-2-ubuntu-14-04/)
apt-get install -y build-essential
apt-get install -y ruby2.0 ruby2.0-dev
apt-get install -y make gcc
apt-get install -y nodejs
gem install jekyll --no-rdoc --no-ri
gem install github-pages therubyracer --no-rdoc --no-ri
