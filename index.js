const github = require('@actions/github');
const core = require('@actions/core');

if(!github.context.payload.pull_request)
  core.setFailed('A pull request is required to run the action')

const head_sha = github.context.payload.pull_request.head.sha

const axios = require('axios');
const data = {
  "name": core.getInput('title'),
  "head_sha": head_sha,
  "status": "completed",
  "started_at": new Date(),
  "completed_at": new Date(),
  "conclusion": "success",
  "output": {
    "title": core.getInput('output-message'),
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
