<template>
  <div>
    <v-card class="column" flat position="static" width="18em">
      <v-card-title
        class="d-flex justify-space-between align-center"
        :style="`background-color: ${column.color}`"
      >
        <div class="text-h5 pa-2 text-white">
          ({{ column.tasks.length }}) {{ column.name }}
        </div>
      </v-card-title>
      <v-divider class=""></v-divider>
      <v-card-text>
        <Container
          class="task-container"
          :group-name="'tasks'"
          @drop="handleDrop"
          drag-class="drag-class"
          drop-class="drop-class"
          :get-child-payload="(index) => column.tasks[index]"
        >
          <Draggable v-for="task in column.tasks" :key="task.id">
            <Task :task="task" :column-color="column.color" :on-fetch="onFetch" />
          </Draggable>
        </Container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import Task from "./Task.vue";

const props = defineProps({
  column: {
    type: Object,
    required: true,
  },
  onFetch: {
    type: Function,
  },
});

const emit = defineEmits(["task-dropped"]);

const handleDrop = (dropResult) => {
  emit("task-dropped", { dropResult, columnId: props.column.id });
};
</script>

<style scoped>
.column {
  flex: 1;
  border-radius: 30px 30px 4px 4px;
  position: relative;
  z-index: auto;
  margin: 0 10px;
  background-color: #f5f5f5;
}
.column-header {
  padding: 10px;
}
.drag-class {
  background-color: rgba(255, 255, 255, 0.8);
}
.drop-class {
  background-color: rgba(0, 128, 0, 0.1);
}

.task-container {
  min-height: 42em;
  max-height: 42em;
  overflow-y: auto;
  padding: 10px;
  /* background-color: #f8f9fa; */
  border-radius: 1em;
}
</style>
