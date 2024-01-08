import { defineStore } from "pinia";
import { backend } from "../lib/backend";
import { Category, ProductCounts } from "../lib/types";

function calcCatCounts(
  cats: Category[],
  counts: ProductCounts[],
  root: number
): number {
  let myTotal = cats
    .filter((c) => c.parent_id == root && c.id)
    .map((c) => {
      return (c.productCount =
        (counts.find((co) => co.cid == c.id)?.c || 0) +
        calcCatCounts(cats, counts, c.id));
    })
    .reduce((t, i) => (t += i), 0);
  return myTotal;
}

export const useCategoryStore = defineStore("categories", {
  state: (): { cats: Category[]; status: string } => ({
    cats: [],
    status: "will load",
  }),
  getters: {
    getCats: function (): Category[] {
      return this.cats;
    },
  },
  actions: {
    async refresh() {
      let [cats, productCounts]: [Category[], ProductCounts[]] =
        await Promise.allSettled([
          backend.categories.getAll(),
          backend.categories.productCount(),
        ]).then((r) => [
          r[0].status == "fulfilled" ? r[0].value : [],
          r[1].status == "fulfilled" ? r[1].value : [],
        ]);
      calcCatCounts(cats, productCounts, 0);
      // calcCatCounts dont calculate root element
      let root = cats.find((c) => c.id == 0);
      if (root)
        root.productCount = productCounts.reduce((t, i) => (t += i.c ?? 0), 0);
      this.$patch({ cats });
      this.status = "loaded";
    },
    getParents(id: number): Category[] {
      let me = this.cats.find((cat) => cat.id == id);
      if (!id || !me) return [];
      return [...this.getParents(me.parent_id), me];
    },
    getChildren(id: number): Category[] {
      return this.cats.filter((cat) => cat.parent_id == id);
    },
  },
});
