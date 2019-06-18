<template>
  <div id="park" :class="{ hidden: !loaded }">
    <div class="header-section">
      <div class="title-block">
        <div v-for="park in parkData" :key="park.id" class="park-info">
          <h3 class="park-coords">{{ park.latLong.replace(/lat:|long:/g,"") }}</h3>
          <h1 class="park-name">{{ park.fullName }}</h1>
        </div>
      </div>
      <div class="image-block" :style="{ 'background-image': 'url(' + bgImageURL + ')' }"></div>
    </div>

    <div v-for="park in parkData" :key="park.id" class="park-header">
      <h3 class="park-coords">{{ park.latLong.replace(/lat:|long:/g,"") }}</h3>
      <h1 class="park-name">{{ park.fullName }}</h1>
    </div>

    <div class="quick-nav">
      <ul class="nav-group">
        <li class="nav-item">
          <a class="nav-link" href="#images">Images</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#centers">Visitor Centers</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#alerts">Alerts</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#articles">Articles</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#news">News</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#events">Events</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#camps">Campgrounds</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#lessons">Lesson Plans</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#people">People</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#places">Places</a>
        </li>
      </ul>
    </div>

    <div class="park-data">
      <div v-for="park in parkData" :key="park.id" class="park-info">
        <h3>
          {{ park.designation ? park.designation : "Site" }} in
          {{ park.states.replace(/,/g, ", ") }}
        </h3>
        <p class="park-desc">{{ park.description }}</p>
      </div>

      <divider></divider>

      <h1 id="images">Images</h1>
      <h3 v-if="imageGallery.length < 1">No images available.</h3>
      <div class="image-gallery">
        <div class="image-card" v-for="image in imageGallery" :key="image.id">
          <div class="image-contain">
            <img class="image" :src="image.url">
          </div>
          <p class="image-title">{{ image.title }}</p>
        </div>
      </div>

      <divider></divider>

      <h1 id="centers">
        <i class="npmap-symbol-library-icon aed-black"></i>Visitor Centers
      </h1>
      <h3 v-if="visitorcenters.length < 1">No visitor centers available.</h3>
      <div class="visitor-center-info">
        <div class="info-contain" v-for="center in visitorcenters" :key="center.id">
          <a class="info-link" :href="center.url">
            <h3 class="info-head">{{ center.name }}</h3>
          </a>
          <p class="info-desc">{{ center.description }}</p>
        </div>
      </div>

      <divider></divider>

      <h1 id="alerts">Alerts</h1>
      <h3 v-if="alerts.length < 1">No alerts available.</h3>
      <div class="alerts-info">
        <div class="info-contain" v-for="alert in alerts" :key="alert.id">
          <h4 class="info-pre">{{ alert.category }}</h4>
          <a class="info-link" :href="alert.url">
            <h3 class="info-head">{{ alert.title }}</h3>
          </a>
          <p class="info-desc">{{ alert.description }}</p>
        </div>
      </div>

      <divider></divider>

      <!-- articles -->
      <h1 id="articles">Articles</h1>
      <h3 v-if="articles.length < 1">No articles available.</h3>
      <div class="articles-info">
        <div
          class="info-contain article"
          v-for="article in articles"
          :key="article.id"
          :style="{
            'background-image': 'url(' + article.listingimage.url + ')'
          }"
        >
          <a :href="article.url">
            <div class="background-shade"></div>
            <div class="title-desc">
              <h3 class="title">{{ article.title }}</h3>
              <p>{{ article.listingdescription }}</p>
            </div>
          </a>
        </div>
        <flat-button
          class="see-more"
          button-text="SEE MORE ARTICLES"
          @click="seeMore('articles')"
          v-if="articles.length >= 6"
        ></flat-button>
      </div>

      <divider></divider>

      <h1 id="news">News</h1>
      <h3 v-if="newsreleases.length < 1">No news releases available.</h3>
      <div class="news-info">
        <div class="info-contain" v-for="release in newsreleases" :key="release.id">
          <h4 class="info-pre">{{ release.releasedate.substring(0, 10) }}</h4>
          <a :href="release.url">
            <h3 class="info-head">{{ release.title }}</h3>
          </a>
          <p class="info-desc">{{ release.abstract }}</p>
        </div>
        <flat-button
          class="see-more"
          button-text="SEE MORE NEWS"
          @click="seeMore('newsreleases')"
          v-if="newsreleases.length >= 7"
        ></flat-button>
      </div>

      <divider></divider>

      <h1 id="events">Events</h1>
      <h3 v-if="events.length < 1">No events available.</h3>
      <div class="events-info">
        <div class="event" v-for="event in events" :key="event.id">
          <!-- <div v-for="image in event.images" :key="image.imageid">
            <img class="event-image" :src="'https://www.nps.gov' + image.url">
          </div>-->
          <h4 class="info-pre">{{ event.datestart }} — {{ event.dateend }}</h4>
          <a :href="event.infourl" v-if="event.infourl">
            <h3 class="info-head">{{ event.title }}</h3>
          </a>
          <h3 class="info-head" v-else>{{ event.title }}</h3>
          <div class="info-desc html" v-html="event.description"></div>
        </div>
        <flat-button
          class="see-more"
          button-text="SEE MORE EVENTS"
          @click="seeMore('events')"
          v-if="events.length >= 7"
        ></flat-button>
      </div>

      <divider></divider>

      <h1 id="camps">Campgrounds</h1>
      <h3 v-if="campgrounds.length < 1">No campgrounds available.</h3>
      <div class="campground-info">
        <div class="camp info-contain" v-for="camp in campgrounds" :key="camp.id">
          <a :href="camp.directionsUrl">
            <h3 class="info-head">{{ camp.name }}</h3>
          </a>
          <p class="info-desc">{{ camp.description }}</p>
        </div>
        <flat-button
          class="see-more"
          button-text="SEE MORE CAMPGROUNDS"
          @click="seeMore('campgrounds')"
          v-if="campgrounds.length >= 7"
        ></flat-button>
      </div>

      <!-- lessons -->
      <divider></divider>

      <h1 id="lessons">Lesson Plans</h1>
      <h3 v-if="lessonplans.length < 1">No lesson plans available.</h3>
      <div class="lesson-info">
        <div class="lesson" v-for="lesson in lessonplans" :key="lesson.id">
          <h4 class="info-pre">{{ lesson.subject }}</h4>
          <a :href="lesson.url">
            <h3 class="info-head">{{ lesson.title }}</h3>
          </a>
          <p class="info-desc">{{ lesson.questionobjective }}</p>
        </div>
        <flat-button
          class="see-more"
          button-text="SEE MORE LESSONS"
          @click="seeMore('lessonplans')"
          v-if="lessonplans.length >= 7"
        ></flat-button>
      </div>

      <!-- people -->
      <divider></divider>

      <h1 id="people">People</h1>
      <h3 v-if="people.length < 1">No relevant people available.</h3>
      <div class="people-info">
        <div class="person" v-for="person in people" :key="person.id">
          <a class="hidden-link" :href="person.url">
            <img class="person-pic" :src="person.listingimage.url">
            <h3 class="info-head">{{ person.title }}</h3>
            <p class="info-desc">{{ person.listingdescription }}</p>
          </a>
        </div>
        <flat-button
          class="see-more"
          button-text="SEE MORE PEOPLE"
          @click="seeMore('people')"
          v-if="people.length >= 7"
        ></flat-button>
      </div>

      <!-- places -->
      <divider></divider>

      <h1 id="places">Places</h1>
      <h3 v-if="places.length < 1">No relevant places available.</h3>
      <div class="place-info">
        <div class="place" v-for="place in places" :key="place.id">
          <a class="hidden-link" :href="place.url">
            <img class="place-pic" :src="place.listingimage.url">
            <h3 class="info-head">{{ place.title }}</h3>
            <p class="info-desc">{{ place.listingdescription }}</p>
          </a>
        </div>
      </div>
      <flat-button
        class="see-more"
        button-text="SEE MORE PLACES"
        @click="seeMore('places')"
        v-if="places.length > 7"
      ></flat-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ResultImage, Result, VisitorCenter } from "../data/TypesData";
import axios from "axios";
import Divider from "../components/Divider.vue";
import FlatButton from "../components/FlatButton.vue";

type Request = {
  req: string;
  resp: any;
  limit: number;
};

@Component({
  components: {
    Divider,
    FlatButton
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
    { req: "visitorcenters", resp: this.visitorcenters, limit: 50 },
    { req: "campgrounds", resp: this.campgrounds, limit: 7 },
    { req: "newsreleases", resp: this.newsreleases, limit: 7 },
    { req: "events", resp: this.events, limit: 7 },
    { req: "alerts", resp: this.alerts, limit: 50 },
    { req: "articles", resp: this.articles, limit: 6 },
    { req: "lessonplans", resp: this.lessonplans, limit: 7 },
    { req: "people", resp: this.people, limit: 7 },
    { req: "places", resp: this.places, limit: 7 }
  ];

  bgImageURL: string = "../assets/logo.png";

  loaded = false;

  /**
   * Gets basic park information and initializes main image as well as the
   * image gallery.
   */
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

  /**
   * Returns the Request object given a req "key" and Request array.
   */
  getRequestRecord(reqKey: string, requests: Array<Request>) {
    return requests.find(request => request.req === reqKey)!;
  }

  /**
   * Assigns class variables to their corresponding responses.
   */
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

  /**
   * Requests more of a given request by increasing the request limit by 3.
   * @example: seeMore('articles') will make a request for more 3 more articles
   * than the current limit.
   */
  seeMore(req: string) {
    const requestIndex = this.requests.indexOf(
      this.getRequestRecord(req, this.requests)
    );
    this.requests[requestIndex].limit += 3;
    const request = this.requests[requestIndex];
    axios
      .get(
        this.baseURL +
          request.req +
          "?parkCode=" +
          this.parkCode +
          "&limit=" +
          request.limit +
          this.apiKey
      )
      .then(
        response => ((request.resp = response.data.data), this.setResponse())
      );
  }

  /**
   * Makes a API request for each of the Requests in this.requests.
   */
  getRequests() {
    this.requests.map(request =>
      axios
        .get(
          this.baseURL +
            request.req +
            "?parkCode=" +
            this.parkCode +
            "&limit=" +
            request.limit +
            this.apiKey
        )
        .then(
          response => ((request.resp = response.data.data), this.setResponse())
        )
    );
  }

  /**
   * Initializes requests on page load.
   */
  mounted() {
    this.getParkData();
    this.getRequests();
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/global.scss";
$contentWidthLarge: 75%;
$contentWidthMedium: 85%;
$contentWidthSmall: 90%;

.quick-nav {
  margin: 0 auto;
  width: $contentWidthLarge;
  text-align: left;

  @media (max-width: $mediumMedia) {
    width: $contentWidthMedium;
  }

  @media (max-width: $extraSmallMedia) {
    width: $contentWidthSmall;
  }
}

.nav-group {
  padding: 0;
  list-style-type: none;
}

.nav-item {
  display: inline-block;
  margin: 1rem 3rem 0 0;
  font-size: 1.2rem;
}

.nav-link {
  font-weight: bold;
  text-decoration: none;
  color: $colorAccentPrimary;
  transition: 0.3s;

  &:hover {
    color: $colorAccentDark;
  }
}

.header-section {
  box-sizing: border-box;
  padding: 1.25rem;
  width: 100%;
  // height: 40rem;
  height: 70vh;
  display: flex;
  flex-flow: row;

  @media (max-width: $mediumMedia) {
    height: 60vh;
  }

  @media (max-width: $smallMedia) {
    padding: 0;
    height: 55vh;
  }

  @media (max-width: $extraSmallMedia) {
  }
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
    box-sizing: border-box;
    position: absolute;
    padding: 10% 2.7rem;
    width: 100%;
  }

  @media (max-width: $mediumMedia) {
    display: none;
    margin: 0;
  }
}

.image-block {
  height: 100%;
  flex-grow: 2;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media (max-width: $mediumMedia) {
    width: 100%;
  }
}

.park-coords {
  font-weight: normal;
}

.park-name {
  font-size: 3rem;
}

.park-desc {
  width: 70%;

  @media (max-width: $mediumMedia) {
    width: 100%;
  }
}

.park-header {
  display: none;

  @media (max-width: $mediumMedia) {
    text-align: left;
    margin: 0 auto;
    width: $contentWidthMedium;
    display: block;
  }

  @media (max-width: $extraSmallMedia) {
    width: $contentWidthSmall;
  }
}

.background {
  height: 15rem;
  overflow: hidden;
  background-size: 100%;
  background-position: center;
}

.park-data {
  margin: 5rem auto;
  width: $contentWidthLarge;
  // padding: 0 3rem;
  text-align: left;

  @media (max-width: $mediumMedia) {
    width: $contentWidthMedium;
  }

  @media (max-width: $extraSmallMedia) {
    width: $contentWidthSmall;
  }
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
}

.image-card {
  display: inline-block;
  margin: 0 2rem 2rem 0;
  width: calc(30% - 1rem);

  .image-contain {
    margin: 0;
    // width: 24rem;
    // height: 13.5rem;
    overflow: hidden;
    text-align: middle;
  }

  .image {
    border: none;
    max-width: 100%;
    height: auto;
    display: block;
  }

  .image-title {
    margin: 1rem 0 0;
    font-weight: bold;
  }
}

.info-contain {
  margin-bottom: 2rem;
}

.articles-info {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-evenly;
}

.article {
  position: relative;
  background-size: 100%;
  background-position: center;
  height: 21rem;
  margin: 0 2rem 2rem 0;
  width: calc(31% - 1rem);
  transition: background-size 0.7s;

  &:hover {
    background-size: 120%;
  }

  .background-shade,
  .title-desc {
    position: absolute;
  }

  .background-shade {
    height: 100%;
    width: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.45);
  }

  .title-desc {
    box-sizing: border-box;
    width: 100%;
    padding: 1rem 2rem;
    z-index: 2;
    color: #fff;
    height: 21rem;
    overflow: auto;
  }

  &:first-child {
    width: 100%;
    height: 23rem;

    .title {
      font-size: 2.1rem;
      margin-bottom: 0;
    }
  }
}

// .event {
//   border: 1px solid #777;
// }

.event-image {
  width: 100%;
}

.info-pre {
  text-transform: uppercase;
  margin-bottom: 0;
}

.info-head {
  margin-top: 0.25rem;
  margin-bottom: 0;
}

.info-desc {
  margin-top: 0.25rem;

  &.html {
    background-color: #eee;
    padding: 1rem 2rem;
    margin-bottom: 2rem;
  }
}

.people-info,
.place-info {
  display: flex;
  flex-wrap: wrap;
}

.person,
.place {
  box-sizing: border-box;
  margin: 0 2rem 2rem 0;
  width: calc(31% - 1rem);
  background-color: #fff;
  border-radius: 7px;
  transition: 0.3s;
  @extend %default-shadow-lower;

  &:hover {
    @extend %default-shadow;
  }

  .info-head {
    padding: 1rem 2rem 0;
    margin-bottom: 0.45rem;
  }

  .info-desc {
    padding: 0 2rem 1rem;
  }
}

.person-pic,
.place-pic {
  border-radius: 7px 7px 0 0;
  width: 100%;
  height: 55%;
  object-fit: cover;
}
</style>
