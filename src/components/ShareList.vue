<template>
  <div class="share-modal__wrapper">
    <article class="share-modal__container">
      <header class="share-modal__header">
        <h2>{{translatedStrings.share}}</h2>

        <i @click="$emit('toggle-share-modal')" class="icon fas fa-times icon-big" />
      </header>

      <main class="share-modal__content">
        <form v-on:submit.prevent="sendEmail">
          <label for="input-email">{{translatedStrings.emailRecipients}}</label>
          <input id="input-email" type="email" v-model="recipent" />

          <label for="input-subject">{{translatedStrings.emailSubject}}</label>
          <input id="input-subject" type="text" v-model="messageSubject" />

          <label for="input-message">{{translatedStrings.emailMessage}}</label>
          <textarea
            v-model="messageBody"
            id="input-message"
            name="input-message"
            cols="30"
            rows="10"
          />

          <label for="input-name">{{translatedStrings.emailYourName}}</label>
          <input id="input-name" class="input-name" type="text" v-model="sender" />

          <button class="button-submit" type="submit">{{translatedStrings.emailSend}}</button>
        </form>

        <section class="input-copy">
          <label for="input-url">URL</label>

          <input
            id="input-url"
            class="input-copyurl"
            type="text"
            :value="favoriteListUrl"
            @click="copyUrl"
            disabled
          />          

          <button @click="generateShareableUrl" class="button-copy">{{translatedStrings.emailShowURL}}</button>
          <span @click="copyUrl" class="clickable-surface"></span>

          <p class="notification" v-if="urlCopied">{{translatedStrings.emailCopyNote}}</p>          
        </section>
      </main>
    </article>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShareList",
  data() {
    return {
      recipent: "",
      sender: "",
      messageSubject: "Engcon product list",
      messageBody:
        "Please follow the link attached in this e-mail to see a list of Engcon products that I have selected.",
      favoriteListUrl: "",
      urlCopied: false
    };
  },
  props: {
    favorites: Array,
    translatedStrings: Object,
  },
  methods: {
    generateShareableUrl() {
      var baseUrl = window.location.hostname + this.$route.fullPath;
      var hash = this.$route.hash;
      var baseUrlCleaned = baseUrl.replace(hash, "");
      var listName = this.messageSubject.toLowerCase();
      var listNameDashed = listName.replace(/ /g, "-");
      var urlBody = "";

      for (var i = 0; this.favorites.length > i; i++) {
        urlBody += "&id=" + this.favorites[i].id;
      }

      this.favoriteListUrl =
        baseUrlCleaned + "?name=" + listNameDashed + urlBody;
    },

    copyUrl() {
      this.urlCopied = true;
      navigator.clipboard.writeText(this.favoriteListUrl);
    },

    sendEmail() {
      if (!this.recipent || !this.sender || !this.messageSubject || !this.messageBody) {
        alert("Please fill in all the fields in the form");
        return;
      }

      this.generateShareableUrl();

      var regex = /(<([^>]+)>)/ig

      this.messageBody = this.messageBody.replace(regex, "");
      this.sender = this.sender.replace(regex, "");

      const msg = "<p>" + this.messageBody + "</p>";
      const link = "<p><a href=" + this.favoriteListUrl + ">" + this.favoriteListUrl +"</a></p>";
      const signoff = "<p>- " + this.sender + "</p>";

      axios
        .post("http://engcon.utv/rest-api/mail/sendMail", {
          mailData: {
            subject: this.messageSubject,
            message: msg + link + signoff,
            html: true,
            reciepient: this.recipent
          },
        })
        .then(function(response) {
          //eslint-disable-next-line no-console
          console.log(response);
          alert(response.data.message);
        })
        .catch(function(error) {
          //eslint-disable-next-line no-console
          console.log(error);
        });
    },

    sanitize(event) {
      event.preventDefault();
      const html = this.$sanitize(event.clipboardData.getData("text/html"));

      document.execCommand("insertHTML", false, html);
    }
  }
};
</script>

<style lang="scss" scoped>
.share-modal {
  &__button {
    position: relative;
    top: -14px;
    background: #ffd300;
    border: 0;
    font-size: 0.85em;
    padding: 0 20px 0 20px;
    box-shadow: 0 0 0 6px #ffd300;
    margin-right: 28px;

    &:hover {
      cursor: pointer;
    }
  }

  &__wrapper {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    background: rgba(0, 0, 0, 0.3);
  }

  &__container {
    background: white;
    width: 521px;
    height: 560px;
    margin: auto;
    margin-top: 15vh;
    border-radius: 3px;
    box-shadow: 16px 16px 20px rgba(0, 0, 0, 0.2);
  }

  &__header {
    background: #ffd300;
    padding: 0;
    margin: 0;
    height: 50px;
    padding: 8px 20px;
    display: grid;
    grid-template-columns: auto auto;

    i {
      text-align: right;
      margin-left: 25px;
    }

    h2 {
      font-weight: 800;
      font-size: 1.2em;
      padding-top: 3px;
    }
  }

  &__content {
    max-height: 550px;
    padding: 2%;

    label {
      display: block;
    }

    input {
      display: block;
      margin-bottom: 14px;
      height: 41px;
      border-radius: 2px;
      border: 0;
      background: #e7e5e1;
      width: 80%;
      padding-left: 10px;
    }

    textarea {
      margin-bottom: 14px;
      background: #e7e5e1;
      min-width: 80%;
      max-width: 80%;
      min-height: 117px;
      max-height: 117px;
      border: 0;

      padding: 10px;
    }

    .input-copy {
      border-top: 1px solid #c4c4c4;
      padding-top: 20px;
      // position: relative;
      // top: -30px;

      input {
        display: inline;
      }
    }

    button {
      margin-left: 10px;
      width: 18%;
      background: #fdd300;
      border: 0;
      border-radius: 2px;

      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }

    .button-submit {
      // height: 117px;
      position: absolute;
      height: 41px;
      width: 89px;
      // top: -54px;
    }

    .input-name {
      display: inline;
    }

    .button-copy {
      height: 41px;
    }
  }
}

@keyframes fadein-fadeout {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.notification {
  animation-name: fadein-fadeout;
  animation-duration: 0.5s;
  position: relative;
  top: -40px;
}

.share-modal__content {
  input {
    font-family: "Courier New", Courier, monospace;
    color: rgb(26, 27, 29);
    font-size: 0.95em;
  }

  textarea {
    font-family: "Courier New", Courier, monospace;
    color: rgb(26, 27, 29);
    font-size: 0.95em;
  }

  ::placeholder {
    font-family: "Courier New", Courier, monospace;
    color: rgb(134, 138, 143);
    font-size: 1.1em;
  }
}

.input-copyurl {
  color: rgb(134, 138, 143) !important;
}

.clickable-surface {
  background: #e7e5e1;
  opacity: 0;
  display: block;
  width: 400px;
  height: 41px;
  top: -57px;
  position: relative;

  &:hover {
    cursor: pointer;
    opacity: 0.3;
  }
}
</style>