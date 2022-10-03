export const checkDiff = ({ github, context }) => {
  github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: "comment body",
  });
};
