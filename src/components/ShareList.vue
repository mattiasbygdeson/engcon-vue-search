<template>
  <div class="share-modal__wrapper">
    <article class="share-modal__container">
      <header class="share-modal__header">
        <h2>Dela</h2>

        <i @click="$emit('toggle-share-modal')" class="icon fas fa-times icon-big" />
      </header>

      <main class="share-modal__content">
        <form action>
          <label for="input-email">Mottagarens e-postadress</label>
          <input id="input-email" type="email" />

          <label for="input-subject">Ämne</label>
          <input id="input-subject" type="text" v-model="mailSubject" />

          <label for="input-message">Meddelande</label>
          <textarea
            id="input-message"
            name="input-message"
            cols="30"
            rows="10"
            :placeholder="messagePlaceholder"
          />

          <button class="button-submit" type="submit">Skicka</button>
        </form>

        <section class="input-copy">
          <label for="input-url">URL</label>
          <input id="input-url" type="text" :value="favoriteListUrl" />
          <button @click="generateShareableUrl" class="button-copy">Generera</button>
        </section>
      </main>
    </article>
  </div>
</template>

<script>
export default {
  name: "ShareList",
  data() {
    return {
      receiversEmail: "",
      mailSubject: "Min lista",
      messagePlaceholder:
        "Hej, följ länken i detta mail och kika på mina favoritprodukter hos Engcon!",
      favoriteListUrl: "",
      urlCopied: false
    };
  },
  created() {
    // this.generateShareableUrl();
  },
  props: {
    favorites: Array
  },
  methods: {
    generateShareableUrl() {
      var baseUrl = window.location.hostname + this.$route.fullPath;
      var hash = this.$route.hash;
      var baseUrlCleaned = baseUrl.replace(hash, '');
      var listName = this.mailSubject.toLowerCase();
      var listNameDashed = listName.replace(/ /g, "-");
      var urlBody = "";

      for (var i = 0; this.favorites.length > i; i++) {
        urlBody += "&id=" + this.favorites[i].id;
      }

      this.favoriteListUrl = baseUrlCleaned + "?name=" + listNameDashed + urlBody;
    },

    copyUrl() {
      this.urlCopied = true;
      navigator.clipboard.writeText(this.favoriteListUrl);
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
    height: 495px;
    width: 521px;
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
      position: relative;
      top: -30px;

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
      height: 117px;
      position: relative;
      top: -54px;
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
}
</style>