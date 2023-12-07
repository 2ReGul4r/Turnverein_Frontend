<template>
  <v-dialog v-model="isActive" activator="parent" class="dialog">
    <v-card title="Create member">
      <v-form @submit.prevent="createMember">
        <div class="wrapper">
          <v-text-field
            v-model="member.first_name"
            label="First name"
            :rules="isRequired"
            variant="outlined"
          />
          <v-text-field
            v-model="member.last_name"
            label="Last name"
            :rules="isRequired"
            variant="outlined"
          />
          <v-text-field
            v-model="member.birthday"
            label="Birthday"
            :rules="isRequired"
            variant="outlined"
            type="date"
          />
          <v-text-field
            v-model="member.street"
            label="Street"
            :rules="isRequired"
            variant="outlined"
          />
          <v-text-field
            v-model="member.house_number"
            label="House number"
            :rules="isRequired"
            variant="outlined"
          />
          <v-text-field
            v-model="member.postcode.postcode"
            label="Postcode"
            :rules="isRequired"
            variant="outlined"
          />
          <v-text-field
            v-model="member.postcode.city"
            label="City"
            :rules="isRequired"
            variant="outlined"
          />
        </div>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Save" type="submit"></v-btn>
          <v-btn text="Cancel" @click="isActive = false"></v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "@/axios-config";
import { AxiosError, AxiosResponse } from "axios";
import { mapStores } from "pinia";
import { useUserStore } from "@/store/user";
import { isRequired, notEmptyArray } from "@/validations";
import { useAppStore } from "@/store/app";
import { Member } from "types";

export default defineComponent({
  name: "MemberCreatePopup",
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapStores(useUserStore, useAppStore),
  },
  methods: {
    async createMember() {
      await axiosInstance
        .post(
          "member",
          { ...this.member },
          { headers: { Authorization: `Token ${localStorage.getItem("token")}` }},
        )
        .then(async (response: AxiosResponse) => {
          this.isActive = false;
          await this.appStore.fetchMember(this.page);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
  },
  data() {
    return {
      isActive: false,
      isFormValid: false,
      isRequired: [isRequired],
      notEmptyArray: [notEmptyArray],
      member: {
        first_name: "" as String,
        last_name: "" as String,
        birthday: "" as String,
        street: "" as String,
        house_number: "" as String,
        postcode: {
          postcode: null as Number | null,
          city: "" as String,
        },
      }
    };
  },
});
</script>

<style scoped>
.dialog {
  width: clamp(320px, 100%, 640px);
}
.wrapper {
  margin: 32px 32px 0px;
}

.wrapper * {
  margin-bottom: 12px;
}
</style>
