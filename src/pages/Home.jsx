import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MainSlide from '../component/MainSlide';
import '../App.css';

function Home() {
   const [data,setData] = useState();

   const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params:{
        api_key:'f89a6c1f22aca3858a4ae7aef10de967',
        language:'ko-kr'
    }
  });
  function allData(t1,t2){
        return instance.get(`/${t1}/${t2}`);        
  }

   useEffect(()=>{
        Promise.all([
            allData('movie','popular'),
            allData('movie','top_rated'),
            allData('tv','popular'),
            allData('tv','top_rated'),
        ])
        .then(function (results) {
            let mPop = results[0].data.results;
            let mTop = results[1].data.results;
            let tPop = results[2].data.results;
            let tTop = results[3].data.results;

            setData({mPop,mTop,tPop,tTop});
        });
    },[])
   
    if(!data) return;

    return (
    <div>
        <div className='spot'>
            <h2>The Gorge</h2>
            <p>Two highly trained operatives grow close from a distance after being sent to guard opposite sides of a <br/> 
            mysterious gorge. When an evil below emerges, they must work together to survive what lies within.</p>
            <div>
                <button>Watch now</button>
                <button>Watch trailer</button>
            </div>
        </div>

        <MainSlide title="Trending Movies" data={data.mPop} type="movie"/>
        <MainSlide title="Top Rated Movies" data={data.mTop} type="movie"/>
        <MainSlide title="Trending TV" data={data.tPop} type="tv"/>
        <MainSlide title="Top Rated TV" data={data.tTop} type="tv"/>
    </div>
    )
}

export default Home