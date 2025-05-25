export const ROUTES = {
  AUTH: {
    SIGN_UP: '/auth/signup',
    SIGN_IN: '/auth/signin',
  },
  USERS: {
    ADMIN_ACCESS: {
      GET_ALL: '/users',
      SWITCH_ROLE: '/users/:id/role'
    },
    USER_ACCESS: {
      PROFILE: '/profile',
      UPDATE: '/user'
    }
  },
  STORIES: {
    GET_ALL: '/stories',
    CREATE: '/stories/create',
    GET_STORY: '/stories/:id',
    DELETE: '/stories/:id',
    APPROVE_STORY: '/stories/:id/approve',
    ADD_HUG: '/stories/:id/hug',
  }
}
