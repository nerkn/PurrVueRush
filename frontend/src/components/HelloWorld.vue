<script setup lang="ts">
import { ref } from 'vue'
import { Category } from '../lib/types'; 
import CategoryListing from './CategoryListing.vue';
import ProductList from './ProductList.vue';
import CategoryEdit from './CategoryEdit.vue';
import { useCategoryStore } from '../stores/categories'  


let newCat: Category = {
  id: 0,
  name: "Name",
  picture: "",
  parent_id: 0,
  created_at: new Date(),
  updated_at:new Date()
}

const catstore = useCategoryStore()
catstore.refresh();
const catSelected = ref<Category>() 
 

</script>

<template>
  <div class="flex gap">
    <div v-if="catstore.cats.length" class="CategoryListing">
    <h2>Categories</h2>
        <CategoryListing :categories="catstore.cats" :root="0" @select="(cat)=>catSelected=cat"   />
        <a @click="()=>catSelected=newCat">New Category</a>
    </div>
    <Suspense>
      <div v-if="catSelected">
        <CategoryEdit :category="catSelected"  :categories="catstore.cats" />  
        <ProductList :category="catSelected"  />
      </div>
    </Suspense>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
