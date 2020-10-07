<template>
  <div class="create">
    <div>
      <h3>Add item to your locus list</h3>
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
              <ol>
                <li v-for="locus in loci" :locus="locus" :key="locus.id">
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
                </li>
              </ol>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div>
      <h3 class="mt-5">Create a new study list</h3>
      <div>
        <form>
          <label for="studylist">Study List Title:</label><br />
          <input
            type="text"
            id="studylist"
            name="studylist"
            v-model="newStudylist.title"
            class="mb-3"
          /><br />
        </form>
        <form
          @submit.prevent="addStudyitem()"
          class="row justify-content-center"
        >
          <label for="studyitem" class="col-10">Enter study item:</label><br />
          <input
            type="text"
            id="studyitem"
            name="item"
            placeholder="Enter study item"
            class="col-10 mb-2"
          />
          <input
            type="text"
            id="studyimage1"
            name="studimg"
            placeholder="add image URL (optional)"
            class="col-10 mb-2"
          />
          <input
            type="text"
            id="studyimage2"
            name="studimg"
            placeholder="add image URL (optional)"
            class="col-10 mb-2"
          />
          <input
            type="text"
            id="studyimage3"
            name="studimg"
            placeholder="add image URL (optional)"
            class="col-10 mb-2"
          />
          <input type="submit" value="Add item" class="col-3 mb-2" />
        </form>
        <button
          @click="addStudylist()"
          class="btn btn-sm border rounded btn-primary col-3"
        >
          Submit list
        </button>
      </div>
      <h3 class="mt-5">Edit an existing study list</h3>
      <div>
        <!--<form @submit.prevent="displaystudy()">-->
        <form>
          <label for="activestudy">Select a list to edit:</label>
          <select v-model="selectStudyList" id="activestudy">
            <option
              v-for="studylist in studylists"
              :studylist="studylist"
              :key="studylist.id"
              :value="studylist.id"
            >
              {{ studylist.title }}
            </option>
          </select>
          <!--<br /><br />
          <input type="submit" value="Edit selected list" />-->
        </form>
      </div>
      <div class="container">
        <h3>Edit items in your study list</h3>
        <form>
          <div class="card">
            <div class="card-body" style="overflow-y: scroll; height: 10rem">
              <ol>
                <li
                  v-for="item in currentStudyitems"
                  :item="item"
                  :key="item.id"
                >
                  <div class="row justify-content-center mb-2">
                    <textarea
                      type="text"
                      class="form-control col-5 m-1"
                      name="studyitemtitle"
                      id="studyitemtitle"
                      v-model.lazy="item.title"
                      required
                    />
                    <textarea
                      type="text"
                      class="form-control col-5 m-1"
                      name="studyitemimage"
                      id="studyitemimage"
                      v-model.lazy="item.imgURL"
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
                </li>
              </ol>
            </div>
          </div>
          <input type="submit" value="Submit edited list" />
        </form>
      </div>
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
      selectStudyList: "",
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
    currentStudyitems() {
      this.$store.dispatch("getCurrentstudy", this.selectStudyList);
      return this.$store.state.currentstudyitems;
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