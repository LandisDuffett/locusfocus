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
      <h3>Edit items in your locus list</h3>
      <form>
        <div class="card">
          <div class="card-body" style="overflow-y: scroll; height: 10rem">
            <div v-for="locus in loci" :locus="locus" :key="locus.id">
              <div class="row justify-content-center mb-2">
                <textarea
                  type="text"
                  class="form-control col-5 m-1"
                  name="locusdescription"
                  id="locusdescription"
                  v-model.lazy="locus.description"
                  required
                />
                <textarea
                  type="text"
                  class="form-control col-5 m-1"
                  name="locusimage"
                  id="locusimage"
                  v-model.lazy="locus.image"
                  required
                />
                <div
                  class="col-1 align-content-center"
                  style="display: inline-grid"
                >
                  <button
                    @click="editLocus(locus)"
                    type="button"
                    class="row btn btn-xs border rounded btn-primary m-1"
                  >
                    edit
                  </button>
                  <button
                    @click="deleteLocus(locus)"
                    type="button"
                    class="row btn btn-xs border rounded btn-primary m-1"
                  >
                    delete
                  </button>
                </div>
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
    this.$store.dispatch("getLoci");
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
      deleteStudyList: 0,
    };
  },
  computed: {
    loci() {
      return this.$store.state.loci;
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
    editLocus(locus) {
      this.$store.dispatch("editLocus", locus);
    },
    //deletes single item from current locuslist
    deleteLocus(locus) {
      let id = locus.id;
      this.$store.dispatch("deleteLocus", id);
    },
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