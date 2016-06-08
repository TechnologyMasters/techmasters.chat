# Technology Masters [Website][website]

The official website for the [**#TechMasters**][website] Slack Group's website: [TechMasters.chat][website]

The site is published using [Jekyll](https://jekyllrb.com), and hosted on [GitHub Pages](https://help.github.com/articles/about-github-pages-and-jekyll/).

## Installation

You can set up a local version of the site to test changes. We highly recommend installing Jekyll to preview and help troubleshoot failed builds.

Follow the [detailed instructions](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/) provided by Github for local setup.

### Vagrant Installation

If you're running a Windows OS, the Vagrant installation is the easiest approach.

Vagrant will create a virtual machine, provision it with Jekyll and all its dependencies, 
forward port `4000` to your host OS and synchronize the repository directory with a `/vagrant` 
directory inside the virtual machine. This allows you to use your favourite IDE on your host OS.

- Install [Vagrant](https://www.vagrantup.com/)
- install [Vagrant Exec](https://github.com/p0deje/vagrant-exec): `vagrant plugin install vagrant-exec`
- Open a terminal (`cmd` on Windows)
  - `git clone <this_repo>`
  - `cd <this_repo>`
  - `vagrant up` then wait for Vagrant to finish provisioning the virtual machine
  - `vagrant exec server` to start serving
  - browse to [http://localhost:4000](http://localhost:4000) using your favorite browser.

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

## Deployment

Simply push to GitHub and GitHub Pages will automatically build *(assuming your pull request is approved)*

## License

The MIT License (MIT). See [LICENSE](./LICENSE) for more details.

[website]: https://techmasters.chat
