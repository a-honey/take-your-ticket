<template>
  <header>
    <h1>Take Your Ticket</h1>
  </header>
  <main v-if="mode === 'edit'">
    <form @submit="handleSubmit">
      <div class="formContainer">
        <div class="imgFormContainer">
          <div class="imgBox">
            <img :src="img" alt="티켓 이미지" @error="handleError" />
          </div>
          <input type="file" @change="handleImgChange" />
          <input
            class="input"
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
        type="text"
        name="gap"
        v-model="styles.gap"
        placeholder="여백 크기를 입력해주세요"
      />
      <label>배경색상</label>
      <input
        type="text"
        name="back"
        v-model="styles.back"
        placeholder="배경색상을 입력해주세요"
      />
      <label>폰트크기</label>
      <input
        type="text"
        name="fontSize"
        v-model="styles.fontSize"
        placeholder="폰트크기를 입력해주세요"
      />
      <label>폰트색상</label>
      <input
        type="text"
        name="fontColor"
        v-model="styles.fontColor"
        placeholder="폰트색상을 입력해주세요"
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
        fontSize: styles.fontSize + 'px',
        color: styles.fontColor,
      }"
      class="Container"
    >
      <div class="imgContainer" v-if="mode !== 'crop'">
        <img :src="img" alt="" @error="handleError" />
      </div>
      <!-- crop -->
      <div class="imgContainer" v-if="mode === 'crop'">
        <svg
          id="_레이어_1"
          data-name="레이어 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 440.32 640"
        >
          <defs>
            <pattern
              id="svgBg"
              patternUnits="userSpaceOnUse"
              width="440.32"
              height="640"
            >
              <image :href="img" width="440.32" height="640" />
            </pattern>
          </defs>
          <polygon
            fill="url(#svgBg)"
            points="440.32 0 428.73 12.02 417.15 0 405.57 12.02 393.98 0 382.41 12.02 370.82 0 359.24 12.02 347.66 0 336.08 12.02 324.5 0 312.92 12.02 301.34 0 289.76 12.02 278.18 0 266.61 12.02 255.03 0 243.45 12.02 231.88 0 220.3 12.02 208.72 0 197.14 12.02 185.56 0 173.98 12.02 162.4 0 150.83 12.02 139.25 0 127.67 12.02 116.09 0 104.51 12.02 92.94 0 81.36 12.02 69.78 0 58.2 12.02 46.63 0 35.05 12.02 23.47 0 11.9 12.02 .32 0 .32 171.45 0 171.45 0 640 11.58 627.98 23.15 640 34.73 627.98 46.3 640 57.88 627.98 69.46 640 81.04 627.98 92.61 640 104.19 627.98 115.77 640 127.35 627.98 138.93 640 150.5 627.98 162.08 640 173.66 627.98 185.24 640 196.82 627.98 208.4 640 219.98 627.98 231.56 640 243.13 627.98 254.71 640 266.29 627.98 277.86 640 289.44 627.98 301.02 640 312.6 627.98 324.18 640 335.76 627.98 347.34 640 358.92 627.98 370.5 640 382.09 627.98 393.66 640 405.24 627.98 416.83 640 428.41 627.98 440 640 440 549.03 440.32 549.03 440.32 0"
          />
        </svg>
      </div>
      <!-- ticket ver -->
      <div
        class="ticketContainer"
        v-if="mode === 'ticket'"
        :style="{
          backgroundColor: styles.back,
        }"
      >
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
      <div
        class="squareContainer"
        v-if="mode === 'square'"
        :style="{
          backgroundColor: styles.back,
        }"
      >
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
      img: "",
      title: "",
      info: "",
      rating: 0,
      review: "",
      keywordItem: "",
      keywords: [],
      styles: {
        gap: 0,
        back: "#ededed",
        fontSize: 25,
        fontColor: "#000000",
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
    handleError() {
      this.img = "/post_none.png";
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
  gap: 10px;
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

.input {
  width: 400px;
  height: 15px;
  padding: 10px;
  background-color: #d8d8d8;
  border: 0;
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

label {
  font-weight: 700;
}

nav > input {
  width: 100px;
  height: 25px;
  padding: 5px;
  background-color: #d8d8d8;
  border: 0;
  border-radius: 5px;
}

.Container {
  display: flex;
}
.ticketContainer,
.imgContainer {
  width: 400px;
  height: 600px;
}

.imgContainer {
  width: 440px;
  height: 640px;
  overflow: hidden;
}
.imgContainer > img {
  background-size: cover;
  background-clip: content-box;
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
