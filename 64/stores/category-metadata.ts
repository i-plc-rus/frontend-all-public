export const useCategoryMetadataStore = defineStore('categoryMetadata', () => {
  const runtimeConfig = useRuntimeConfig();
  const { locale } = useI18n();

  // category metadata is fetched only once because it doesn't depend on computed params
  const { data, status } = useFetch('category-metadata', {
    baseURL: runtimeConfig.public.apiBase,
    deep: false,
    headers: {
      'Accept-Language': locale.value
    },
    params: {
      _sort: 'text'
    }
  });
  const categoryMetadata = computed(
    () => (data.value ?? []) as CategoryMetadata[]
  );
  const categoryMetadataById = computed(() => {
    const result = new Map<string, CategoryMetadata>();
    for (const category of categoryMetadata.value) {
      result.set(category.id, category);
    }
    return result;
  });
  return {
    categoryMetadata,
    categoryMetadataById,
    loading: computed(() => status.value === 'pending')
  };
});

export interface CategoryMetadata {
  id: string;
  text: string;
  iconUrl: string;
}
