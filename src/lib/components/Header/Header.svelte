<script>
    import { page } from '$app/stores';
    $: currentPath = $page.url.pathname;
  </script>

<header>
    <nav class="navbar">
        <div class="navbar-left">
            <a href="/" class="logo">Ciné+</a>
        </div>
        <ul class="navbar-center">
            <li>
              <a href="/popular" class:active={currentPath === "/popular"}>Populaire</a>
            </li>
            <li>
              <a href="/current" class:active={currentPath === "/current"}>Du moment</a>
            </li>
            <li>
              <a href="/soon" class:active={currentPath === "/soon"}>À venir</a>
            </li>
          </ul>
        <div class="navbar-right">
            <input type="text" class="search-input" placeholder="Rechercher un film...">
        </div>
    </nav>
</header>

<style>
    header {
    width: 100%;
    background-color: transparent;
    padding: 10px 50px;
    color: white;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative; 
}

.navbar-left .logo {
    font-size: 32px;
    font-weight: bold;
    background: linear-gradient(to right, #F51010 0%, #8F0909 76%, #8F0909 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    text-decoration: none;
}

.navbar-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
}

.navbar-center li a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s, opacity 0.3s;
}

.navbar-center li a.active {
    color: #F51010;
}

.navbar-center li a:hover:not(.active) {
    color: #F51010;
}

.navbar-center:has(a:hover) a.active:not(:hover) {
    opacity: 0.5;
}

.navbar-right .search-input {
    width: 250px; 
    height: 30px;
    padding: 10px 15px;
    border-radius: 50px; 
    border: 2px solid transparent; 
    font-size: 16px;
    background-color: #333;
    color: white;

    transition: border-color 0.3s, background-color 0.3s;
}

.navbar-right .search-input::placeholder {
    color: #bbbbbb; 
    opacity: 1; 
}

.navbar-right .search-input:focus {
    outline: none;
    background-color: #444;
    box-shadow: 0 0 0 3px rgba(8, 8, 8, 0.3);
}
</style>