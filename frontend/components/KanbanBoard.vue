<template>
  <div class="kanban-board">
    <div v-for="column in columns" :key="column.id">
      <Column :column="column" @task-dropped="handleTaskDrop" :on-fetch="onFetch" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Column from "../components/Column.vue";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();

const props = defineProps({
  ticket: {
    type: Array,
    required: true,
  },
  onFetch: {
    type: Function,
  },
});
const columns = ref([
  {
    id: 1,
    name: "Pending",
    color: "#424242",
    tasks: [],
  },
  {
    id: 2,
    name: "Accepted",
    color: "#29B6F6",
    tasks: [],
  },
  {
    id: 3,
    name: "Resolved",
    color: "#43A047",
    tasks: [],
  },
  {
    id: 4,
    name: "Rejected",
    color: "#EF5350",
    tasks: [],
  },
]);

const ticketStatus = () => {
  const pending = props.ticket.find((item) => item._id === 1);
  columns.value[0].tasks = pending?.tasks || [];
  const accepted = props.ticket.find((item) => item._id === 2);
  columns.value[1].tasks = accepted?.tasks || [];
  const resloved = props.ticket.find((item) => item._id === 3);
  columns.value[2].tasks = resloved?.tasks || [];
  const rejected = props.ticket.find((item) => item._id === 4);
  columns.value[3].tasks = rejected?.tasks || [];
};

ticketStatus();

watch(
  () => props.ticket,
  (newVal, oldValue) => {
    ticketStatus();
  }
);

const handleTaskDrop = async ({ dropResult, columnId }) => {
  const { removedIndex, addedIndex, payload } = dropResult;
  if (removedIndex === null && addedIndex === null) return;

  if (removedIndex !== null && addedIndex === null) {
    const targetColumn = columns.value.find((col) => col.id === columnId);
    targetColumn.tasks.splice(removedIndex, 1);
    columns.value = [...columns.value];
    return;
  }

  if (addedIndex !== null && removedIndex === null) {
    // const targetColumn = columns.value.find((col) => col.id === columnId);
    // targetColumn.tasks.push(payload);
    // columns.value = [...columns.value];
    try {
      await $fetch(`${config.public.apiBaseUrl}/ticket/update/status`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: { id: payload.id, status: columnId },
      });
    } catch (error) {
      console.log("error :>> ", error);
    } finally {
      await props.onFetch();
    }
  }
};
</script>

<style scoped>
.kanban-board {
  display: flex;
  justify-content: space-between;
  height: 48em;
  max-width: 1200px;
  overflow-x: auto;
}
.drag-class {
  background-color: rgba(255, 255, 255, 0.8);
  position: sticky;
}
.drop-class {
  background-color: rgba(0, 128, 0, 0.1);
}
</style>
