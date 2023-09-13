<template>
  <header>
    <h1>Take Your Ticket</h1>
  </header>
  <main>
    <form>
      <div class="formContainer">
        <div class="imgFormContainer">
          <div class="imgBox">
            <img src="" alt="" />
          </div>
          <input type="file" />
        </div>
        <div class="contentContainer">
          <input type="text" placeholder="제목을 입력해주세요." />
          <input type="text" placeholder="감독 및 배우를 입력해주세요." />
          <input type="text" placeholder="평점을 입력해주세요." />
          <textarea placeholder="리뷰를 입력해주세요."></textarea>
        </div>
      </div>
      <div class="btns">
        <button @click="goResult">Take</button>
        <button type="button">Bring</button>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  name: "MainPage",
  components: {},
  methods: {
    goResult() {
      this.$router.push("/ticket");
    },
  },
  mounted() {
    console.log("마운트됨");
  },
};
</script>

<style>
form {
  background-color: #ededed;
  border-radius: 5px;
  padding: 30px 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.formContainer {
  width: 100%;
  display: flex;
  gap: 40px;
  justify-content: space-between;
}

.imgFormContainer,
.contentContainer {
  display: flex;
  flex-direction: column;
  height: 500px;
}

.imgBox {
  width: 300px;
  height: 400px;
  background-color: #d8d8d8;
  margin-bottom: 20px;
}

.contentContainer {
  gap: 20px;
}

.contentContainer > input {
  width: 400px;
  height: 40px;
  padding: 10px;
  background-color: #d8d8d8;
  border: 0;
}

textarea {
  width: 400px;
  height: 200px;
  padding: 10px;
  background-color: #d8d8d8;
  border: 0;
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
