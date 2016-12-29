function profile(ctx) {
  render('profile-show', {
    profile: ctx.user
  });
}
