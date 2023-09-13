<template>
  <header>
    <h1>Take Your Ticket</h1>
  </header>
  <main>
    <div>
      <div class="btns">
        <button>Take</button>
        <button type="button">Bring</button>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "MainPage",
  components: {},
  mounted() {
    console.log("마운트됨");
  },
};
</script>

<style>
form {
  background-color: #ededed;
  border-radius: 5px;
  width: 40vw;
  padding: 30px 100px;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 20px;
}

.formContainer {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.imgContainer,
.contentContainer {
  display: flex;
  flex-direction: column;
}

.imgBox > img {
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
