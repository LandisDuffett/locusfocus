<template>
  <div class="home">
    <div class="header">
      <p class="newfont" style="font-size: 5rem">
        <span style="color: teal">Locus</span
        ><span style="color: indigo"> Focus</span>
      </p>
    </div>
    <div>
      <div class="row justify-content-center">
        <h5>
          Welcome to Locus Focus, the app that helps you memorize any list!
        </h5>
      </div>
      <div class="row text-left mx-4">
       <ul>
         <li><router-link :to="{ name: 'tutorial' }" class="nav-link"
            >text-based tuotrial (with screenshots)</router-link
          ></li>
          <li><a class="ml-3" href="#" @click="login">go straight to app (login required)</a></li>
         </ul>
      </div>
      <div class="row text-left mx-4">
        <h5 id="overview">
         Overview:
        </h5>
      </div>
      <div class="row text-left mx-4">
        <p>
          This app provides the user a means of creating, managing and using
          lists for the purpose of learning using what is called the "loci"
          method, or, more commonly, a "memory palace". This method goes back to
          at least classical Greece. Its effectiveness has been reconfirmed by
          modern evolutionary theory: human brains have evolved to be very good
          at remembering places. Thus, this method works by associating items of
          knowledge with distinct places, or "loci", with which a person is
          familiar.<br /><br />

          For example, I might need to memorize a list of all 45 presidents of
          the United States. If I sit down and try to memorize the list by rote,
          it will take a long time and the knowledge will evaporate quickly.
          Using the loci method, I first get clear in my head the loci
          (singular: "locus"), or individual places, that make up my "memory
          palace". A simple example of a memory palace might be all the spots in
          your house. You might create the memory palace in your mind by
          starting with pulling up in the driveway (so, the driveway becomes
          your first locus). Then, you take a walk through your house,
          visualizing each locus in your mind along the way. Once you have your
          memory palace down, it is just a matter of "taking a walk" through the
          house in your mind. <br /><br />

          (For more detailed information on the history and use of the loci
          method: <br />
          <ul>
            <li>
          <a href="https://www.youtube.com/watch?v=U6PoUg7jXsA"
            >Joshua Foer's Ted Talk</a
          >
            </li><li>
          <a href="https://en.wikipedia.org/wiki/Method_of_loci"
            >Wikipedia article</a
          >)
          </li>
          </ul>

          The method then works when you associate an individual item from the
          list you want to learn (in this app, this is your "study list") with a
          particular locus. The order of study items will then match the order
          of loci in your memory palace. So, George Washington will be
          associated with your driveway, and so on. The method works really well
          if you can then actually visualize the study item actually located at
          the locus that it is associated with: so, here, you visualize George
          Washington standing in your driveway. If you are working with study
          items that are abstract, then you can make associations with concrete
          items based on the words that make up the study item. For example, if
          someone didn't know what George Washington looked like, they could
          picture anyone they know named "George" (maybe George Clooney)
          "washing" a "ton" (a cartoon weight clearly labeled "one ton") and
          performing this act in your driveway. Recalling the items in your list
          becomes just a matter of taking a tour of your memory palace and
          naming everything you see (starting with either George Washington, or
          George Clooney washing a ton, in your driveway). <br /><br />

          This app allows you to create a single locus list (it's best just to
          have one locus list), or memory palace, to which you can add on more
          items. It might seem that having a very long locus list will become
          unwieldy, but it actually works. The loci are amazingly easy to recall
          and even recall in order because, again, all you have to do is "take a
          walk". The places in your locus list don't all have to be connected.
          You might have one segment of your locus list for your own house and
          then one segment covering your grandma's house or your childhood
          house. My locus list has over 1,500 loci composed mostly of buildings
          and landmarks in the various cities I've lived or stayed in. This app
          then allows you to manage your locus list and to pair it up (or
          segments of it ) with a single study list or segmetns of your study
          lists in any order you want. Most importantly, it allows you to study
          your lists in a way that harnesses the power of both the old (the
          memory palace technique itself) and the new (digital technology).
          Follow any of the links at the top of this page for more information
          on how to use the app or click on the "create lists" link in the
          navigation bar to dive right in. I hope you find it useful. Happy
          studying.
        </p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
      this.$router.push({ name: "create", path: "/create" });
    },
  },
  components: {},
};
</script>


<style scoped>
</style>