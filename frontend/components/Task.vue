<template>
  <!-- <div class="task">
    <p class="d-flex align-center mr-6"><v-icon>mdi-note</v-icon> {{ task.title }}</p>
    <p>Contact Information: {{ task.contactInfo }}</p>
    <p>Description: {{ task.description }}</p>
  </div> -->
  <div>
    <v-alert border="start" :border-color="columnColor" class="mb-2" color="white">
      <h3>{{ task.title }}</h3>
      <v-tooltip text="Click to edit">
        <template v-slot:activator="{ props }">
          <!-- <v-btn v-bind="props">Tooltip</v-btn> -->
          <div>
            <v-icon
              v-bind="props"
              small
              color="grey-darken-2"
              class="mr-1"
              @click="openBottomSheet({ id: task.id, contactInfo: task.contactInfo })"
              >mdi-account-box</v-icon
            >
            <span v-bind="props">{{ task.contactInfo }}</span>
          </div>
        </template>
      </v-tooltip>

      <p>Description: {{ task.description }}</p>
      <div>
        <span class="text-medium-emphasis">Latest update:</span
        ><span>{{ dateThai(task.updatedAt) }}</span>
      </div>
    </v-alert>
    <v-bottom-sheet v-model="sheet">
      <v-card class="text-center" height="200">
        <v-card-text>
          <v-btn class="text-none mr-2" text="Cancel" @click="sheet = false"></v-btn>

          <v-btn
            class="text-none"
            color="primary"
            text="Save"
            variant="flat"
            @click="EditContact()"
          ></v-btn>

          <br />
          <br />

          <div>
            <v-text-field
              v-model="taskData.contactInfo"
              variant="outlined"
              density="compact"
            ></v-text-field>
          </div>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "#app";
const config = useRuntimeConfig();
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  columnColor: {
    type: String,
  },
  onFetch: {
    type: Function,
  },
});

const sheet = ref(false);
const taskData = ref<{ id: string; contactInfo: string }>({
  id: "",
  contactInfo: "",
});
const defaultTask = { id: "", contactInfo: "" };

watch(
  () => sheet.value,
  (newValue, oldValue) => {
    if (!newValue) {
      taskData.value = defaultTask;
    }
    // Perform additional logic here
  }
);

const openBottomSheet = ({ id, contactInfo }) => {
  sheet.value = true;
  taskData.value.contactInfo = contactInfo;
  taskData.value.id = id;
};

const dateThai = (date) => {
  return new Date(date).toLocaleString("th", { dateStyle: "short", timeStyle: "short" });
};

const EditContact = async () => {
  const payload = taskData.value;
  try {
    await $fetch(`${config.public.apiBaseUrl}/ticket/update/contact`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: payload,
    });
  } catch (error) {
    console.log("error :>> ", error);
  } finally {
    sheet.value = false;
    await props.onFetch();
  }
};
</script>

<style scoped></style>
