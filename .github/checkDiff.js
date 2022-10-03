const commentPR = `
Uncommitted changes were detected after runnning <code>generate</code> command.
Please run <code>pnpm run generate:locales</code> or <code>pnpm run generate:api-docs</code> to generate/update the related files, and commit them.";
`;

module.exports = async ({ github, context, isSuccess }) => {
  console.log({ isSuccess });
  const { data: comments } = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
  });

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
