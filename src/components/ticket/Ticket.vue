<template>
  <header>
    <h1>Take Your Ticket</h1>
  </header>
  <main>
    <div class="Container">
      <div class="imgContainer">
        <img :src="img" alt="" />
      </div>
      <div class="ticketContainer">
        <label class="items logo">TAKE YOUR TICKET</label>
        <div class="items title">{{ title }}</div>
        <div class="items info">{{ info }}</div>
        <div class="items rating">
          <img
            v-for="a in rating"
            :key="a"
            src="/start.png"
            alt="rating_star"
          />
        </div>
        <div class="items review">{{ review }}</div>
        <div class="results items">
          <div>interested</div>
          <div>4.5</div>
          <div>춤</div>
        </div>
      </div>
    </div>
    <div class="btns">
      <button>Save</button>
      <button @click="handleBackClick">Back</button>
      <button @click="handleNewClick">New</button>
    </div>
  </main>
</template>

<script>
export default {
  name: "TickPage",
  components: {},
  data() {
    const searchParams = new URLSearchParams(this.$route.query);

    return {
      img: searchParams.get("img") || "",
      title: searchParams.get("title") || "",
      info: searchParams.get("info") || "",
      rating: parseInt(searchParams.get("rating")) || "",
      review: searchParams.get("review") || "",
    };
  },
  methods: {
    handleNewClick() {
      this.$router.push("/");
    },
    handleBackClick() {
      this.$router.push(
        `/?title=${this.title}&img=${this.img}&rating=${this.rating}&info=${this.info}&review=${this.review}`
      );
    },
  },
  mounted() {
    console.log("마운트됨");
  },
};
</script>

<style>
main {
  flex-direction: column;
  gap: 40px;
}
.Container {
  display: flex;
  gap: 40px;
}
.ticketContainer,
.imgContainer {
  width: 400px;
  height: 600px;
  padding: 20px;
  background-color: #ededed;
}

.imgContainer > img {
  width: 100%;
  height: 100%;
}

.ticketContainer {
  display: grid;
  grid-template-rows: 0.5fr 1fr 1fr 1fr 2fr 1fr;
}

.items {
  border-bottom: 2px solid black;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  justify-content: left;
  font-weight: 700;
}
.title {
  font-size: 20px;
  font-weight: 700;
}
.rating > img {
  width: 40px;
  height: 40px;
}
.results {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.results > div {
  width: 100%;
  height: 100%;
  border-right: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.results > div:last-child {
  border-right: none;
}
button {
  padding: 10px 20px;
  background-color: rgb(191, 0, 0);
  border: 0;
  color: white;
  font-weight: 700;
  border-radius: 5px;
  font-size: 20px;
}

.btns {
  display: flex;
  gap: 20px;
}
</style>
