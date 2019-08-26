<template>
  <div class="artist-search-container">
    <input
      class="search-input"
      v-model="searchValue"
      type="text"
      placeholder="Search for an artist..."
    />
    <button class="search-button" @click="handleOnSearch">Search</button>
    <artist-details v-if="artistDetails && !error" v-bind:artist="artistDetails" />
    <p class="red" v-if="error">Something went wrong: {{error}}</p>
  </div>
</template>

<script>
import gql from "graphql-tag";
import get from "lodash.get";
import { createRequest } from "urql";
import { pipe, subscribe } from "wonka";

import ArtistDetails from "./AritstDetails";

const query = gql`
  query SearchArtist($search: String!) {
    search {
      artists(query: $search, first: 1) {
        edges {
          node {
            name
            country
            releases(first: 10) {
              edges {
                node {
                  title
                  date
                  media {
                    format
                    trackCount
                    tracks {
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default {
  name: "AristSearch",
  components: {
    ArtistDetails
  },
  data() {
    return {
      searchValue: "",
      artistDetails: null,
      error: null
    };
  },
  methods: {
    handleOnSearch() {
      const request = createRequest(query, { search: this.searchValue });

      pipe(
        this.$urqlClient.executeQuery(request),
        subscribe(({ data, error }) => {
          if (error) {
            this.error = error;
            return;
          }

          const { name, country, releases } = get(
            data,
            "search.artists.edges[0].node",
            null
          );

          this.artistDetails = {
            name: name,
            country: country,
            releases: releases.edges.map(({ node }) => node)
          };
        })
      );
    }
  }
};
</script>

<style scoped>
.search-button {
  margin-left: 5px;
}

.search-input {
  height: 2em;
}

.error {
  color: red;
}
</style>
