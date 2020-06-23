# Check Runs action

GitHub action to communicate with the check runs API to create more visual actions status and feedback **on pull requests**.

## Inputs

### `github-token`

**Required** Your authentication token from GitHub. Just access the secrets provided in every github action workflow (example usage below).


### `title`

**Required** The title of the check run being created. It will show up on the pull request Checks section


### `output-message`

**Required** Small text that sums up the conclusion of the check run


### `summary`

**Optional** Text that shows up when you click to see the check run details


### `conclusion`

**Optional** The result status of the check run. Default: **success**. Options: **success**, **failure**, **neutral**, **cancelled**, **skipped**, **timed_out** or **action_required**. The available options may change. Reference the [Check runs API documentation](https://developer.github.com/v3/checks/runs).


## Usage example

```
uses: nunesmatheus/check-runs-action@v1
with:
  github-token: ${{ secrets.GITHUB_TOKEN }}
  title: My first check run!
  output-message: Failed miserably
  conclusion: failure
  summary: This check run failed for demonstration purposes
```


## Usage with advanced options example

```
- name: Set coverage info
  id: coverage
  run: |
    coverage=$(./example_script_that_fetches_coverage.sh)
    echo "::set-output name=coverage_percentage::$coverage"
    if (( $(echo "$coverage < 100.0" |bc -l) )); then
      conclusion=failure
      summary='Only acceptable coverage percentage is 100%'
    else
      conclusion=success
      summary='100% coverage!'
    fi

    echo "::set-output name=conclusion::$conclusion"
    echo "::set-output name=summary::$summary"

- name: Coverage action
  uses: nunesmatheus/check-runs-action@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    title: Test coverage
    output-message: ${{ steps.coverage.outputs.coverage_percentage }}% coverage
    conclusion: ${{ steps.coverage.outputs.conclusion }}
    summary: ${{ steps.coverage.outputs.summary }}
```
