<template>
  <div id="park" :class="{hidden: !loaded}">
    <!-- <div class="background" :style="{'background-image': 'url(' + bgImageURL + ')'}"></div> -->

    <div class="header-section">
      <div class="title-block">
        <div v-for="park in parkData" :key="park.id" class="park-info">
          <h1 class="park-name">{{ park.fullName }}</h1>
        </div>
      </div>
      <div class="image-block" :style="{'background-image': 'url(' + bgImageURL + ')'}"></div>
    </div>

    <div class="park-data">
      <div v-for="park in parkData" :key="park.id" class="park-info">
        <h3>{{ (park.designation) ? park.designation : "Site" }} in {{ park.states.replace(/,/g, ", ") }}</h3>
        <p class="park-desc">{{ park.description }}</p>
      </div>

      <divider></divider>

      <h1 v-if="imageGallery.length > 0">Images</h1>
      <div class="image-gallery">
        <div class="image-card" v-for="image in imageGallery" :key="image.id">
          <div class="image-contain">
            <img class="image" :src="image.url">
          </div>
          <p class="image-title">{{ image.title }}</p>
        </div>
      </div>

      <divider></divider>

      <h1 v-if="visitorcenters.length > 0">Visitor Centers</h1>
      <div class="visitor-center-info">
        <div class="center" v-for="center in visitorcenters" :key="center.id">
          <h3>{{ center.name }}</h3>
          <p>{{ center.description }}</p>
        </div>
      </div>

      <h1 v-if="campgrounds.length > 0">Campgrounds</h1>
      <div class="campground-info">
        <div class="camp" v-for="camp in campgrounds" :key="camp.id">
          <h3>{{ camp.name }}</h3>
          <p>{{ camp.description }}</p>
        </div>
      </div>

      <h1 v-if="newsreleases.length > 0">News Releases</h1>
      <div class="news-info">
        <div class="release" v-for="release in newsreleases" :key="release.id">
          <h4 class="date">{{ release.releasedate }}</h4>
          <h3>{{ release.title }}</h3>
          <p>{{ release.abstract }}</p>
        </div>
      </div>

      <h1 v-if="events.length > 0">Events</h1>
      <div class="events-info">
        <div class="event" v-for="event in events" :key="event.id">
          <h4 class="date">{{ event.datestart }} — {{ event.dateend }}</h4>
          <h3>{{ event.title }}</h3>
          <p>{{ event.description }}</p>
        </div>
      </div>

      <h1 v-if="alerts.length > 0">Alerts</h1>
      <div class="alerts-info">
        <div class="alert" v-for="alert in alerts" :key="alert.id">
          <h4>{{ alert.category }}</h4>
          <h3>{{ alert.title }}</h3>
          <p>{{ alert.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ResultImage, Result, VisitorCenter } from "../data/TypesData";
import Divider from "../components/Divider.vue";
import axios from "axios";

type Request = {
  req: string;
  resp: any;
};

@Component({
  components: {
    Divider
  }
})
export default class Park extends Vue {
  baseURL = process.env.VUE_APP_BASE_URL;
  apiKey = process.env.VUE_APP_API_KEY;

  parkCode: any = "";

  parkData: Array<Result> = [];
  imageGallery: Array<ResultImage> = [];

  visitorcenters: Array<VisitorCenter> = [];
  campgrounds: Array<any> = [];
  newsreleases: Array<any> = [];
  events: Array<any> = [];
  alerts: Array<any> = [];
  articles: Array<any> = [];
  lessonplans: Array<any> = [];
  people: Array<any> = [];
  places: Array<any> = [];

  requests: Array<Request> = [
    { req: "visitorcenters", resp: this.visitorcenters },
    { req: "campgrounds", resp: this.campgrounds },
    { req: "newsreleases", resp: this.newsreleases },
    { req: "events", resp: this.events },
    { req: "alerts", resp: this.alerts },
    { req: "articles", resp: this.articles },
    { req: "lessonplans", resp: this.lessonplans },
    { req: "people", resp: this.people },
    { req: "places", resp: this.places }
  ];

  bgImageURL: string = "../assets/logo.png";

  loaded = false;

  getParkData() {
    this.parkCode = this.$route.query.code;
    const request =
      this.baseURL +
      "parks?parkCode=" +
      this.parkCode +
      "&fields=images" +
      this.apiKey;
    axios
      .get(request)
      .then(
        response => (
          (this.loaded = true),
          (this.parkData = response.data.data),
          (this.imageGallery = response.data.data[0].images),
          (this.bgImageURL = response.data.data[0].images[0].url)
        )
      );
  }

  /**
   * Returns the resp "value" given a req "key" and a Request array.
   */
  getResp(reqKey: string, requests: Array<Request>) {
    return requests.find(request => request.req === reqKey)!.resp;
  }

  setResponse() {
    this.visitorcenters = this.getResp("visitorcenters", this.requests);
    this.campgrounds = this.getResp("campgrounds", this.requests);
    this.newsreleases = this.getResp("newsreleases", this.requests);
    this.events = this.getResp("events", this.requests);
    this.alerts = this.getResp("alerts", this.requests);
    this.articles = this.getResp("articles", this.requests);
    this.lessonplans = this.getResp("lessonplans", this.requests);
    this.people = this.getResp("people", this.requests);
    this.places = this.getResp("places", this.requests);
  }

  getRequests() {
    this.requests.map(request =>
      axios
        .get(
          this.baseURL +
            request.req +
            "?parkCode=" +
            this.parkCode +
            this.apiKey
        )
        .then(
          response => ((request.resp = response.data.data), this.setResponse())
        )
    );
  }

  mounted() {
    this.getParkData();
    this.getRequests();
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/global.scss";

#park {
  // flex-grow: 1;
  text-align: center;
}

.header-section {
  box-sizing: border-box;
  padding: 1.25rem;
  width: 100%;
  height: 35rem;
  display: flex;
  flex-flow: row;
}

.title-block {
  position: relative;
  margin-right: 1.25rem;
  box-sizing: border-box;
  height: 100%;
  background-color: #eee;
  width: 35%;
  text-align: left;

  .park-info {
    position: absolute;
    top: 30%;
    padding: 0 2.7rem;
  }
}

.park-name {
  font-size: 3rem;
}

.park-desc {
  width: 70%;
}

.image-block {
  height: 100%;
  flex-grow: 1;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.background {
  height: 15rem;
  overflow: hidden;
  background-size: 100%;
  background-position: center;
}

.park-data {
  margin: 5rem auto;
  width: 75%;
  padding: 0 3rem;
  text-align: left;
}

// .visitor-center-info,
// .image-gallery,
// .campground-info {
//   margin-top: 4rem;
// }

.image-gallery {
  display: flex;
  flex-wrap: wrap;
}

.image-card {
  flex-grow: 0.25;
  display: inline-block;
  margin: 0 2rem 2rem 0;

  .image-contain {
    // width: 24rem;
    // height: 13.5rem;
    overflow: hidden;
    text-align: middle;
  }

  .image {
    width: 100%;
    position: relative;
    top: 100%;
    margin-top: -200%;
  }

  .image-title {
    margin: 1rem 0 0;
    font-weight: bold;
  }
}

.event {
  border: 1px solid #777;
}

.date {
  margin-bottom: 0;
}
</style>