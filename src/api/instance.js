import axios from 'axios';
import {useUserStore} from "@/stores/userStore.js";
import {toast} from "vue3-toastify";
import {getCookie, setCookie} from "@/utils/cookiesManager.js";

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

if (!localStorage.getItem('token')) {
  let uuid = getCookie('UUID');
  if (!uuid) {
    uuid = crypto.randomUUID();
    setCookie('UUID', uuid);
  }

  headers.UUID = uuid;
}

const callErrorToast = (text) => {
  const options = {
    position: 'top-center',
    hideProgressBar: true,
    autoClose: 3000,
    transition: 'slide',
    closeButton: false
  };

  toast.error(text, options);
}

const authRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + '/api',
  headers: {
    post: headers,
    get: headers,
    patch: headers,
    delete: headers
  }
});

const guestRequest = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + '/api',
  headers: {
    post: headers,
    get: headers,
    patch: headers,
    delete: headers
  }
});

authRequest.interceptors.request.use(
  (config) => {
    config.headers['authorization'] = `Bearer ${localStorage.getItem('token')}`;
    const currentUrl = new URL(config.url, config.baseURL);

    const url_params = config?.url_params ?? config.data?.url_params;

    if (url_params) {
      Object.entries(url_params || {}).forEach(([k, v]) => {
        currentUrl.pathname = currentUrl.pathname.replace(`:${k}`, encodeURIComponent(v));
      });
    } else {
      currentUrl.pathname = currentUrl.pathname.replace('/:id', '');
    }

    if (config.query) {
      Object.entries(config.query || {}).forEach(([k, v]) => {
        currentUrl.searchParams.set(k, v);
      });
    }

    return {
      ...config,
      url: currentUrl.pathname + currentUrl.search
    };
  },
  (error) => Promise.reject(error)
);

authRequest.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    const userStore = useUserStore();
    callErrorToast(error.response.data.error)
    if (error.status === 401) {
      userStore.logout();
    }
    return Promise.reject(error);
  }
);

guestRequest.interceptors.request.use(
  (config) => {
    const currentUrl = new URL(config.url, config.baseURL);

    const url_params = config?.url_params ?? config.data?.url_params;

    if (url_params) {
      Object.entries(url_params || {}).forEach(([k, v]) => {
        currentUrl.pathname = currentUrl.pathname.replace(`:${k}`, encodeURIComponent(v));
      });
    } else {
      currentUrl.pathname = currentUrl.pathname.replace('/:id', '');
    }

    if (config.query) {
      Object.entries(config.query || {}).forEach(([k, v]) => {
        currentUrl.searchParams.set(k, v);
      });
    }

    return {
      ...config,
      url: currentUrl.pathname + currentUrl.search
    };
  },
  (error) => Promise.reject(error)
);

guestRequest.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    callErrorToast(error.response.data.error)

    return Promise.reject(error);
  }
);

export { authRequest, guestRequest };
