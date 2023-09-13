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
        <label class="items">TAKE YOUR TICKET</label>
        <div class="items">{{ title }}</div>
        <div class="items">{{ directorAndActors }}</div>
        <div class="items">{{ rating }}</div>
        <div class="items">{{ review }}</div>
        <div class="results items">
          <div>interested</div>
          <div>4.5</div>
          <div>춤</div>
        </div>
      </div>
    </div>
    <div class="btns">
      <button>Save</button>
      <button @click="goBack">Back</button>
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
      directorAndActors: searchParams.get("directorAndActors") || "",
      rating: searchParams.get("rating") || "",
      review: searchParams.get("review") || "",
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
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

.ticketContainer {
  display: grid;
  grid-template-rows: 0.5fr 1fr 1fr 1fr 2fr 1fr;
  gap: 10px;
}

.items {
  background-color: #d8d8d8;
}
.results {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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
