<script>
    import { transformMinutesToHours, convertScore, formatDateFR, getScoreColor } from "$lib/globalFunction.js";
    import { createEventDispatcher } from 'svelte';
    export let movie = {
        title: "",
        year: 2025,
        date: "",
        duration: "",
        genres: [],
        score: 0,
        synopsis: "",
        poster: ""
    };
    const dispatch = createEventDispatcher();
</script>

<div class="film-hero">
    <div class="hero-content">
        <!-- Affiche du film -->
        <div class="poster-container">
            <img src={movie.poster} alt={movie.title} class="poster" />
        </div>

        <!-- Informations du film -->
        <div class="film-info">
            <!-- Titre et date -->
            <div class="header">
                <h1 class="title">{movie.title} <span class="year">({movie.year})</span></h1>
                <div class="release-date">{formatDateFR(movie.date)}</div>
            </div>

            <!-- Durée et genres -->
            <div class="meta-info flex justify-between">
                <div>
                    <span class="duration">{transformMinutesToHours(movie.duration)}</span>
                    {#each movie.genres as genre}
                        <span class="genre">{genre}</span>
                    {/each}
                </div>
                <div>
                    <button class="trailer-btn" on:click={() => dispatch('showTrailers')}>
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M6.271 5.055a.5.5 0 0 1 .52.038L11 7.055a.5.5 0 0 1 0 .89L6.791 9.907a.5.5 0 0 1-.791-.39V5.5a.5.5 0 0 1 .271-.445z"/>
                        </svg>
                        Voir les bandes-annonces
                    </button>
                </div>
            </div>

            <!-- Score et synopsis -->
            <div class="score-synopsis">
                <!-- Score circulaire -->
                <div class="score-container">
                    <div class="score-circle">
                        <svg width="80" height="80" class="score-svg">
                            <circle cx="40" cy="40" r="35" fill="none" stroke="#444" stroke-width="6"/>
                            <circle
                                cx="40" cy="40" r="35"
                                fill="none"
                                stroke={getScoreColor(convertScore(movie.score))}
                                stroke-width="6"
                                stroke-dasharray="220"
                                stroke-dashoffset={220 - (220 * convertScore(movie.score) / 100)}
                                stroke-linecap="round"
                                class="score-progress"
                            />
                        </svg>
                        <span class="score-text">{convertScore(movie.score)}%</span>
                    </div>
                    <div class="score-label">
                        Score<br>d'évaluation
                    </div>
                </div>

                <!-- Synopsis -->
                <div class="synopsis">
                    <h3 class="synopsis-title">Synopsis</h3>
                    <p class="synopsis-text">{movie.synopsis}</p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .film-hero {
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        border-radius: 20px;
        padding: 24px;
        margin-bottom: 32px;
        color: white;
    }

    .hero-content {
        display: flex;
        gap: 24px;
        align-items: flex-start;
    }

    .poster-container {
        flex-shrink: 0;
    }

    .poster {
        width: 200px;
        height: 300px;
        object-fit: cover;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    }

    .film-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 12px;
    }

    .title {
        font-size: 2.5rem;
        font-weight: bold;
        margin: 0;
        line-height: 1.2;
    }

    .year {
        color: #aaa;
        font-weight: normal;
    }

    .release-date {
        font-size: 1rem;
        color: #ccc;
        white-space: nowrap;
    }

    .meta-info {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
    }

    .duration {
        color: #ccc;
        font-size: 0.9rem;
    }

    .genre {
        background-color: #444;
        color: white;
        padding: 4px 12px;
        border-radius: 16px;
        font-size: 0.85rem;
        font-weight: 500;
        margin-left: 5px;
        margin-right: 5px;
    }

    .trailer-btn {
        background-color: #F51010;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: background-color 0.3s ease;
    }

    .trailer-btn:hover {
        background-color: #d40d0d;
    }

    .score-synopsis {
        display: flex;
        gap: 24px;
        align-items: flex-start;
    }

    .score-container {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-shrink: 0;
    }

    .score-circle {
        position: relative;
        width: 80px;
        height: 80px;
    }

    .score-svg {
        transform: rotate(-90deg);
    }

    .score-progress {
        transition: stroke-dashoffset 0.5s ease;
    }

    .score-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.2rem;
        font-weight: bold;
        color: white;
    }

    .score-label {
        font-size: 1rem;
        color: white;
        font-weight: 500;
        line-height: 1.3;
    }

    .synopsis {
        flex: 1;
    }

    .synopsis-title {
        color: #F51010;
        font-size: 1.25rem;
        font-weight: bold;
        margin: 0 0 12px 0;
    }

    .synopsis-text {
        color: #ddd;
        line-height: 1.6;
        margin: 0;
        font-size: 0.95rem;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .film-hero {
            padding: 16px;
        }

        .hero-content {
            flex-direction: column;
            text-align: center;
        }

        .poster {
            width: 160px;
            height: 240px;
            margin: 0 auto;
        }

        .header {
            justify-content: center;
            text-align: center;
        }

        .title {
            font-size: 1.8rem;
        }

        .meta-info {
            justify-content: center;
        }

        .score-synopsis {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
    }

    @media (max-width: 480px) {
        .title {
            font-size: 1.5rem;
        }

        .meta-info {
            flex-direction: column;
            gap: 8px;
        }
    }
</style> 