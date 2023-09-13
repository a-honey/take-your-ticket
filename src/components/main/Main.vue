<template>
  <header>
    <h1>Take Your Ticket</h1>
  </header>
  <main>
    <form>
      <div class="formContainer">
        <div class="imgFormContainer">
          <div class="imgBox">
            <img :src="img" alt="티켓 이미지" />
          </div>
          <input type="file" @change="handleImgChange" />
        </div>
        <div class="contentContainer">
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            v-model="title"
          />
          <input
            type="text"
            placeholder="감독 및 배우를 입력해주세요."
            v-model="directorAndActors"
          />
          <input
            type="text"
            placeholder="평점을 입력해주세요."
            v-model="rating"
          />
          <textarea
            placeholder="리뷰를 입력해주세요."
            v-model="review"
          ></textarea>
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
  data() {
    return {
      img: "",
      title: "",
      directorAndActors: "",
      rating: 0,
      review: "",
    };
  },
  methods: {
    goResult() {
      console.log(
        this.img,
        this.title,
        this.directorAndActors,
        this.rating,
        this.review
      );
      this.$router.push("/ticket");
    },
    handleImgChange(e) {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.img = e.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        alert("이미지를 넣어주세요.");
        return;
      }
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
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.imgBox > img {
  width: 100%;
  height: 100%;
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
