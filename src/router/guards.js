export function requiresAuth(to, userStore) {
  return to.meta.requiresAuth && !userStore.isAuthenticated;
}

export function requiresAdmin(to, userStore) {
  return to.meta.requiresAdmin && userStore.user?.role !== 'admin';
}

export function guestOnly(to, userStore) {
  return to.meta.guestOnly && userStore.isAuthenticated;
}
