# cs4500 Project

## Useful links

- [Project Homepage](http://cs4500.billmollonline.com)
- [Update the Homepage](http://cs4500.billmollonline.com/update)
- [Project GitLab Page](https://gitlab.billmollonline.com/thsmrtone1/cs4500)
- [Useful git cheat sheet](https://services.github.com/on-demand/downloads/github-git-cheat-sheet.pdf)
- [Download git](https://git-scm.com/downloads)

## How to use git

All commands assume your current directory 'cd' is the repo directory (except for 'git clone')

#### Clone the Repository (only needed initially)

```
cd <parent_dir>    // Parent directory where you want to put the cloned repo
git pull https://gitlab.billmollonline.com/thsmrtone1/cs4500.git
// You will need to enter your gitlab username and password
```

#### Pull updates into your 'local' repo

```
git pull
```

#### Add files to git

You need to do this if you've created a new file. This command will add all new files in your local repo. You have the option of adding only specific [file]s.

```
git add [file]
```

#### Commit changes

You will be asked to write a summary of your commit.

```
git commit
```

#### Push your commits to the gitlab repo

```
git push
```
