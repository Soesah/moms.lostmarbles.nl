<template>
  <section class="box box--tertiary">
    <form @submit.prevent="submit">
      <h2>Welkom</h2>
      <p class="description">Om gebruik te kunnen maken van Mom's Lost Marbles dient u in te loggen.</p>
      <div class="form-item">
        <label for="focus">Naam</label>
        <input type="text" name="user-name" id="focus" value placeholder="(naam)">
      </div>
      <!--<div class="form-item">
        <label></label>
        <input type="checkbox" id="remember" name="remember" value="remember" class="checkbox">
        <label for="remember">Onthouden</label>
      </div>-->
      <div class="form-buttons">
        <label></label>
        <button type="submit">Inloggen</button>
      </div>
      <p class="description">
        Deze website gaat over en gebruikt
        <i>cookies</i>. Door 'onthouden' aan te vinken stopt u uw hand in de koekjestrommel.
      </p>
    </form>
  </section>
</template>
<script>
export default {
  name: 'Login',
  methods: {
    submit() {},
  },
};
</script>
