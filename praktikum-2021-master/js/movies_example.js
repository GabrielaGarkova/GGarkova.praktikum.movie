
const baseUrl = 'https://api.themoviedb.org/3/';
const apiKey = 'ca3d69ee336e43d8099727f0d7ce3859';
const imageBaseUrl = 'https://www.themoviedb.org/t/p/w220_and_h330_face';
const defaultPoster = 'https://www.reelviews.net/resources/img/default_poster.jpg';

let view = 'list';
let movies = [];

function getMovies(params = {}) {

    const data = {...params, api_key: apiKey}
    const route = 'discover/movie';
    $.ajax({
        method: "GET",
        url: `${baseUrl}${route}`,
        data,
    })
    .done(response => {
        movies = response.results;
        renderMovieList();
    })
    .fail(response => {
        console.log(response);
    })
    .always(() => {
        console.log('ajax completed');
    })
}

function renderMovieList(){
    $movieList = $('#movie-list');
    $movieList.empty();
    movies.forEach(movie => {
        const $template = getMovieTemplate(movie);
        $movieList.append($template);
    })
}

function getMovieTemplate(movie){
    const templateSelector = `#movie-${view}-template`;
    const $template = $($(templateSelector).html());
    $template.find('.movie-title').text(movie.title);
    const image = movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : defaultPoster;
    $template.find('.movie-poster').attr('src', image);
    
    const date = moment(movie.release_date).format('MMM Do YY');
    $template.find('.movie-release-date').text(date);
    $template.find('.movie-overview').text(movie.overview);
    $template.find('.movie-vote').text(movie.vote_average);
    return $template;
}

function getMovieParams() {
    // Get selected year
    const timeRange = getDateRangeObject()
    // Get genres from checked checkboxes
    const genres = [];
    $('.genre-checkbox:checked').each((index, el) => {
        genres.push(el.value);
    })
    
    const sortBy = $('#filter-sort').val();
    const params = {...timeRange, with_genres: genres.join(), sort_by: sortBy}
    return params;
}

$('#get-movies').click(()=> {
    getMovies(this.getMovieParams());
})

$('#grid-view').click(e => {
    view = 'grid';
    $(e.currentTarget).addClass('btn-primary').removeClass('btn-outline-primary');
    $('#list-view').addClass('btn-outline-primary').removeClass('btn-primary');
    renderMovieList();
})

$('#list-view').click(e => {
    view = 'list';
    $(e.currentTarget).addClass('btn-primary').removeClass('btn-outline-primary');
    $('#grid-view').addClass('btn-outline-primary').removeClass('btn-primary');
    renderMovieList();
})

function initDatePickers() {
    const $dateFrom = $("#date-from");
    $dateFrom.datepicker();
    const dateFrom = moment().subtract(1, 'years').toDate();
    $dateFrom.datepicker('setDate', dateFrom);

    const $dateTo = $("#date-to");
    $dateTo.datepicker();
    $dateTo.datepicker('setDate', new Date());
}

function getDateRangeObject() {
    let dateFrom = $("#date-from").val();
    let dateTo = $("#date-to").val();

    dateFrom = moment(dateFrom).format('YYYY-MM-DD');
    dateTo = moment(dateTo).format('YYYY-MM-DD');
    return {
        'release_date.gte': dateFrom,
        'release_date.lte': dateTo,
    }
}

initDatePickers();
getDateRangeObject();
getMovies(this.getMovieParams());