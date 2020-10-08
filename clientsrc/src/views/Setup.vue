<template>
  <div class="create">
    <div>
      <h3>
        Add locus and study items to a session list by taking any slice of your
        locus/study list and adding to the session list. Create slices by
        choosing a starting point and then an ending point for your slice and
        then click "add". You may add as many slices as you want in any order,
        or add the whole list. Make sure your locus list and your study list are
        equal in length.
      </h3>

      <div class="card col-4">
        <h3 class="mt-2">Locus items in current session list:</h3>
        <form>
          <div class="card-body" style="overflow-y: scroll; height: 10rem">
            <label for="locusstart"
              >Select the first item in the "slice" of loci:</label
            >
            <select v-model="selectLocusstart" id="locusstart">
              <option
                v-for="locus in loci"
                :locus="locus"
                :key="locus.id"
                :value="locus.id"
              >
                {{ locus.description }}
              </option>
            </select>
          </div>
        </form>
        <form>
          <label for="locusend"
            >Select the last item in the "slice" of loci:</label
          >
          <select v-model="selectLocusend" id="locusend">
            <option
              v-for="locus in loci"
              :locus="locus"
              :key="locus.id"
              :value="locus.id"
            >
              {{ locus.description }}
            </option>
          </select>
        </form>
        <button
          @click="createLocusslice()"
          type="button"
          class="row btn btn-xs border rounded btn-primary m-1"
        >
          add slice
        </button>
      </div>
      <div>
        <form>
          <div class="card col-4">
            <h3 class="mt-2">Locus items in current session list:</h3>
            <div class="card-body" style="overflow-y: scroll; height: 10rem">
              <ol>
                <li
                  v-for="locus in sessionlocus"
                  :locus="locus"
                  :key="locus.id"
                >
                  {{ locus.description }}
                </li>
              </ol>
            </div>
          </div>
        </form>
      </div>

      <div class="card col-4">
        <h3 class="mt-2">Study items in current session list:</h3>
        <div>
          <form>
            <label for="activestudy"
              >Select a study list to choose items from:</label
            >
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
          </form>
        </div>
        <form>
          <div class="card-body" style="overflow-y: scroll; height: 10rem">
            <label for="studystart"
              >Select the first item in the "slice" of study items:</label
            >
            <select v-model="selectStudystart" id="locusstart">
              <option
                v-for="study in currentStudyitems"
                :study="study"
                :key="study.id"
                :value="study.id"
              >
                {{ study.title }}
              </option>
            </select>
          </div>
        </form>
        <form>
          <label for="studyend"
            >Select the last item in the "slice" of loci:</label
          >
          <select v-model="selectStudyend" id="studyend">
            <option
              v-for="study in currentStudyitems"
              :study="study"
              :key="study.id"
              :value="study.id"
            >
              {{ study.title }}
            </option>
          </select>
        </form>
        <button
          @click="createStudyslice()"
          type="button"
          class="row btn btn-xs border rounded btn-primary m-1"
        >
          add slice
        </button>
      </div>
      <div>
        <form>
          <div class="card col-4">
            <h3 class="mt-2">Study items in current session list:</h3>
            <div class="card-body" style="overflow-y: scroll; height: 10rem">
              <ol>
                <li
                  v-for="study in sessionstudy"
                  :study="study"
                  :key="study.id"
                >
                  {{ study.title }}
                </li>
              </ol>
            </div>
          </div>
        </form>
      </div>
      <!--<form @submit.prevent="addLocus()">
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
        <h3 class="mt-2">Edit items in your locus list:</h3>
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
                        submit
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
        <div class="row justify-content-center">
          <button
            @click="clearLocuslist()"
            type="button"
            class="row btn btn-xs border rounded btn-primary m-1 p-2"
          >
            delete all items from list
          </button>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mt-5">Create a new study list</h3>
      <div>
        <form @submit.prevent="createStudylist()">
          <div class="row justify-content-center">
            <label for="studylist" class="mx-2">Study List Title:</label><br />
            <input
              type="text"
              id="studylist"
              name="studylist"
              v-model="newStudylist.title"
              class="mb-3 mx-2"
            /><br />
            <input
              type="submit"
              value="Create new list"
              class="mx-2"
              style="max-height: 2rem"
            />
          </div>
        </form>
        <h3 class="mt-3">Choose a study list to add items to or to edit</h3>
        <div>
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
          </form>
        </div>
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
      </div>
      <div class="container mt-4">
        <p>Edit items in your study list:</p>
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
                    <h4 class="d-flex align-items-center">text:</h4>
                    <textarea
                      type="text"
                      class="form-control col-8 m-1"
                      name="studyitemtitle"
                      id="studyitemtitle"
                      v-model.lazy="item.title"
                      required
                    />
                  </div>
                  <div class="row justify-content-center">
                    <h4 class="d-flex align-items-center">image 1:</h4>
                    <textarea
                      type="text"
                      class="form-control col-8 m-1"
                      name="studyitemimage"
                      id="studyitemimage"
                      v-model.lazy="item.imgURL1"
                      required
                    />
                  </div>
                  <div class="row justify-content-center mb-1">
                    <h4 class="d-flex align-items-center">image 2:</h4>
                    <textarea
                      type="text"
                      class="form-control col-8 m-1"
                      name="studyitemimage"
                      id="studyitemimage"
                      v-model.lazy="item.imgURL2"
                      required
                    />
                  </div>
                  <div class="row justify-content-center mb-1">
                    <h4 class="d-flex align-items-center">image 3:</h4>
                    <textarea
                      type="text"
                      class="form-control col-8 m-1"
                      name="studyitemimage"
                      id="studyitemimage"
                      v-model.lazy="item.imgURL3"
                      required
                    />
                  </div>
                  <div class="row justify-content-center">
                    <button
                      @click="editStudy(item)"
                      type="button"
                      class="row btn btn-xs border rounded btn-primary m-1 p-2"
                    >
                      submit edit
                    </button>
                    <button
                      @click="deleteStudy(item)"
                      type="button"
                      class="row btn btn-xs border rounded btn-primary m-1 p-2"
                    >
                      delete item from list
                    </button>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </form>
      </div>
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
    </form>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "setup",
  mounted() {
    this.$store.dispatch("getStudylists");
    this.$store.dispatch("getStudyitems");
    this.$store.dispatch("getLoci");
  },
  data() {
    return {
      selectLocusstart: 0,
      selectLocusend: 0,
      selectStudystart: 0,
      selectStudyend: 0,
      newStudylist: {
        title: "",
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
    sessionlocus() {
      return this.$store.state.sessionlocuslist;
    },
    sessionstudy() {
      return this.$store.state.sessionstudylist;
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
    //slices section of master locus list and sends to store to be added to a study session list
    createLocusslice() {
      let start = this.loci.findIndex((l) => l._id == this.selectLocusstart);
      let end = this.loci.findIndex((l) => l._id == this.selectLocusend) + 1;
      let slice = this.loci.slice(start, end);
      this.$store.dispatch("setSeshlocuslist", slice);
    },
    createStudyslice() {
      let start = this.currentStudyitems.findIndex(
        (s) => s._id == this.selectStudystart
      );
      let end =
        this.currentStudyitems.findIndex((s) => s._id == this.selectStudyend) +
        1;
      let slice = this.currentStudyitems.slice(start, end);
      this.$store.dispatch("setSeshstudylist", slice);
    },
    //takes each new locus item and adds it to array of items in user's single locus list
    addLocus() {
      this.$store.dispatch("addLocus", {
        description: this.newLocus.description,
        image: this.newLocus.image,
      });
      this.newLocus.description = "";
      this.newLocus.image = "";
    },
    //deletes all items from current locus list
    clearLocuslist() {
      this.$store.dispatch("clearLocuslist");
    },
    //submits altered study item and replaces old version with this version
    editStudy(study) {
      this.$store.dispatch("editStudy", study);
    },
    //adds description and any images to create a new study item object with id of selected study lsit
    async addStudyitem() {
      await this.$store.dispatch("addStudyitem", {
        title: document.getElementById("studyitem").value,
        imgURL1: document.getElementById("studyimage1").value,
        imgURL2: document.getElementById("studyimage2").value,
        imgURL3: document.getElementById("studyimage3").value,
        studyListId: this.selectStudyList,
      });
      document.getElementById("studyitem").value = "";
      document.getElementById("studyimage1").value = "";
      document.getElementById("studyimage2").value = "";
      document.getElementById("studyimage3").value = "";
    },
    //deletes single item from current studylist
    deleteStudy(study) {
      this.$store.dispatch("deleteStudy", {
        id: study.id,
        studyListId: this.selectStudyList,
      });
    },
    //creates a study list with items
    async createStudylist() {
      await this.$store.dispatch("addStudylist", this.newStudylist);
      this.newStudylist.title = "";
    },
    //delete any study list
    deleteStudylist() {
      let id = this.deleteStudyList;
      this.$store.dispatch("deleteStudylist", id);
    },
  },
};
</script>