const apiKey ='e6c6b01c791dfe25e34332730415cfca';

const apiBaseURL = 'https://api.openweathermap.org/data/2.5/';



//https://api.openweathermap.org/data/2.5/forecast?q=Plovdiv&appid=e6c6b01c791dfe25e34332730415cfca



//https://api.openweathermap.org/data/2.5/forecast?q=Plovdiv&appid=e6c6b01c791dfe25e34332730415cfca



//https://api.openweathermap.org/data/2.5/onecall?lat=42.13&lon=24.74&exclude=hourly,current,minutly,alert&appid=e6c6b01c791dfe25e34332730415cfca



let view='list';

let forecast= [];

let city='';


$(function() {
    console.log('Document is rendered and we have an access to all the elements');

    $('#create-post').click((e) => {

        const postData = getCreatePostData();
        if(!postData){
            $('#create-post-error').show();
            return;
        }

        $('#create-post-error').hide();
        createPost(postData);
    })


    $(document).on("click", ".post-remove", (e) => { 
        const $postRemove = $(e.currentTarget);
        $postRemove.closest('.list-group-item').remove();
    });
  
    function createPost(postData) {
        clearInputFields();
        const $template = $($('#post-template').html());
        $template.find('.post-title').text(postData.title);
        $template.find('.post-city').text(postData.cityTitle);
        $template.find('.post-description').text(postData.description);
        $('#post-list').append($template);
    }

    function clearInputFields() {
        $('#post-title').val('');
        $('#post-description').val('');
        $('#no-posts-available').remove();
    }

    const getCreatePostData = () => {
        const city = $('#post-city').val();
        const cityTitle = $( "#post-city option:selected" ).text();
        const title = $('#post-title').val();
        const description = $('#post-description').val();

        if(!city || !title || !description){
            return null;
        }
        return {
            city,
            title,
            description,
            cityTitle,
        }
    }
    

    function getCityName() {

        return $('#city').val();
    }

    $('#grid-view').click(e => {

        view = 'grid';
    
        $(e.currentTarget).addClass('btn-primary').removeClass('btn-outline-primary');
    
        $('#list-view').addClass('btn-outline-primary').removeClass('btn-primary');
    
        renderForecastList();
    
    })

    $('#list-view').click(e => {

        view = 'list';
    
        $(e.currentTarget).addClass('btn-primary').removeClass('btn-outline-primary');
    
        $('#grid-view').addClass('btn-outline-primary').removeClass('btn-primary');
    
        renderForecastList();
    
    })

    $('#get-weather').click(()=>{

        getWeather(this.getWeatherParams());
    })

    function getWeather(params= {}) {

        const data={...params,appid: apiKey}
   
        const route='onecall'
   
       $.ajax({
   
           method: "GET",
   
           url: `${apiBaseURL}${route}`,
   
           data,
   
       })
   
       .done(response =>  {
   
           forecast = response.daily;
   
           renderForecastList();        
   
       })
   
       .fail(response => {
   
           console.log(response);
   
       })
   
       .always(() => {
   
           console.log('ajax completed');
   
       })
   
   }
   
   
   
       function renderForecastList(){
   
           $forecastList= $('#forecast-list');
   
           $forecastList.empty();
   
           for(var i = 0; i < 7; ++i){
   
               const $template=getForecastTemplate(forecast[i]);
   
               $forecastList.append($template);
   
           }
   
       }
   
       
   
    
   
   function getWeatherParams(){    
   
       const cityName=getCityName()
   
       //const sortBy= $('#filter-sort').val();
   
       const split = cityName.split(' '); 
   
       const lat = split[0];
   
       const lon = split[1];
   
      city = split[2];
   
       const params= {lat,lon};
   
       return params;
   
     }
   
   
});