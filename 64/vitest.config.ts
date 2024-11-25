import { defineVitestConfig } from '@nuxt/test-utils/config';
import { configDefaults } from 'vitest/config';

export default defineVitestConfig({
  test: {
    //e2e tests run using playwright directly, it's much more convenient
    exclude: [...configDefaults.exclude, 'test/e2e/*'],
    coverage: {
      provider: 'istanbul'
    }
  }
});
