<template>
  <div class="artist-details">
    <h1>{{artist.name}}</h1>
    <h2>Country: {{artist.country}}</h2>
    <h2>
      {{selectedAlbum ? `Album: ${selectedAlbum.title} (${selectedAlbum.date})` : 'Albums:'}}
      <a
        v-if="selectedAlbum"
        href
        @click="handleGoBack"
      >Go back</a>
    </h2>
    <ul v-if="!selectedAlbum">
      <li v-for="(release, index) in artist.releases" :key="`${index}-${release}`">
        <a href @click="handleAlbumClick">{{`${release.title} (${release.date})`}}</a>
      </li>
    </ul>
    <h2 v-if="selectedAlbum">Tracks:</h2>
    <ul v-if="selectedAlbum">
      <li v-for="track in selectedAlbum.media[0].tracks || []" :key="track.title">{{track.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ArtistDetails",
  props: ["artist"],
  data() {
    return { selectedAlbum: null };
  },
  methods: {
    handleAlbumClick(e) {
      e.preventDefault();
      this.selectedAlbum = this.artist.releases.find(
        ({ title, date }) => e.target.text === `${title} (${date})`
      );
    },
    handleGoBack(e) {
      e.preventDefault();
      this.selectedAlbum = null;
    }
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 5px;
}

h2 {
  margin-top: 5px;
  margin-bottom: 5px;
}

.artist-details {
  text-align: left;
}
</style>