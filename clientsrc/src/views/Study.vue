<template>
  <div class="study">
    <div>
      <div class="card-body row justify-content-center">
        <div class="col-3 card mx-2">
          <div>{{ sessionlist[sessionindex].locus.description }}</div>
          <br />
          <div>
            <img
              :src="sessionlist[sessionindex].locus.image"
              alt
              style="max-width: 8rem"
            />
          </div>
        </div>
        <div class="col-2 card mx-2"></div>
        <div class="col-6 card mx-2">
          <div>{{ sessionlist[sessionindex].study.title }}</div>
          <div class="row">
            <span
              ><img
                :src="sessionlist[sessionindex].study.imgURL1"
                alt
                style="max-width: 8rem"
            /></span>
            <span
              ><img
                :src="sessionlist[sessionindex].study.imgURL2"
                alt
                style="max-width: 8rem"
            /></span>
            <span
              ><img
                :src="sessionlist[sessionindex].study.imgURL3"
                alt
                style="max-width: 8rem"
            /></span>
          </div>
        </div>
      </div>
      <div class="row">
        <button
          @click="next()"
          type="button"
          class="col-12 btn btn-xs border rounded btn-primary mb-2"
        >
          clear
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "study",
  mounted() {
    this.$store.dispatch("reset");
  },
  computed: {
    sessionlist() {
      let list = this.$store.state.activesessionlist;
      return list.pairs;
    },
    sessionindex() {
      return this.$store.state.sessionIndex;
    },
  },
  methods: {
    next() {
      this.$store.dispatch("advance");
    },
  },
  components: {},
};
</script>


<style scoped>
</style>