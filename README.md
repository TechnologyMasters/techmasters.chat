# Technology Masters Website

The official website for the #TechMasters Slack Group [techmasters.chat](http://techmasters.chat)

The site is published using [Jekyll](https://jekyllrb.com), a Ruby Gem that creates static
pages that can be hosted anywhere.

## Installation

The Vagrant installation is recommended because it requires fewer steps, ensures the correct 
version of all the dependencies, doesn't require NVM and won't clutter your system.

### Vagrant Installation

Vagrant will create a virtual machine, provision it with Jekyll and all its dependencies, 
forward port 4000 to your host OS and synchronize the repository directory with a `/vagrant` 
directory inside the virtual machine. This allows you to use your favourite IDE on your host OS.

- Install VirtualBox
- Install Vagrant
- Open a terminal (cmd on Windows)
- `git clone <this_repo>`
- `cd <this_repo>`
- `vagrant up` then wait for Vagrant to finish provisioning the virtual machine
- `vagrant ssh` to terminal into the virtual machine
- Username `vagrant` password `vagrant`
- `cd /vagrant`
- `jekyll server --watch --force_polling --host 0.0.0.0` or `source /vagrant/runserver.sh` to start serving
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
- `jekyll serve -w --force_polling` or `source ./runserver.sh` to start serving
- browse to [http://localhost:8124](http://localhost:4000)

## Usage

Assuming Vagrant is being used:

- `vagrant up` to ensure the virtual machine is running
- `vagrant ssh` to terminal into the virtual machine
- Username `vagrant` password `vagrant`
- `source ./runserver.sh` to start serving
- browse to [http://localhost:8124](http://localhost:4000)

Jekyll will watch for changes and update the trigger a rebuild.

**NOTE:** The `--force_polling` flag on Jekyll serve is required by some host operating systems (Windows) in order to 
overcome a VirtualBox "sendfile" bug. Without it, changes to files won't trigger the watcher to rebuild.

Visit the [Jekyll Documentation](https://jekyllrb.com/docs/home/) for information on how to modify pages and settings.

## Deployment

Simply push to GitHub and GitHub Pages will automatically build.

## Contributing

- Fork this repository on GitHub
- `git clone <your_fork>`
- `git checkout -b feature-branch-name` where `feature-branch-name` describes what your change will be
- Make the necessary changes
- Thoroughly test your changes
- `git commit -am "this is what I did"`
- `git push -u origin feature-branch-name`
- Create a pull request on GitHub

### Rules for Contributing

- Please maintain the same the same code style as the rest of the code base.
- One pull request per feature.

## License

The MIT License (MIT). See [LICENSE](./LICENSE) for more details.