import { defineStore } from 'pinia'
import {API} from "@/api/index.js";
import {ref} from "vue";
import {useUserStore} from "@/stores/userStore.js";

export const useStoriesStore = defineStore('storiesStore', () => {
  const storiesList = ref([]);
  const loading = ref(true);
  const hugging = ref(false);
  const userStore = useUserStore();

  const getAllApproved = async () => {
    loading.value = true;
    try {
      const { data } = await API.stories.getAllApproved();
      return data.data;
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false;
    }
  }
  const getAllUnapproved = async () => {
    loading.value = true;
    try {
      const { data } = await API.stories.getAllUnapproved();
      return data.data;
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false;
    }
  }

  const getStory = async (id) => {
    loading.value = true;
    try {
      const { data } = await API.stories.getStory(id);
      return data.data
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false;
    }
  }

  const addStory = async (payload) => {
    try {
      await API.stories.addStory({text: payload});
    } catch (error) {
      console.log(error)
    }
  }

  const deleteStory = async (payload) => {
    try {
      await API.stories.deleteStory(payload);
    } catch (error) {
      console.log(error)
    }
  }

  const approveStory = async (payload) => {
    try {
      await API.stories.approve(payload);

    } catch (error) {
      console.log(error)
    }
  }

  const addHug = async (payload) => {
    hugging.value = true;

    try {
      const {data} = await API.stories.hug(payload);
      if (userStore.user) {
        userStore.user.total_hugs = data.total_hugs;
      }
      return data.data;

    } catch (error) {
      console.log(error)
    } finally {
      hugging.value = false;
    }
  }

  return {
    getAllApproved,
    getAllUnapproved,
    addStory,
    approveStory,
    deleteStory,
    storiesList,
    getStory,
    loading,
    hugging,
    addHug
  }
})
