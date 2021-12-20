<template>
  <div class="text-subtitle-2 mr-3">
      {{ date }} - {{ time}}
  </div>
</template>

<script>
export default {
    data() {
        return {
            date: '',
            time: ''
        }
    },
    methods: {
        getDate() {
            const d = new Date()
            const t = new Date()
            this.date = d.toLocaleDateString()
            this.time = t.toLocaleTimeString()
            setTimeout(this.getDate, 1000)
        },
    },
    mounted() {
        this.getDate()
    }
}
</script>

<style>

</style>