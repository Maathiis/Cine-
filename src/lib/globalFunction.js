// Transforme les minutes en heures et minutes
export function transformMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h${remainingMinutes.toString().padStart(2, '0')}`;
}

// Convertit le score en une note sur 10
export function convertScore(scoreStr) {
    const score = parseFloat(scoreStr);
    return Math.round(score * 10);      
}

// Convertit la date en date française
export function formatDateFR(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return `${day} / ${month} / ${year}`;
}

// Convertit la date en date texte français
export function formatDateTextFR(dateStr) {
    const [year, month, day] = dateStr.split("-");
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const days = day.replace(/^0/, "");
    return `${days} ${months[month - 1]} ${year}`;
}

// Convertit la date format iso en date française
export function formatISODateFR(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).replace(',', ' à');
  }

// Retourne la couleur en fonction du score
export function getScoreColor(score) {
    if (score >= 70) return '#D6FF4B'; 
    if (score >= 40) return '#FFB800'; 
    return '#F51010'; 
}

// Retourne le nombre d'étoiles en fonction du score
export function getStars(rating) {
    const stars = Math.round(rating / 2); 
    return Array(5).fill(0).map((_, i) => {
        if (i < Math.floor(stars)) return true;       
        if (i === Math.floor(stars) && stars % 1) return 'half';
        return false;                                  
    });
}

// Convertit le budget en euros arrondi à l'unité
export function convertBudget(budget) {
    return budget.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }).replace(',00', '');
}

// Convertit le revenu en euros arrondi à l'unité
export function convertRevenue(revenue) {
    return revenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }).replace(',00', '');
}

// Convertit le langage raccourci en langage complet
export function convertLanguage(language) {
    const languageMap = {
        'en': 'Anglais',
        'fr': 'Français',
        'es': 'Espagnol',
        'de': 'Allemand',
        'it': 'Italien',
        'pt': 'Portugais',
    }
    return languageMap[language];
}

// Traduit le statut en français
export function translateStatus(status) {
    const statusMap = {
        'Released': 'Sorti',
        'Rumored': 'Prévu',
        'Planned': 'Planifié',
        'In Production': 'En production',
    }
    return statusMap[status];
}

// N'affiche que les films pas encore sortis
export function filterUpcomingMovies(movies) {
    return movies.filter(movie => movie.release_date > new Date().toISOString().split('T')[0]);
}

// Retourne l'âge en fonction de la date de naissance
export function getAge(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}