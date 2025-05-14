<section>
    <h2>Titre Carrousel</h2>
    <div class="carrousel-container">
        <button class="chevron-left" on:click={() => moveSlide(-1)}>&#8249;</button>
        <div class="carrousel">
            <div class="carrousel-item">
                <div>
                    <img src="/images/film1.jpg" alt="Affiche du film" class="hero-image" />
                </div>
                <div>
                    <h3>Titre Film 1</h3>
                </div>
            </div>
            <div class="carrousel-item">
                <div>
                    <img src="/images/film1.jpg" alt="Affiche du film" class="hero-image" />
                </div>
                <div>
                    <h3>Titre Film 2</h3>
                </div>
            </div>
            <div class="carrousel-item">
                <div>
                    <img src="/images/film1.jpg" alt="Affiche du film" class="hero-image" />
                </div>
                <div>
                    <h3>Titre Film 3</h3>
                </div>
            </div>
            <div class="carrousel-item">
                <div>
                    <img src="/images/film1.jpg" alt="Affiche du film" class="hero-image" />
                </div>
                <div>
                    <h3>Titre Film 4</h3>
                </div>
            </div>
            <div class="carrousel-item">
                <div>
                    <img src="/images/film1.jpg" alt="Affiche du film" class="hero-image" />
                </div>
                <div>
                    <h3>Titre Film 5</h3>
                </div>
            </div>
        </div>
        <button class="chevron-right" on:click={() => moveSlide(1)}>&#8250;</button>
    </div>
</section>

<style>
    section {
        padding: 20px;
    }

    h2 {
        padding-left: 20px;
    }

    .carrousel-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .carrousel {
        display: flex;
        overflow-x: scroll;
        gap: 10px;
        scroll-behavior: smooth;
    }

    .carrousel-item {
        flex: 0 0 auto;
        width: 150px;
        height: 250px;
        background-color: #ddd;
        border-radius: 10px;
        position: relative;
        padding: 10px;
        box-sizing: border-box;
        transition: filter 0.3s ease-in-out;
    }

    .carrousel-item img {
        width: 100%;
        height: 70%;
        object-fit: cover;
        border-radius: 8px;
    }

    .carrousel-item h3 {
        margin-top: 10px;
        text-align: center;
    }

    .carrousel-item:first-child {
        box-shadow: inset 10px 0 20px -10px rgba(0, 0, 0, 0.5);
    }

    .carrousel-item:last-child {
        box-shadow: inset -10px 0 20px -10px rgba(0, 0, 0, 0.5);
    }

    /* Chevron buttons */
    .chevron-left, .chevron-right {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        padding: 10px;
        cursor: pointer;
        z-index: 1;
    }

    .chevron-left {
        left: 10px;
    }

    .chevron-right {
        right: 10px;
    }

    .chevron-left:disabled, .chevron-right:disabled {
        display: none;
    }

    /* Styles responsive */
    @media (min-width: 768px) {
        .carrousel-item {
            width: 200px;
            height: 300px;
        }
    }

    @media (min-width: 1024px) {
        .carrousel-item {
            width: 250px;
            height: 350px;
        }
    }
</style>

<script>
    let currentIndex = 0;

    function moveSlide(direction) {
        const items = document.querySelectorAll('.carrousel-item');
        const totalItems = items.length;
        currentIndex += direction;

        if (currentIndex < 0) currentIndex = totalItems - 1;
        if (currentIndex >= totalItems) currentIndex = 0;

        document.querySelector('.carrousel').scrollTo({
            left: currentIndex * (items[0].offsetWidth + 10),
            behavior: 'smooth'
        });

        toggleChevronVisibility();
    }

    function toggleChevronVisibility() {
        const items = document.querySelectorAll('.carrousel-item');
        const totalItems = items.length;
        const leftChevron = document.querySelector('.chevron-left');
        const rightChevron = document.querySelector('.chevron-right');

        leftChevron.disabled = currentIndex === 0;
        rightChevron.disabled = currentIndex === totalItems - 1;
    }
</script>