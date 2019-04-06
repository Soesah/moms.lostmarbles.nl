<template>
  <section class="box box--tertiary">
    <form action="/actions/login.php" method="post" @submit.prevent="submit">
      <h2>Welkom</h2>
      <p class="description">Om gebruik te kunnen maken van Mom's Lost Marbles dient u in te loggen.</p>
      <input type="hidden" name="id" value>
      <input type="hidden" name="request" value>
      <div class="form-item">
        <label for="focus">Naam</label>
        <input type="text" name="user-name" id="focus" value placeholder="(naam)">
      </div>
      <div class="form-item">
        <label for="remember">Onthouden</label>
        <input type="checkbox" id="remember" name="remember" value="remember" class="checkbox">
      </div>
      <div class="form-buttons">
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
