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
        <button @click="handleSubmit">Take</button>
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
      rating: "",
      review: "",
    };
  },
  methods: {
    handleSubmit() {
      const apiKeyID = process.env.API_KEY_ID;
      const apiKey = process.env.API_KEY;

      const headers = new Headers({
        "X-NCP-APIGW-API-KEY-ID": apiKeyID,
        "X-NCP-APIGW-API-KEY": apiKey,
        "Content-Type": "application/json",
      });

      fetch(
        // 네이버 CLOVA Sentiment REST API
        "https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ content: this.review }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("응답없음");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });

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
