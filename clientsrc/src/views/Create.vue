<template>
  <div class="create">
    <h3>Add items to your locus list</h3>
    <form @submit.prevent="addLocus()">
      <input
        type="text"
        placeholder="describe location"
        v-model="newLocus.description"
        required
      />
      <input
        type="text"
        placeholder="optional image"
        v-model="newLocus.image"
      />
      <button type="submit">Add</button>
    </form>
    <div class="container">
      <form @submit.prevent="editLocuslist()">
        <div class="card">
          <div class="card-body" style="overflow-y: scroll; height: 10rem">
            <div
              v-for="locusitem in locusitems"
              :locusitem="locusitem"
              :key="locusitem.id"
            >
              <div v-for="obj in locusitem.items" :key="obj.id">
                <textarea
                  type="text"
                  class="form-control row"
                  name="locusdescription"
                  id="locusdescription"
                  v-model.lazy="obj.description"
                  required
                />
                <textarea
                  type="text"
                  class="form-control row"
                  name="locusimage"
                  id="locusimage"
                  v-model.lazy="obj.image"
                  required
                />
                <button
                  @click="deleteLocus()"
                  class="btn btn-sm border rounded btn-primary"
                >
                  Delete locus
                </button>
              </div>
            </div>
          </div>
        </div>
        <input type="submit" value="Submit edited list" />
      </form>
    </div>
    <h3>Studylists</h3>
    <div v-for="studylist in studylists" :key="studylist.id">
      {{ studylist.title }}
    </div>
    <h3>Studyitems</h3>
    <div v-for="studyitem in studyitems" :key="studyitem.id">
      {{ studyitem.title }}
    </div>
    <form @submit.prevent="deleteStudylist()">
      <label for="activestudy">Select a list to delete:</label>
      <select v-model="deleteStudyList" id="activestudy">
        <option
          v-for="studylist in studylists"
          :studylist="studylist"
          :key="studylist.id"
          :value="studylist.id"
        >
          {{ studylist.title }}
        </option>
      </select>
      <br /><br />
      <input type="submit" value="Delete selected list" />
    </form>
  </div>
</template>

<script>
export default {
  name: "create",
  mounted() {
    this.$store.dispatch("getStudylists");
    this.$store.dispatch("getStudyitems");
    this.$store.dispatch("getLocuslist");
  },
  data() {
    return {
      newStudylist: {
        title: "",
        description: "",
      },
      newLocus: {
        description: "",
        image: "",
      },
      updatedLocuslist: {},
      deleteStudyList: 0,
    };
  },
  computed: {
    locusitems() {
      return this.$store.state.locuslist;
    },
    studylists() {
      return this.$store.state.studylists;
    },
    studyitems() {
      return this.$store.state.studyitems;
    },
  },
  methods: {
    //takes each new locus item and adds it to array of items in user's single locus list
    addLocus() {
      this.$store.dispatch("addLocus", {
        description: this.newLocus.description,
        image: this.newLocus.image,
      });
    },
    //submits altered list and replaces old version of list with this version
    editLocuslist() {
      this.updatedLocuslist.items = this.$store.dispatch("edit");
    },
    //deletes single item from current locuslist
    deleteLocus() {},
    //creates a study list with items
    addStudylist() {
      this.$store.dispatch("addStudylist", this.newBoard);
      this.newStudylist = { title: "", description: "" };
    },
    //delete any study list
    deleteStudylist() {
      let id = this.deleteStudyList;
      this.$store.dispatch("deleteStudylist", id);
    },
  },
};
</script>