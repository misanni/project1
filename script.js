
    //const addEventListner =document.queryselector('submit');
    const searchFrom= document.querySelector('.search');
    const input=document.querySelector('.input');
    const newsList=document.querySelector('.news-list');
    console.log(newsList);
  searchFrom.addEventListener('submit', retrieve)
    function retrieve(e){
        if (input.value== ''){
        alert('input field is empty!')
        return
    }
        newsList.innerHTML=''
        e.preventDefault()
    //const apikey = '241e074b3c3945cf850407a246c8b648' 
    const apikey = 'f9c6bbaa037646eeb918ce6772428bc0'        
    let topic = input.value;
    let url=`https://newsapi.org/v2/everything?q=${topic}&apiKey=${apikey}`
   
    fetch(url).then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log(data);
        data.articles.forEach(article=>{
            let li=document.createElement('li');
            let a = document.createElement('a');
            a.setAttribute('href', article.url );
            a.setAttribute('target', '_blank');
            a.textContent=article.title;
            li.appendChild(a);
            newsList.appendChild(li);
        })
    }).catch((error)=>{
        console.log(error);
    })
   
    }
