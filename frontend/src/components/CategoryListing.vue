<script setup lang="ts">
import { Category } from '../lib/types'; 
const { categories, root } = defineProps<{ categories: Category[], root:number }>()
const emit = defineEmits(['select'])
let subCategories = categories.filter(cs => cs.parent_id == root)

</script>
<template>  
  <div v-if="subCategories.length" v-for="cat in subCategories" :key="cat.id" class="pl1"> 
    <div class="flex"     >
    <a @click="$emit('select', cat)" >{{cat.name}}  </a> <i>{{ cat.productCount || 0 }}</i>
  </div>
    <CategoryListing v-if="cat.id" :categories="categories" :root="cat.id" @select="(cat)=>$emit('select', cat)" /> 
  </div> 
</template>