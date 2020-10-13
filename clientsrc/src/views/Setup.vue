<template>
  <div class="create">
    <div class="row">
      <div class="col justify-content-center">
        <h2 class="newfontnosize" style="color: teal">
          Set up your study session
        </h2>
      </div>
      <h5 class="mx-5">
        <h3>Directions:</h3>
        <ul style="text-align: left">
          <li>
            Add locus and study items to a session list by taking any slice of
            your locus list(left) and any slice of a study list(right) and
            joining those items within a session list. Each locus item will be
            paired with the study item of the same number.
          </li>
          <li>
            Create slices by choosing a starting point and then an ending point
            for your slice and then click "add".
          </li>
          <li>
            You may add as many slices as you want in any order, or add an
            entire list.
          </li>
          <li>
            Study session works best if your locus list and your study list are
            equal in length.
          </li>
          <li>
            In the middle, you can save this session list and use it for a study
            session.
          </li>
          <li>
            When you are ready, choose the list you just created or a different
            session list, set your preferences (or use defaults) and go to a
            study session.
          </li>
        </ul>
      </h5>
    </div>
    <!--set up locus items for a study session list-->
    <div class="row justify-content-center">
      <div class="card col-12 col-md-4 m-2 p-2 boxborder rounded">
        <h5><b>Add locus items to a study session list:</b></h5>
        <div class="row justify-content-center">
          <div class="card col-10 m-2">
            <div class="card-body row justify-content-center boxborder rounded">
              <div class="card col-11 m-2 p-2 rounded">
                <form>
                  <div>
                    <label for="locusstart"
                      >Select the first item (or single item) in the "slice" of
                      loci:</label
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
              </div>
              <div class="card col-11 m-2 p-2 rounded">
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
              </div>
              <button
                @click="createLocusslice()"
                type="button"
                class="col-11 btn btn-xs border rounded btn-primary m-1"
              >
                add slice
              </button>
            </div>
          </div>
        </div>
        <div>
          <form>
            <div class="row justify-content-center">
              <div class="card col-8 m-2 boxborder rounded">
                <p class="mt-2">Locus items in current session list:</p>
                <div
                  class="card mb-2 rounded"
                  style="overflow-y: scroll; height: 10rem"
                >
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
                <p class="mt-2 mb-0">
                  Number of locus items in current study session list:
                </p>
                <div>
                  {{ locuslength }}
                </div>
                <button
                  @click="clearLocuslist()"
                  type="button"
                  class="col-12 btn btn-xs border rounded btn-primary mb-2"
                >
                  clear
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!--save list just created-->
      <div class="col-12 col-md-3 mt-5">
        <div class="card col-10 m-2 ml-3 align-items-center boxborder rounded">
          <div class="row">
            <h5 class="m-2 p-2">
              <b>Store session list just created:</b>
            </h5>
          </div>
          <div class="row justify-content-center">
            <form>
              <div>
                <label for="studylist">New Session List Title:</label><br />
                <input
                  type="text"
                  id="studylist"
                  name="studylist"
                  v-model="newSessionlist.title"
                  class="col-10 mb-3 mx-3"
                /><br />
              </div>
            </form>
            <div>
              <button
                @click="saveNewsessionlist()"
                type="button"
                class="btn btn-sm border rounded btn-primary m-1"
              >
                Save
              </button>
            </div>
          </div>
          <div class="row">
            <h5 class="m-2 p-2">
              <b>Delete any session list:</b>
            </h5>
          </div>
          <div>
            <form>
              <div>
                <label for="selectsessionlist"
                  >Select a session list to delete:</label
                >
                <select v-model="deleteSession" id="sessionlist">
                  <option
                    v-for="sessionlist in sessionlists"
                    :sessionlist="sessionlist"
                    :key="sessionlist.id"
                    :value="sessionlist.id"
                  >
                    {{ sessionlist.title }}
                  </option>
                </select>
              </div>
            </form>
            <div class="row justify-content-center">
              <button
                @click="deleteSessionlist()"
                type="button"
                class="btn btn-sm border rounded btn-primary m-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <!--choose a list for study session-->
        <div class="card col-10 m-2 ml-3 align-items-center boxborder rounded">
          <div class="row p-3">
            <h5><b>Prepare current study session:</b></h5>
            <form>
              <div>
                <label for="selectsessionlist"
                  >Select a session list for study session:</label
                >
                <select v-model="selectSessionlist" id="sessionlist">
                  <option
                    v-for="sessionlist in sessionlists"
                    :sessionlist="sessionlist"
                    :key="sessionlist.id"
                    :value="sessionlist"
                  >
                    {{ sessionlist.title }}
                  </option>
                </select>
              </div>
            </form>
          </div>
          <div class="row justify-content-center mb-3">
            <p class="m-2">
              Selected session list: {{ selectSessionlist.title }}
            </p>
          </div>
          <!--go to study session-->
          <div class="row justify-content-center mt-3">
            <div class="col-10">
              <div class="row justify-content-center">
                <p>Begin study session:</p>
              </div>
              <div class="row justify-content-center">
                <button
                  @click="goStudy()"
                  type="button"
                  class="btn btn-primary rounded btn-sm mx-4 mb-2"
                  data-dismiss="modal"
                >
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--set up study items for study sesison list-->
      <div class="card col-12 col-md-4 m-2 p-2 boxborder rounded">
        <h5><b>Add study items to a study session list:</b></h5>
        <div class="row justify-content-center">
          <div class="card col-10 m-2 boxborder rounded">
            <div class="card-body row justify-content-center p-0 pt-2">
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
            <div class="card-body row justify-content-center pb-0">
              <div class="card col-11 m-2 p-2">
                <form>
                  <label for="studystart"
                    >Select the first item (or single item) in the "slice" of
                    study items:</label
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
                </form>
              </div>
              <div class="card col-11 m-2 p-2">
                <form>
                  <label for="studyend"
                    >Select the last item in the "slice" of study items:</label
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
              </div>
            </div>
            <div class="row justify-content-center">
              <button
                @click="createStudyslice()"
                type="button"
                class="col-9 btn btn-xs border rounded btn-primary m-1 mb-3"
              >
                add slice
              </button>
            </div>
          </div>
          <div>
            <form>
              <div class="row justify-content-center">
                <div class="card col-8 m-2 boxborder rounded">
                  <p class="mt-2">Study items in current session list:</p>
                  <div
                    class="card-mb-2 rounded"
                    style="overflow-y: scroll; height: 10rem"
                  >
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
                  <p class="mt-2">
                    Number of study items in current study session list:
                  </p>
                  <div>
                    {{ studylength }}
                  </div>
                  <button
                    @click="clearStudylist()"
                    type="button"
                    class="col-12 btn btn-xs border rounded btn-primary mb-2"
                  >
                    clear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
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
    this.$store.dispatch("getSessionlists");
    this.$store.dispatch("clearSeshlocuslist");
    this.$store.dispatch("clearStudylist");
  },
  data() {
    return {
      reviewMode: false,
      imageChoice: "show",
      hideStudyChoice: false,
      selectLocusstart: 0,
      selectLocusend: 0,
      selectStudystart: 0,
      selectStudyend: 0,
      selectSessionlist: {},
      deleteSession: 0,
      newStudylist: {
        title: "",
      },
      newLocus: {
        description: "",
        image: "",
      },
      newSessionlist: {
        title: "",
        pairs: [],
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
    locuslength() {
      let length = this.sessionlocus.length;
      return length;
    },
    sessionstudy() {
      return this.$store.state.sessionstudylist;
    },
    studylength() {
      let length = this.sessionstudy.length;
      return length;
    },
    sessionlists() {
      return this.$store.state.sessionlists;
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
      if (!start && start != 0 && end) {
        start = end - 1;
      } else if (!end && end != 0 && start) {
        end = start + 1;
      }
      let slice = this.loci.slice(start, end);
      this.$store.dispatch("setSeshlocuslist", slice);
      this.selectLocusstart = 0;
      this.selectLocusend = 0;
    },
    createStudyslice() {
      let start = this.currentStudyitems.findIndex(
        (s) => s._id == this.selectStudystart
      );
      let end =
        this.currentStudyitems.findIndex((s) => s._id == this.selectStudyend) +
        1;
      if (!start && start != 0 && end) {
        start = end - 1;
      } else if (!end && end != 0 && start) {
        end = start + 1;
      }
      let slice = this.currentStudyitems.slice(start, end);
      this.$store.dispatch("setSeshstudylist", slice);
      this.selectStudystart = 0;
      this.selectStudyend = 0;
    },
    //joins current locus list and study list to create a session list
    saveNewsessionlist() {
      let pairs = [];
      let obj = {};
      for (let i = 0; i < this.sessionlocus.length; i++) {
        obj.locus = this.sessionlocus[i];
        obj.study = this.sessionstudy[i];
        console.log(obj);
        console.log(obj.study);
        pairs.push(obj);
        console.log(pairs);
        obj = {};
      }
      this.newSessionlist.pairs = pairs;
      console.log(pairs);
      console.log(this.newSessionlist.pairs);
      this.$store.dispatch("createSessionlist", this.newSessionlist);
    },
    //sets selected session list to active session list for upcoming study session
    activeSessionlist() {
      this.$store.dispatch("getActivesessionlist", this.selectSessionlist.id);
    },
    //clears selected locus items from field but does not delete
    clearLocuslist() {
      this.$store.dispatch("clearSeshlocuslist");
    },
    //clears selected study items from field but does not delete
    clearStudylist() {
      this.$store.dispatch("clearStudylist");
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
    //sends preferences and begins study session
    goStudy() {
      this.activeSessionlist();
      this.$router.push({ name: "study", path: "/study" });
    },
    //permanently deletes any session list
    deleteSessionlist() {
      let id = this.deleteSession;
      this.$store.dispatch("deleteSession", id);
    },
  },
};
</script>