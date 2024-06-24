<template>
  <!-- add ticket dialog -->
  <div class="d-flex justify-end">
    <!-- <v-btn color="success" flat>Add Ticket</v-btn> -->

    <div class="pa-4 text-center">
      <v-btn
        class="pe-2"
        prepend-icon="mdi-plus"
        variant="tonal"
        color="primary"
        @click="dialog = true"
      >
        <div class="text-none font-weight-regular">Add ticket</div>
      </v-btn>

      <v-dialog v-model="dialog" max-width="500" persistent>
        <v-card rounded="lg">
          <v-card-title class="d-flex justify-space-between align-center">
            <div class="text-h5 text-medium-emphasis ps-2">
              <v-icon class="mr-2">mdi-ticket-outline</v-icon>
              Add new ticket
            </div>

            <v-btn icon="mdi-close" variant="text" @click="dialog = false"></v-btn>
          </v-card-title>

          <v-divider class="mb-2"></v-divider>

          <v-card-text>
            <div class="mb-2 font-weight-bold">Title</div>

            <v-text-field
              v-model="ticketData.title"
              variant="outlined"
              density="compact"
            ></v-text-field>

            <div class="mb-2 font-weight-bold">Contact information</div>

            <v-text-field
              v-model="ticketData.contactInfo"
              variant="outlined"
              density="compact"
            ></v-text-field>

            <div class="mb-2 font-weight-bold">Description</div>

            <v-textarea
              v-model="ticketData.description"
              :counter="300"
              class="mb-2"
              rows="3"
              variant="outlined"
              persistent-counter
            ></v-textarea>
          </v-card-text>

          <v-divider class="mt-2"></v-divider>

          <v-card-actions class="my-2 d-flex justify-end">
            <v-btn
              class="text-none"
              rounded="xl"
              text="Cancel"
              @click="dialog = false"
            ></v-btn>

            <v-btn
              class="text-none"
              color="primary"
              rounded="xl"
              text="Save"
              variant="flat"
              @click="addTicket()"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>

  <!-- board -->
  <div class="d-flex justify-center">
    <KanbanBoard :ticket="ticket" :on-fetch="fetchData" />
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "#app";
let dialog = ref<boolean>(false);

const config = useRuntimeConfig();
const ticket = ref([]);

const fetchData = async () => {
  try {
    const data = await $fetch(`${config.public.apiBaseUrl}/ticket/all`);
    // if (error.value) {
    //   console.error(error.value);
    // } else {
    //   ticket.value = (data as []) || [];
    //   console.log(" ticket.value :>> ", ticket.value);
    // }
    ticket.value = (data as []) || [];
  } catch (error) {
    console.error(error);
  }
};

await fetchData();

const ticketData = ref<{ title: string; description: string; contactInfo: string }>({
  title: "",
  description: "",
  contactInfo: "",
});
const defaultTicket = { title: "", description: "", contactInfo: "" };

watch(
  () => dialog.value,
  (newValue, oldValue) => {
    if (!newValue) {
      ticketData.value = defaultTicket;
    }
    // Perform additional logic here
  }
);

const addTicket = async () => {
  const payload = ticketData.value;
  try {
    await $fetch(`${config.public.apiBaseUrl}/ticket/add`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: payload,
    });
    await fetchData();
  } catch (error) {
    console.log("error :>> ", error);
  }
  dialog.value = false;
};
</script>

<style></style>
