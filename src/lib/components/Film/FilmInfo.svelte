<script>
    import { convertBudget, convertRevenue, convertLanguage, translateStatus } from "$lib/globalFunction.js";
    export let filmInfo;
    console.log(filmInfo);
</script>

<div class="film-info-container">
    <div class="info-title-container">
        <h3 class="info-title">Informations sur le film</h3>
        <div class="title-bg"></div>
    </div>
    
    <div class="info-content">
        <div class="info-item">
            <span class="info-label">Recette</span>
            <span class="info-value">{convertRevenue(filmInfo.revenue)}</span>
        </div>
        
        <div class="info-item">
            <span class="info-label">Budget</span>
            <span class="info-value">{convertBudget(filmInfo.budget)}</span>
        </div>
        
        <div class="info-item">
            <span class="info-label">Titre d'origine</span>
            <span class="info-value">{filmInfo.original_title}</span>
        </div>
        
        <div class="info-item">
            <span class="info-label">Langue d'origine</span>
            <span class="info-value">{convertLanguage(filmInfo.original_language)}</span>
        </div>
        
        <div class="info-item">
            <span class="info-label">Statut</span>
            <span class="info-value">{translateStatus(filmInfo.status)}</span>
        </div>
    </div>
</div>

<style>
    .film-info-container {
        background: linear-gradient(135deg, #2a2a2a 0%, #1e1e1e 100%);
        border-radius: 12px;
        padding: 24px;
        border: 1px solid #333;
        position: sticky;
        top: 20px;
        height: fit-content;
        color: white;
    }

    .info-title-container {
        position: relative;
        margin-bottom: 20px;
    }

    .info-title {
        position: relative;
        z-index: 2;
        color: white;
        font-size: 1.25rem;
        font-weight: bold;
        margin: 0;
        padding: 8px 16px;
        display: inline-block;
    }

    .title-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: -8px;
        bottom: 0;
        background-color: #F51010;
        border-radius: 8px;
        transform: rotate(-2deg);
        z-index: 1;
    }

    .info-content {
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        border-radius: 8px;
        padding: 16px;
    }

    .info-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid #333;
    }

    .info-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }

    .info-label {
        font-size: 0.9rem;
        color: #999;
        margin-bottom: 4px;
        font-weight: 500;
    }

    .info-value {
        font-size: 0.95rem;
        color: white;
        font-weight: 600;
    }

    /* Responsive */
    @media (max-width: 1200px) {
        .film-info-container {
            padding: 20px;
        }
    }

    @media (max-width: 968px) {
        .film-info-container {
            position: static;
        }

        .info-title {
            font-size: 1.1rem;
        }
    }

    @media (max-width: 480px) {
        .film-info-container {
            padding: 16px;
        }

        .info-content {
            padding: 12px;
        }
    }
</style> 