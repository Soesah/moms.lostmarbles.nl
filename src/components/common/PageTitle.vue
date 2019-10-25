<template>
  <header>
    <section class="title">
      <h1>
        Moms Lost Marbles
        <version></version>
      </h1>
      <p class="tagline">Recepten van de familie Giesberts, Drost, Weber en anderen</p>
    </section>
  </header>
</template>
<script>
import Version from '@/components/common/Version.vue';

export default {
  name: 'PageTitle',
  components: {
    Version,
  },
};
</script>
