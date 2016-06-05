# Technology Masters Website

The official website for the #TechMasters Slack Group [techmasters.chat](http://techmasters.chat)

The site is published using [Jekyll](https://jekyllrb.com), a Ruby Gem that creates static
pages that can be hosted anywhere.

## Installation

The Vagrant installation is recommended because it requires fewer steps, ensures the correct 
version of all the dependencies, doesn't require NVM and won't clutter your system.

### Vagrant Installation

- Install VirtualBox
- Install Vagrant
- Open a terminal (cmd on Windows)
- `git clone <this_repo>`
- `cd <this_repo>`
- `vagrant up` then wait for Vagrant to finish provisioning the virtual machine
- browse to [http://localhost:8124](http://localhost:4000)

### Manual Installation

It is recommended that you use RVM to isolate this Ruby installation from others that
may be on your system.

- [Install Ruby 2.0+](https://www.ruby-lang.org/en/documentation/installation/)
- [Install RVM](https://rvm.io/)
- [Install NodeJS](https://nodejs.org/en/download/)
- `sudo apt-get install gcc make` (this won't work on Windows)
- Switch NVM environments **(needs instructions)**
- `sudo gem install jekyll --no-rdoc --no-ri`
- `sudo gem install github-pages --no-rdoc --no-ri`
- `jekyll serve -w`
- browse to [http://localhost:8124](http://localhost:4000)

## Usage

## Deployment

## Contributing

- `vagrant up`
- `vagrant ssh` to terminal into the virtual machine

## License

The MIT License (MIT). See [LICENSE](./LICENSE) for more details.