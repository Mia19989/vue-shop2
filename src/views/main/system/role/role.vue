<template>
  <div class="role">
    <page-search :searchFromConfig="searchFromConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'

import { contentTableConfig } from './config/content.config'
import { searchFromConfig } from './config/search.config'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch
  },

  setup() {
    return {
      contentTableConfig,
      searchFromConfig
    }
  }
})
</script>

<style scoped></style>
