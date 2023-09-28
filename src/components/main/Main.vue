<template>
  <header>
    <h1>Take Your Ticket</h1>
  </header>
  <main v-if="mode === 'edit'">
    <form @submit="handleSubmit">
      <div class="formContainer">
        <div class="imgFormContainer">
          <div class="imgBox">
            <img :src="img" alt="티켓 이미지" />
          </div>
          <input type="file" @change="handleImgChange" />
          <input
            type="text"
            placeholder="이미지 주소를 입력해주세요."
            v-model="img"
          />
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
          <div class="ratingContainer">
            <div class="rating">
              <input
                :class="{ active: rating >= 1 }"
                type="radio"
                id="star1"
                name="rating"
                value="1"
                v-model="rating"
              />
              <input
                :class="{ active: rating >= 2 }"
                type="radio"
                id="star3"
                name="rating"
                value="2"
                v-model="rating"
              />
              <input
                :class="{ active: rating >= 3 }"
                type="radio"
                id="star5"
                name="rating"
                value="3"
                v-model="rating"
              />
              <input
                :class="{ active: rating >= 4 }"
                type="radio"
                id="star7"
                name="rating"
                value="4"
                v-model="rating"
              />
              <input
                :class="{ active: rating >= 5 }"
                type="radio"
                id="star9"
                name="rating"
                value="5"
                v-model="rating"
              />
            </div>
          </div>
          <textarea
            placeholder="리뷰를 입력해주세요."
            v-model="review"
          ></textarea>
          <div class="keywordContainer">
            <input v-model="keywordItem" placeholder="키워드" />
            <button type="button" @click="handleKeyword">+</button>
            <ul>
              <li v-for="(keyword, index) in keywords" :key="index">
                {{ keyword
                }}<button
                  class="itemDelete"
                  @click="handleKeywordDelete(index, $event)"
                >
                  x
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="btns">
        <button type="submit">Take</button>
        <button type="button" @click="handleBringInfo">Bring</button>
      </div>
    </form>
  </main>
  <main class="isUploading" v-if="mode !== 'edit'">
    <nav class="nav left">
      <label>여백주기</label>
      <input
        :class="{ active: rating >= 5 }"
        type="text"
        name="gap"
        v-model="styles.gap"
      />
    </nav>
    <nav class="nav right">
      <button @click="handleMode('ticket')">티켓ver</button>
      <button @click="handleMode('crop')">크롭ver</button>
      <button @click="handleMode('square')">대표ver</button>
    </nav>
    <div
      id="capture"
      :style="{
        gap: styles.gap + 'px',
        padding: styles.gap + 'px',
      }"
      class="Container"
    >
      <div class="imgContainer">
        <img :src="img" alt="" />
      </div>
      <!-- ticket ver -->
      <div class="ticketContainer" v-if="mode === 'ticket'">
        <label class="items logo">TAKE YOUR TICKET</label>
        <div class="items title">{{ title }}</div>
        <div class="items info">{{ info }}</div>
        <div class="items rating">
          <img
            v-for="a in parseInt(rating)"
            :key="a"
            src="../../assets/star.png"
            alt="rating_star"
          />
        </div>
        <div class="items review">{{ review }}</div>
        <div class="results items">
          <div v-for="(keyword, index) in keywords" :key="index">
            {{ keyword }}
          </div>
        </div>
      </div>
      <!-- square ver -->
      <div class="squareContainer" v-if="mode === 'square'">
        <div class="results">
          <div v-for="(keyword, index) in keywords" :key="index">
            #{{ keyword }}
          </div>
        </div>
      </div>
    </div>
    <div class="btns">
      <button @click="handleSaveClick">Save</button>
      <button @click="handleBackClick">Back</button>
      <button @click="handleNewClick">New</button>
    </div>
  </main>
</template>

<script>
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

export default {
  name: "MainPage",
  components: {},
  data() {
    return {
      mode: "edit",
      img: "/post_none.png",
      title: "",
      info: "",
      rating: "",
      review: "",
      keywordItem: "",
      keywords: [],
      styles: {
        gap: 0,
      },
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      if (this.img === "/post_none.png") {
        alert("이미지를 넣어주세요.");
        return;
      } else if (this.title === "") {
        alert("제목을 입력해주세요.");
        return;
      } else if (this.info === "") {
        alert("감독 및 배우를 입력해주세요.");
        return;
      } else if (this.rating === "") {
        alert("별점을 입력해주세요.");
        return;
      } else if (this.keywords.length < 3) {
        alert("키워드를 3개 입력해주세요.");
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
      this.mode = "ticket";
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
    handleKeyword(e) {
      e.preventDefault();
      if (this.keywords.length === 3) {
        alert("키워드는 최대 3개까지 입력가능합니다.");
        this.keywordItem = "";
        return;
      }
      if (this.keywordItem.trim() !== "") {
        this.keywords.push(this.keywordItem);
        this.keywordItem = "";
      }
    },
    handleKeywordDelete(index, e) {
      e.preventDefault();
      this.keywords.splice(index, 1);
    },
    handleBringInfo(e) {
      e.preventDefault();
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
      this.img = "/post_none.png";
      this.title = "";
      this.info = "";
      this.rating = "";
      this.review = "";
      this.keywordItem = "";
      this.keywords = [];
      this.mode = "edit";
    },
    handleBackClick() {
      this.mode = "edit";
    },
    handleMode(modeName) {
      this.mode = modeName;
    },
    async handleSaveClick() {
      const capture = document.getElementById("capture");
      const canvas = await html2canvas(capture);
      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve);
      });
      saveAs(blob, `take_${this.title}_ticket.png`);
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
  height: 100%;
}

.imgBox {
  width: 400px;
  height: 500px;
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
  position: relative;
}

.contentContainer > input {
  width: 400px;
  height: 40px;
  padding: 10px;
  background-color: #d8d8d8;
  border: 0;
}

div.rating {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
}

div.rating > input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: block;
  width: 40px;
  height: 40px;
  padding: 10px;
  background: url("/src/assets/star.png") no-repeat right center;
  filter: grayscale(100%);
  background-size: 40px 40px;
  border-radius: 5px;
  cursor: pointer;
}

div.rating > input.active {
  background: url("/src/assets/star.png") no-repeat right center;
  background-size: 40px 40px;
  filter: none;
}

.keywordContainer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

.keywordContainer > input {
  width: 100px;
}

ul {
  display: grid;
  grid-template-columns: repeat(3, 70px);
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  gap: 5px;
}
li {
  border-radius: 5px;
  font-size: 15px;
  background: #c2c2c2;
}
.keywordContainer > input {
  border: none;
  padding: 10px;
  border-radius: 5px;
  background-color: #d8d8d8;
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

.itemDelete {
  margin-left: 5px;
  padding: 0;
  background-color: transparent;
  color: black;
  font-weight: 500;
  font-size: 15px;
}

.btns {
  display: flex;
  gap: 20px;
}

/* v-if isUploading === false */
nav {
  position: fixed;
  margin-top: 10vh;
  top: 20px;
  bottom: 0;
  width: 250px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
}

nav.left {
  left: 0;
}

nav.right {
  right: 0;
}

main.isUploading {
  flex-direction: column;
  gap: 40px;
}

.Container {
  display: flex;
}
.ticketContainer,
.imgContainer {
  width: 400px;
  height: 600px;
  background-color: #ededed;
}

.imgContainer {
  width: 440px;
  height: 640px;
}
.imgContainer > img {
  width: 100%;
  height: 100%;
}

.ticketContainer {
  display: grid;
  padding: 20px;
  grid-template-rows: 0.5fr 1fr 1fr 1fr 2fr 1fr;
}

.items {
  border-bottom: 2px solid black;
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
  font-weight: 700;
}
.results > div:last-child {
  border-right: none;
}

.squareContainer {
  width: 200px;
  height: 640px;
  background-color: #ededed;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.squareContainer > div.rating {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
}

.squareContainer > .results {
  margin: 20px;
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.squareContainer > .results > div {
  border-right: none;
}
</style>
