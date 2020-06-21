const github = require('@actions/github');
const core = require('@actions/core');

const head_sha = github.context.payload.pull_request?.head?.sha || github.context.sha
const repository = github.context.payload.repository.full_name

const axios = require('axios');
const data = {
  "name": 'Test coverage',
  "head_sha": head_sha,
  "status": "completed",
  "started_at": new Date(),
  "completed_at": new Date(),
  "conclusion": "success",
  "output": {
    "title": core.getInput('title'),
    "summary": core.getInput('summary')
  }
}

axios.post(
  `https://api.github.com/repos/${repository}/check-runs`, data, {
  headers: {
    "Content-Type": 'application/json',
    "Accept": 'application/vnd.github.antiope-preview+json',
    "Authorization": `Bearer ${core.getInput('github-token')}`,
    "User-Agent": 'test-check-runs-action'
  }
})
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.log(error);
  });
