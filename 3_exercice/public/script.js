//https://movie-quizz-johnson.herokuapp.com/
//URL
const key='91ff298b08ed4eed72c39696c0e0828d';
const baseURL = 'https://api.themoviedb.org/3/search/movie?api_key=91ff298b08ed4eed72c39696c0e0828d&query=';
const IMG_URM='https://image.tmdb.org/t/p/w500'


//variables html et autres
const searchForm = document.querySelector('form');
const section = document.querySelector('section');
const value=document.getElementById("search");
const submit=document.getElementById("submit");
const begin=document.getElementById("begin");
searchForm.style.display='none';
let List=["avengers: endgame"];






//bouton pour rentrer une personne
searchForm.addEventListener('submit',submitSearch);
begin.addEventListener('begin',beginning);
  


//bouton pour rentrer un film
const submit_movie=document.getElementById("submit_movie");
submit_movie.addEventListener("click",submitSearch2);
document.getElementById('movie').style.display = "none";




//fonctions--------------------------------------------------------------------------------------------------------------------------



//fonction pour le premier film et pour recommencer le jeu
async function beginning() {
  List=["avengers: endgame"];
  document.getElementById('repetition').innerHTML="";
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

    
     
      url=baseURL+'Avengers : Endgame';
      
    
      ;
      
    
         const data = await(await fetch(url)).json();
          console.log(data);
          displayResults(data);
          searchForm.style.display='block';
          document.getElementById('begin').innerHTML='restart';
          document.getElementById('response').innerHTML='';
          document.getElementById('movie').style.display = "none";
          document.getElementById('id_people').textContent="";
          return data.results[0].id;

        
}




//fonction pour rentrer un acteur

async function submitSearch(e) {
  
  e.preventDefault();
  


  //conditions pour savoir si on est au debut du quizz ou pas.
  let result_id = document.getElementById('id_people').textContent;
  let result=""

  if(result_id==""){
    result= await beginning();
  }
  else {
    result = result_id;
  }
  
  
  let value=document.getElementById("search");
  let flag=false;
  let id_people='';
  

  url = "https://api.themoviedb.org/3/movie/"+result+"/credits?api_key=91ff298b08ed4eed72c39696c0e0828d&language=en-US";
      
    const data = await (await fetch(url)).json();
    console.log(data)
    for(i=0;i<data.cast.length;i++)
    {
      
      if(value.value.toUpperCase()==data.cast[i]['name'].toUpperCase()){
        
        id_people=data.cast[i]['id'];
        

        getId(id_people);
        displayPeoples(data.cast[i]['profile_path'],data.cast[i]['name']);
       
        flag=true;
        searchForm.style.display='none';
        document.getElementById('movie').style.display = "block";
        document.getElementById('response').textContent="";

      }
    }

    for(i=0;i<data.crew.length;i++){
      if(value.value.toUpperCase()==data.crew[i]['name'].toUpperCase() && data.crew[i]['known_for_department']=='Directing'){
        
        id_people=data.crew[i]['id'];
        
        getId(id);
        displayPeoples(data.crew[i]['profile_path'],data.crew[i]['name']);
       
        flag=true;
        searchForm.style.display='none';
        document.getElementById('movie').style.display = "block";
        document.getElementById('response').textContent="";
      }
    }


    if(flag==false){
      const jeu = document.createElement('p');
      jeu.textContent = 'Sorry, wrong answer.You can continue or restart';
      jeu.setAttribute('class','jeu');
      document.getElementById('response').appendChild(jeu);
    

    }

    
    
}
  



//fonction pour recuperer les id afin de faire une boucle infini pour le quizz

function getId(id_get){
document.getElementById('id_people').innerHTML=id_get;
document.getElementById('id_people').style.display='none';
}

    
//fonctions d'affchages---------------------------------------------------------------------------------------------------------------
//fonction afficher les personnes
function displayPeoples(image,nom)  {
    const img = document.createElement('img');
    const New_div = document.createElement('div');
    const name = document.createElement('p');

    name.textContent = nom;
    if (image!=null){
  
      img.src = 'https://image.tmdb.org/t/p/w500' + image;

   }
   New_div.appendChild(name);
   New_div.appendChild(img);
   section.appendChild(New_div);

}

//fonction afficher les films    
function displayMovie(image,nom,date)  {
  
  const img = document.createElement('img');
  const New_div = document.createElement('div');
  const name = document.createElement('p');
  const dt=document.createElement('p');

  name.textContent = nom;
  if (image!=null){

    img.src = 'https://image.tmdb.org/t/p/w500' + image;

 }
 dt.textContent=date;
 New_div.appendChild(name);
 New_div.appendChild(dt);
 New_div.appendChild(img);
 section.appendChild(New_div);

}






//fonction afficher le premier film

function displayResults(data) {
    
  const movie = data.results;
    
  
    
  if(movie.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'No results returned.'
    section.appendChild(para);
  } 
      
  else {
    
    const clearfix = document.createElement('div');
    const info = document.createElement('info');
    const heading = document.createElement('h2');
    const title = document.createElement('p');
    const img = document.createElement('img');
    const date = document.createElement('p');
          
          
    
    let current = movie[0];
    title.textContent=current.original_title;
    date.textContent = current.release_date;
          
  
    if (current.poster_path!=null){
  
        img.src = 'https://image.tmdb.org/t/p/w500' + current.poster_path;
        img.alt = current.headline;
          
    }
           
    clearfix.setAttribute('class','clearfix');
    info.appendChild(heading);
    heading.appendChild(title);
    info.appendChild(date);
    info.appendChild(img);
    info.appendChild(clearfix);
    section.appendChild(info);
        
        
  }
      
      
}
//------------------------------------------------------------------------------------------------------------------------------------------

//fonction rentrer un film
  
async function submitSearch2(e){
  e.preventDefault();
  //console.log(List,'cqecdsecsc');
  id_people=document.getElementById('id_people').textContent;
  //console.log(id_people,'iiddddddd')
  
  let flag=false;
  const resultat=document.getElementById('search_movie')


  //partie verification si film déjà rentré---------
  document.getElementById('repetition').innerHTML='';
  let pasVu =true;


  for(i=0;i<List.length;i++){
    if (List[i]==resultat.value){
      pasVu=false;
    }
  }
  
  if (pasVu==true){
    
    console.log('on peut ajouter a la liste');
    //List.push(resultat.value);
  }
  
  else{
    document.getElementById('repetition').innerHTML='because this movie has already been entered';
    flag=false;
    
  }
 //-----------------------------------



  console.log(List);
  url ="https://api.themoviedb.org/3/person/"+id_people+"/movie_credits?api_key=91ff298b08ed4eed72c39696c0e0828d&language=en-US";
  const data = await (await fetch(url)).json();
  



  for(i=0;i<data.cast.length;i++)
    {
      
      if(resultat.value.toUpperCase()==data.cast[i]['title'].toUpperCase() && pasVu==true){
        
        id_movie=data.cast[i]['id'];
        
        getId(id_movie);
        
        displayMovie(data.cast[i]['poster_path'],data.cast[i]['title'],data.cast[i]['release_date']);

        
        List.push(resultat.value);
        flag=true;
        document.getElementById('movie').style.display = "none";
        searchForm.style.display='block';
        document.getElementById('response').textContent="";



    
      }
    }

    for(i=0;i<data.crew.length;i++){
      if(resultat.value.toUpperCase()==data.crew[i]['title'].toUpperCase() && pasVu==true){
        
        id_movie=data.crew[i]['id'];
        
        
        getId(id_movie);
        displayMovie(data.cast[i]['poster_path'],data.cast[i]['title'],data.cast[i]['release_date']);
        
        List.push(resultat.value);
        flag=true;
        document.getElementById('movie').style.display = "none";
        searchForm.style.display='block';
        document.getElementById('response').textContent="";



      }
    }


    if(flag==false){
      const jeu = document.createElement('p');
      jeu.textContent = 'Sorry, wrong answer.You can continue or restart';
      jeu.setAttribute('class','jeu');
      document.getElementById('response').appendChild(jeu); 
    }

}
