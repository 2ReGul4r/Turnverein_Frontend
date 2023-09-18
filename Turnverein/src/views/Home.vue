<template>
</template>

<script lang="ts">
import SportsCard from "@/components/SportsCard.vue";
import axiosInstance from "../axios-config";
import { AxiosResponse, AxiosError } from "axios";

export default {
  name: "Home",
  components: {
    SportsCard,
  },
  methods: {
    async fetchCourses() {
      await axiosInstance.get(
        "courses/",
        { headers: { "Authorization": `Token ${localStorage.getItem("token")}` }}
      ).then(async (response: AxiosResponse) => {
        console.log(response.data)
      }).catch((error: AxiosError) => {
        console.log(error);
      });
    },
  },
  mounted() {

  },
  data() {
    return {
      
    }
  }
};
</script>
