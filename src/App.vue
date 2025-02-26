
<template>
  <Container />
</template>

<script>
import Container from './components/Container.vue';
export default {
  components: {
    Container
  },
  data() {
    return {
      isOpen: false,
      search: null,
      suggestions: []
    }
  },
  methods: {
    searchMovies() {
      if (this.search.trim()) {
        this.$store.dispatch('searchMovie', this.search)
      }
    },
    searchKeywords() {
      if (this.search.trim().length > 2) {
        this.fetchSuggestions(this.search)
      } else {
        this.suggestions = []
				this.searchMovies()
      }
    },
    async fetchSuggestions(query) {
      const url = `https://api.themoviedb.org/3/search/keyword?query=${query}&page=1`
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWZiNTgzNzYyNmQyYzRkMjJlMjNmNzE3YjM5YmUzMyIsIm5iZiI6MTczOTE5NzU3Ny4wMTgsInN1YiI6IjY3YWEwYzg5MmZiYWM0MGI5MDkzODA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hvgEcOYVp_rI_GRdp2YJiPhH0LnOORb1wvDflDdAWrQ'
        }
      }

      try {
        const response = await fetch(url, options)
        const data = await response.json()
        
        if (data && data.results) {
          this.suggestions = data.results
        } else {
          console.error('No results found in API response.')
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error)
      }
    },

    selectSuggestion(suggestion) {
      this.search = suggestion.name
			this.searchMovies()
      this.suggestions = []
    }
  },
}
</script>

<style scoped>

</style>
