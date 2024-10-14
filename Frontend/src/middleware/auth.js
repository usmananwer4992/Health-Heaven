export const checkRole = (requiredRole) => (nextState, replace) => {
  const userRole = store.getState().user.roles;

  if (!userRole.includes(requiredRole)) {
    replace("/access-denied"); // Redirect to access-denied page if roles don't match
  }
};
