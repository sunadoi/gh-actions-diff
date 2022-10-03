module.exports = async ({ github, context, isSuccess }) => {
  console.log({ isSuccess });
  const { data: comments } = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
  });
  const commentPR =
    "Uncommitted changes were detected after runnning `generate` command.\nPlease run `pnpm run generate:locales` or `pnpm run generate:api-docs` to generate/update the related files, and commit them.";

  const botComment = comments.find((comment) => {
    return comment.user.type === "Bot" && comment.body.includes(commentPR);
  });

  if (botComment) {
    github.rest.issues.deleteComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      comment_id: botComment.id,
    });
  }

  github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: commentPR,
  });
};
