<template>
  <div class="favorite-list__wrapper">
    <article class="favorite-list__container">
      <header class="favorite-list__header">
        <h2>{{replaceString(translatedStrings.favorites, favorites.length)}}</h2>

        <nav>
          <i @click="$emit('closeModal')" class="icon fas fa-times icon-big" />
        </nav>
      </header>

      <main class="favorite-list__content">
        <Favorite
          v-for="favorite in favorites"
          v-on:remove-favorite="$emit('remove-favorite', favorite)"
          :translatedStrings="translatedStrings"
          :key="favorite.id"
          :favorite="favorite"
          :baseurl="baseurl"
        />
      </main>

      <footer class="favorite-list__footer">
        <button class="button secondary" @click="$emit('clear-favorites')">{{this.translatedStrings.clear}}</button>
        <button class="button secondary" @click="$emit('toggle-share-modal')">{{this.translatedStrings.share}}</button>
        <button class="button primary" @click="$emit('toggle-offer-inquiry-modal')">{{this.translatedStrings.createOfferInquiry}}</button>
      </footer>
    </article>
  </div>
</template>

<script>
import Favorite from "./Favorite";

export default {
  name: "FavoriteList",
  components: {
    Favorite
  },
  props: {
    favorites: Array,
    translatedStrings: Object,
    baseurl: String,
  },
  methods: {
    replaceString(phrase, subject) {
      if(phrase !== undefined && subject !== undefined) {
        return phrase.replace("{{rep}}", subject);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.favorite-list {
  position: relative;

  &__button {
    position: relative;
    top: -14px;
    background: $color-primary;
    border: 0;
    font-size: 0.85em;
    padding: 0 20px 0 20px;
    box-shadow: 0 0 0 6px $color-primary;
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
    background: rgba($color-secondary, 0.5);
  }

  &__container {
    position: relative;
    background: white;
    width: 90%;
    max-width: 1000px;
    max-height: 625px;
    height: 100%;
    margin: auto;
    margin-top: 10vh;
    border-radius: 3px;
    box-shadow: 16px 16px 20px rgba($color-secondary, 0.2);
  }

  &__header {
    background: $color-primary;
    padding: 0;
    margin: 0;
    height: 50px;
    padding: 8px 20px;
    display: grid;
    grid-template-columns: auto 100px;

    nav {
      text-align: right;

      i {
        margin-left: 25px;
      }
    }

    h2 {
      font-weight: 800;
      font-size: 1.2em;
      margin-top: 4px;
    }
  }

  &__footer {
    position: absolute;
    width: 100%;
    background: white;
    text-align: right;
    bottom: 0;
    padding: 10px;
    border-top: 1px solid #ccc;
  }

  &__content {
    height: 81.5%;
    overflow-y: scroll;
  }

  &__product {
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
  }
}
</style>