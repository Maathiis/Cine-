<script>
  let nouveautes = [
    "Captain America: Brave New World",
    "Blanche Neige",
    "Mickey 17",
    "Novocaine"
  ];
  let liens = [
    { label: "Politique de confidentialités", href: "#" },
    { label: "Conditions générales", href: "#" },
    { label: "Mentions légales", href: "#" },
    { label: "Cookies", href: "#" }
  ];
  let partenaires = [
    "Pathé Gaumont",
    "UGC",
    "Kinépolis",
    "Cinéville"
  ];
</script>

<footer class="relative w-full bg-[#F51010] pt-12 pb-8 overflow-hidden">
  <!-- Ombre en haut (gradient linéaire noir vers rouge) -->
  <div class="absolute top-0 left-0 w-full h-16 pointer-events-none z-10"
       style="background: linear-gradient(to bottom, #000 0%, #F51010 100%);"></div>
  <!-- Contenu -->
  <div class="relative z-20 max-w-7xl mx-auto my-10 flex flex-col md:flex-row justify-between items-start gap-12 px-8">
    <!-- Logo -->
    <div class="flex-1 mb-8 md:mb-0">
      <span class="text-[64px] font-bold leading-none text-black">Ciné<span class="text-[#191919]">+</span></span>
    </div>
    <!-- Nouveautés -->
    <div class="flex-1">
      <h3 class="text-2xl font-bold text-black mb-3">Nouveautés à l'affiche</h3>
      <ul class="space-y-2">
        {#each nouveautes as film}
          <li class="text-white text-lg">{film}</li>
        {/each}
      </ul>
    </div>
    <!-- Liens utiles -->
    <div class="flex-1">
      <h3 class="text-2xl font-bold text-black mb-3">Liens utiles</h3>
      <ul class="space-y-2">
        {#each liens as lien}
          <li>
            <a href={lien.href} class="text-white text-lg hover:underline">{lien.label}</a>
          </li>
        {/each}
      </ul>
    </div>
    <!-- Partenaires -->
    <div class="flex-1">
      <h3 class="text-2xl font-bold text-black mb-3">Nos partenaires</h3>
      <ul class="space-y-2">
        {#each partenaires as partenaire}
          <li class="text-white text-lg">{partenaire}</li>
        {/each}
      </ul>
    </div>
  </div>
</footer>