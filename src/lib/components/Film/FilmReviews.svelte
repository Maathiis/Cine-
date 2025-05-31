<script>
    import { getStars, formatISODateFR } from "$lib/globalFunction.js";
    export let reviews;

    // État pour gérer l'expansion de chaque review
    let expandedReviews = {};

    function toggleExpand(reviewIndex) {
        expandedReviews[reviewIndex] = !expandedReviews[reviewIndex];
        // Force la réactivité
        expandedReviews = { ...expandedReviews };
    }

    function isContentLong(content) {
        // Estimation basique : plus de 400 caractères ou plus de 5 lignes approximatives
        return content.length > 400;
    }
</script>

<div class="film-reviews">
    <div class="reviews-container">
            <h1 class="relative text-2xl font-bold mb-0 w-fit">
                <span class="relative z-10 text-white py-2 px-4 inline-block">Réseaux</span>
                <span class="absolute -left-2 -bottom-1 top-2 bg-[#F51010] z-0 w-full h-2/3 rounded-lg -rotate-2"></span>
            </h1>
        
        <div class="reviews-grid">
            {#if reviews.length > 0}
                {#each reviews as review, index}
                    <div class="review-card">
                        <div class="review-header">
                            <div class="author-info">
                                <h3 class="author-name">{review.author}</h3>
                                <div class="rating">
                                    {#each getStars(review.author_details.rating) as filled}
                                        <svg 
                                            width="16" 
                                            height="16" 
                                            fill={filled ? '#FFD700' : '#666'} 
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                    {/each}
                                </div>
                            </div>
                            <div class="review-date">{formatISODateFR(review.created_at)}</div>
                        </div>
                        
                        <div class="review-content">
                            <p class="{expandedReviews[index] ? '' : 'line-clamp-5'}">{review.content}</p>
                            
                            {#if isContentLong(review.content)}
                                <button 
                                    class="expand-button"
                                    on:click={() => toggleExpand(index)}
                                >
                                    {expandedReviews[index] ? 'Voir moins' : 'Voir plus'}
                                </button>
                            {/if}
                        </div>
                    </div>
                {/each}
            {:else}
                <p class="text-center text-white">Aucun avis disponible</p>
            {/if}
        </div>
    </div>
</div>

<style>
    .film-reviews {
        margin-bottom: 32px;
        color: white;
    }

    .reviews-container {
        background: linear-gradient(135deg, #2a2a2a 0%, #1e1e1e 100%);
        border-radius: 12px;
        padding: 24px;
        border: 1px solid #333;
    }

    .reviews-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
    }

    .review-card {
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        border-radius: 12px;
        padding: 20px;
        border: 1px solid #333;
        transition: transform 0.3s ease, border-color 0.3s ease;
    }

    .review-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
        gap: 12px;
    }

    .author-info {
        flex: 1;
    }

    .author-name {
        font-size: 1.1rem;
        font-weight: bold;
        margin: 0 0 8px 0;
        color: white;
    }

    .rating {
        display: flex;
        gap: 2px;
        align-items: center;
    }

    .review-date {
        font-size: 0.85rem;
        color: #999;
        white-space: nowrap;
    }

    .review-content {
        line-height: 1.6;
    }

    .review-content p {
        margin: 0;
        color: #ddd;
        font-size: 0.95rem;
    }

    .line-clamp-5 {
        display: -webkit-box;
        -webkit-line-clamp: 5;
        line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .expand-button {
        background: none;
        border: none;
        color: #F51010;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 600;
        margin-top: 12px;
        padding: 0;
        text-decoration: underline;
        transition: color 0.3s ease;
    }

    .expand-button:hover {
        color: #d40d0d;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .reviews-container {
            padding: 20px;
        }

        .reviews-grid {
            grid-template-columns: 1fr;
            gap: 16px;
        }

        .review-card {
            padding: 16px;
        }

        .review-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
        }

        .author-name {
            font-size: 1rem;
        }

        .review-content p {
            font-size: 0.9rem;
        }
    }

    @media (max-width: 480px) {
        .reviews-container {
            padding: 16px;
        }

        .reviews-grid {
            grid-template-columns: 1fr;
        }

        .review-card {
            padding: 12px;
        }
    }
</style> 