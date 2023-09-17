<template>
    <v-card
        v-if="sportdata && trainer"
        :title="getTitle"
        :subtitle="getTrainerName"
    >
        <v-card-actions>
            <v-btn @click="editSport">Edit</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
export default defineComponent({
    name: "SportsCard",
    props: {
        sportdata: {
            type: Object
        },
        trainer: {
            type: Object
        },
        dateList: {
            type: Object
        },
        width: {
            type: Number,
            default: 400
        }
    },
    computed: {
        getTitle() {
            return this.sportdata?.name;
        },
        getTrainerName() {
            return `${this.trainer?.first_name} ${this.trainer?.last_name}`
        }
    },
    methods: {
        editSport() {
            router.push("/course/edit")
        }
    }
});
</script>