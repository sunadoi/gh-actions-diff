module.exports = async ({ github, context, isSuccess }) => {
  console.log({ isSuccess });
  const { data: comments } = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
  });
  const botComment = comments.find((comment) => {
    return comment.user.type === "Bot" && comment.body.includes("body");
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
    body: "comment",
  });
};
