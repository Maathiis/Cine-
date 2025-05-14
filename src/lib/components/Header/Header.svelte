<script>
    import { page } from '$app/stores';
    import { fade, slide } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let showMenu = false;
    let showSearchBar = false;

    $: currentPath = $page.url.pathname;

    function handleLinkClick() {
      showMenu = false;
    }

    function toggleSearch() {
      showSearchBar = !showSearchBar;
      if (showSearchBar) {
        showMenu = false;
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    function closeSearch() {
      showSearchBar = false;
      document.body.style.overflow = '';
    }

    let query = '';

    function handleKeyDown(event) {
      if (event.key === 'Enter' && query.trim() !== '') {
        goto(`/search?query=${encodeURIComponent(query)}`);
        closeSearch();
      }
    }

    onMount(() => {
      const handleScroll = () => {
        if (showMenu) {
          showMenu = false;
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    });

  </script>

  <header class="w-full px-5 py-3 z-50 relative bg-black">
    <!-- Mobile Header -->
    <nav class="md:hidden flex items-center justify-between">
      <button
        class="text-white focus:outline-none transition-all duration-300 transform p-1"
        on:click={() => showMenu = !showMenu}
        aria-label="Menu"
      >
        <div class="h-6 w-7 relative flex flex-col justify-center items-center">
          <span class="bg-white h-0.5 w-7 rounded absolute transition-all duration-300 ease-in-out"
                class:rotate-45={showMenu}
                class:translate-y-0={showMenu}
                class:-translate-y-2={!showMenu}></span>
          <span class="bg-white h-0.5 w-7 rounded absolute transition-all duration-300 ease-in-out"
                class:opacity-0={showMenu}></span>
          <span class="bg-white h-0.5 w-7 rounded absolute transition-all duration-300 ease-in-out"
                class:-rotate-45={showMenu}
                class:translate-y-0={showMenu}
                class:translate-y-2={!showMenu}></span>
        </div>
      </button>

      <a href="/" class="text-2xl font-bold bg-gradient-to-r from-[#F51010] to-[#8F0909] bg-clip-text text-transparent" on:click={handleLinkClick}>
        Ciné+
      </a>

      <button
        class="text-white focus:outline-none p-1"
        on:click={toggleSearch}
        aria-label="Rechercher"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>

    </nav>

    <!-- Mobile Search Bar -->
    {#if showSearchBar}
      <div class="fixed inset-0 bg-black z-50 flex items-center p-4"
           transition:fade={{ duration: 200 }}>
        <button class="text-white mr-3 focus:outline-none p-1"
                on:click={closeSearch}
                aria-label="Retour">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <input
          type="text"
          class="w-full bg-gray-900 text-white rounded-full py-2 px-4 focus:outline-none"
          placeholder="Rechercher un film..."
          autofocus
          bind:value={query}
          on:keydown={handleKeyDown}
        />
      </div>
    {/if}

    <!-- Mobile Menu - Plus d'espace entre le header et le menu -->
    {#if showMenu}
      <div
        class="fixed left-0 top-[56px] w-full bg-black/95 z-40 md:hidden border-t border-gray-800"
        transition:slide={{ duration: 300 }}
      >
        <ul class="flex flex-col p-5">
          <li class="py-3 border-b border-gray-800">
            <a
              href="/popular"
              class="text-white text-lg block transition-colors hover:text-[#F51010]"
              class:text-[#F51010]={currentPath === "/popular"}
              on:click={handleLinkClick}
            >
              Populaire
            </a>
          </li>
          <li class="py-3 border-b border-gray-800">
            <a
              href="/current"
              class="text-white text-lg block transition-colors hover:text-[#F51010]"
              class:text-[#F51010]={currentPath === "/current"}
              on:click={handleLinkClick}
            >
              Du moment
            </a>
          </li>
          <li class="py-3">
            <a
              href="/soon"
              class="text-white text-lg block transition-colors hover:text-[#F51010]"
              class:text-[#F51010]={currentPath === "/soon"}
              on:click={handleLinkClick}
            >
              À venir
            </a>
          </li>
        </ul>
      </div>
    {/if}

    <!-- Desktop Header -->
    <nav class="hidden md:flex items-center justify-between">
      <!-- Logo à gauche -->
      <div class="flex-1">
        <a href="/" class="text-3xl font-bold bg-gradient-to-r from-[#F51010] to-[#8F0909] bg-clip-text text-transparent">
          Ciné+
        </a>
      </div>

      <!-- Liens au milieu -->
      <div class="flex-1 flex justify-center">
        <ul class="flex items-center space-x-8 group">
          <li>
            <a
              href="/popular"
              class="text-white font-medium transition-all duration-300 hover:text-[#F51010] group-hover:[&:not(:hover)]:opacity-50"
              class:text-[#F51010]={currentPath === "/popular"}
            >
              Populaire
            </a>
          </li>
          <li>
            <a
              href="/current"
              class="text-white font-medium transition-all duration-300 hover:text-[#F51010] group-hover:[&:not(:hover)]:opacity-50"
              class:text-[#F51010]={currentPath === "/current"}
            >
              Du moment
            </a>
          </li>
          <li>
            <a
              href="/soon"
              class="text-white font-medium transition-all duration-300 hover:text-[#F51010] group-hover:[&:not(:hover)]:opacity-50"
              class:text-[#F51010]={currentPath === "/soon"}
            >
              À venir
            </a>
          </li>
        </ul>
      </div>

      <!-- Recherche à droite -->
      <div class="flex-1 flex justify-end">
        <div class="relative">
          <input
            type="text"
            class="w-[250px] bg-gray-800 text-white rounded-full py-2 px-4 focus:outline-none"
            placeholder="Rechercher un film..."
            bind:value={query}
            on:keydown={handleKeyDown}
          />
          <div class="absolute inset-y-0 right-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
</header>