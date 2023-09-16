<template>
  <header>
    <h1>Take Your Ticket</h1>
  </header>
  <main v-if="isUploading === true">
    <form @submit="handleSubmit">
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
            v-model="info"
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
        <button type="submit">Take</button>
        <button type="button" @click="handleBringInfo">Bring</button>
      </div>
    </form>
  </main>
  <main class="isUploading" v-if="isUploading === false">
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
  name: "MainPage",
  components: {},
  data() {
    const searchParams = new URLSearchParams(this.$route.query);

    return {
      isUploading: true,
      img: searchParams.get("img") || "",
      title: searchParams.get("title") || "",
      info: searchParams.get("info") || "",
      rating: searchParams.get("rating") || "",
      review: searchParams.get("review") || "",
    };
  },
  methods: {
    handleSubmit() {
      if (!this.title || !this.info || !this.rating || !this.review) {
        alert("입력값을 확인해주세요.");
        return;
      }
      const apiKeyID = process.env.VUE_APP_API_KEY_ID;
      const apiKey = process.env.VUE_APP_API_KEY;

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
          mode: "no-cors",
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
          alert(data);
        })
        .catch((error) => {
          console.error(error);
        });

      // 유저가 입력한 데이터를 URL로 담아 전달
      this.isUploading = false;
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

    handleBringInfo() {
      if (!this.title) {
        alert("정보를 불러오기 위해서 영화 제목을 입력해주세요.");
        return;
      }
      const apiKeyID = process.env.VUE_APP_API_KEY_ID;
      const apiKey = process.env.VUE_APP_API_KEY;

      const headers = new Headers({
        "X-Naver-Client-Id": apiKeyID,
        "X-Naver-Client-Secret": apiKey,
        "Content-Type": "application/json",
      });

      fetch(
        // 네이버 영화 검색 REST API
        `https://openapi.naver.com/v1/search/movie.xml?query=${encodeURIComponent(
          this.title
        )}display=${10}&start=1&genre=1`,
        {
          method: "GET",
          mode: "no-cors",
          headers: headers,
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
    },
    handleNewClick() {
      this.img = "";
      this.title = "";
      this.info = "";
      this.rating = "";
      this.review = "";
      this.isUploading = true;
    },
    handleBackClick() {
      this.isUploading = true;
    },
  },
  mounted() {
    console.log("Hello, take your ticket :D");
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

/* v-if isUploading === false */

main.isUploading {
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
</style>
