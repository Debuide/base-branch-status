# Base Branch Status Check

A GitHub Action that checks if the main or base branch is green (all checks passing) before allowing a pull request to proceed. This helps maintain code quality by ensuring you're not merging new changes into a potentially broken main branch.

## Why use this action?

- **Prevent Cascading Issues**: Ensures you're not merging new code on top of a broken main branch
- **Quality Gate**: Acts as an additional safety check in your pull request workflow
- **Automated Verification**: Automatically verifies the health of your base branch
- **Simple Configuration**: Easy to set up with minimal configuration required

## Usage

Add this action to your pull request workflow:

```yaml
name: PR Checks
on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  check-base-branch:
    runs-on: ubuntu-latest
    steps:
      - uses: debuide/base-branch-status-check@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          base-branch: main  # Optional: defaults to 'main'
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `github-token` | GitHub token for API access | Yes | `${{ github.token }}` |
| `base-branch` | Name of the main branch to check | No | `main` |

## Example Scenarios

### Basic Usage
The most common setup, using default settings:

```yaml
- uses: debuide/base-branch-status-check@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

### Custom Base Branch
If you use a different branch name as your main branch:

```yaml
- uses: debuide/base-branch-status-check@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    base-branch: master
```

## How it Works

1. When a pull request is created or updated, this action:
   - Checks the status of your base branch (default: 'main')
   - Verifies that all checks are passing on that branch
   - Blocks the PR if the base branch is not in a healthy state

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
```

NOTE: This actions is not yet published to the GitHub Marketplace. You can use it by referencing the repository directly in your workflow. Still there is a maojor refactoring in progress, like to use octokit instead of the github sdk. Currently this is written in typescript using axios and will be rewritten in a more maintainable way in the future.