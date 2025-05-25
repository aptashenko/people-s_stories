import {authRequest, guestRequest} from "@/api/instance.js";
import {ROUTES} from "@/api/constants/routes.js";

const apiRequest = () => {
  if (localStorage.getItem("token")) {
    return authRequest
  } else {
    return guestRequest
  }
}

export const API = {
  auth: {
    signUp: (payload) => apiRequest().post(ROUTES.AUTH.SIGN_UP, payload),
    signIn: (payload) => apiRequest().post(ROUTES.AUTH.SIGN_IN, payload),
  },
  user: {
    getUser: () => apiRequest().get(ROUTES.USERS.USER_ACCESS.PROFILE),
    getAllUsers: () => apiRequest().get(ROUTES.USERS.ADMIN_ACCESS.GET_ALL),
    switchRole: (payload) => apiRequest().patch(ROUTES.USERS.ADMIN_ACCESS.SWITCH_ROLE, {role: payload.role}, {url_params: {id: payload.id}}),
    updateProfile: (payload) => apiRequest().patch(ROUTES.USERS.USER_ACCESS.UPDATE, payload)
  },
  stories: {
    getAllApproved: () => apiRequest().get(ROUTES.STORIES.GET_ALL),
    getAllUnapproved: () => apiRequest().get(ROUTES.STORIES.GET_ALL, {query: {unapproved: true}}),
    getStory: (payload) => apiRequest().get(ROUTES.STORIES.GET_STORY, {url_params: {id: payload}}),
    addStory: (payload) => apiRequest().post(ROUTES.STORIES.CREATE, payload),
    deleteStory: (payload) => apiRequest().delete(ROUTES.STORIES.DELETE, {url_params: {id: payload}}),
    approve: (payload) => apiRequest().patch(ROUTES.STORIES.APPROVE_STORY, {url_params: {id: payload}}),
    hug: (payload) => apiRequest().patch(ROUTES.STORIES.ADD_HUG, {url_params: {id: payload}}),
  }
}
