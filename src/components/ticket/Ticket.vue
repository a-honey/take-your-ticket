<template>
  <header>
    <h1>Take Your Ticket</h1>
  </header>
  <main>
    <div class="Container">
      <div class="imgContainer">
        <img src="" alt="" />
      </div>
      <div class="ticketContainer">
        <label class="items">TAKE YOUR TICKET</label>
        <div class="items">그리스인 조르바</div>
        <div class="items">니코스 카잔차키스</div>
        <div class="items">*****</div>
        <div class="items">#조르바 #자유 #히피 #열린책들</div>
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
