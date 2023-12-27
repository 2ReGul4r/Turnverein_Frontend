<template>
  <v-dialog v-model="isActive" activator="parent" class="dialog" data-testid="member_edit_popup-dialog">
    <v-card title="Edit member">
      <v-form @submit.prevent="editMember">
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
import { AxiosError } from "axios";
import { mapStores } from "pinia";
import { useUserStore } from "@/store/user";
import { isRequired, notEmptyArray } from "@/validations";
import { useAppStore } from "@/store/app";
import { Member } from "types";

export default defineComponent({
  name: "MemberEditPopup",
  props: {
    memberOriginal: {
      type: Object,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapStores(useUserStore, useAppStore),
  },
  methods: {
    async editMember() {
      await axiosInstance
        .put(
          "member",
          { ...this.member },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(async () => {
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
        id: this.memberOriginal.id,
        first_name: this.memberOriginal.first_name,
        last_name: this.memberOriginal.last_name,
        birthday: this.memberOriginal.birthday,
        street: this.memberOriginal.street,
        house_number: this.memberOriginal.house_number,
        postcode: {
          postcode: this.memberOriginal.postcode.postcode,
          city: this.memberOriginal.postcode.city,
        },
      } as Member,
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
