<template>
  <div>
    <div class="md-layout" style="margin: 0.5rem; color: #fff !important">
      <div class="md-layout-item md-size-90">
        <md-field>
          <label>Things To Do</label>
          <md-input v-modal="doItem" @keyup.enter="addTodo"></md-input>
        </md-field>
      </div>
      <button class="md-layout-item md-size-10" @click="addTodo">
        <i class="fas fa-plus-circle addBtn"></i>
      </button>
    </div>

    <MyModal v-if="showModal" @close="showModal = false">
      <h3 slot="header">custom header
        <i class="fas fa-times closeModalBtn" @click="showModal = false"></i>
      </h3>
      <div slot="body">할일을 입력하세요.</div>
    </MyModal>
  </div>
</template>

<script>
import MyModal from './piece/Modal.vue'
export default {
  components: { MyModal },
  data: () => {
    return {
      doItem : "",
      showModal: false,
    }
  },
  methods: {
    addTodo() {
      if(this.doItem) {
        this.$$emit("addOne", this.doItem);
        this.clearInput();
      } else {
        this.showModal = !this.showModal;
      }
    },
    clearInput() {
      this.doItem = "";
    },
  },
};
</script>

<style scoped>
.md-field, .md-focused,
.md-input, .md-textarea, lable {
  background: #365fd9 !important;
  border-style: none;
  border-radius: 5px;
  margin: 0 0 5px 0 !important;
  color: #fff !important;
  -webkit-text-fill-color: #ddd !important;
}
.addBtn {
  vertical-align: middle;
  margin-top: 12px;
  font-size: 24px;
  cursor: pointer;
}

.closeModalBtn{
  color: #003366;
}
</style>