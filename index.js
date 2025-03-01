import * as core from '@actions/core';
import * as github from '@actions/github';
import axios from 'axios';

async function run() {
  try {
    // Ensure this action only runs for pull_request events
    if (github.context.eventName !== 'pull_request') {
      core.setFailed('This action only runs for pull_request events.');
      return;
    }

    // Get inputs
    const token = core.getInput('github-token', { required: true });
    const repo = process.env.GITHUB_REPOSITORY;
    
    // Add debug logging for input values
    const inputBaseBranch = core.getInput('base-branch');
    const prBaseBranch = github.context.payload.pull_request.base.ref;
    core.info(`Input base-branch: ${inputBaseBranch}`);
    core.info(`PR base branch: ${prBaseBranch}`);
    
    // Get base-branch from input, if not provided use the PR's base branch
    const baseBranch = inputBaseBranch || prBaseBranch;
    core.info(`Selected base branch for checking: ${baseBranch}`);

    if (!token || !repo) {
      core.setFailed('Missing required environment variables: GITHUB_TOKEN or GITHUB_REPOSITORY');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    };

    core.info(`Checking workflow runs for ${baseBranch} branch...`);

    // Fetch the latest completed workflow runs for the base branch
    const url = `https://api.github.com/repos/${repo}/actions/runs?branch=${baseBranch}&status=completed`;
    core.info(`Fetching from URL: ${url}`);  // Add URL logging
    
    const response = await axios.get(url, { headers });
    const runs = response.data.workflow_runs;

    if (!runs || runs.length === 0) {
      core.setFailed(`No workflow runs found for ${baseBranch} branch`);
      return;
    }

    // Get the most recent completed run
    const latestRun = runs[0];
    core.info(`Latest workflow run details:`);
    core.info(`  Name: ${latestRun.name}`);
    core.info(`  Status: ${latestRun.status}`);
    core.info(`  Conclusion: ${latestRun.conclusion}`);
    core.info(`  Created at: ${latestRun.created_at}`);

    const isGreen = latestRun.conclusion === 'success';
    core.info(`Base branch status: ${isGreen ? 'GREEN' : 'RED'}`);
    core.setOutput('is-base-green', isGreen.toString());

    if (!isGreen) {
      core.setFailed(`⛔ Cannot proceed: ${baseBranch} branch is RED`);
    }
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
