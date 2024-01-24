const volume_span          = document.querySelectorAll(".volume_span"               );
const spans2               = document.querySelectorAll('.spans>span.active'         );
const spans                = document.querySelectorAll('.spans>span'                );
const ss                   = document.querySelector('.ss'                           );
const audio                = document.querySelector('.audio'                        );
const audio2               = document.querySelector('.audio2'                       );
const Sora                 = document.querySelector('#Sora'                         );
const Sora_Aya             = document.querySelector('#Sora-Aya'                     );
const Name_Sora            = document.querySelector('.name-sora'                    );
const Number_Sora_aya      = document.querySelector('#Number_Sora_aya'              );
const Number_Sora_words    = document.querySelector('#Number_Sora_words'            );
const Number_Sora_letters  = document.querySelector('#Number_Sora_letters'          );
const Sora_type            = document.querySelector('#Sora_type'                    );
const Select_sora          = document.querySelector('#Select_sora'                  );
const Tafsesr_box          = document.querySelector('#tafsesr_box'                  );
const minimize_tafsesr     = document.querySelector('.tafsesr_box_parent>i.mini-max');
const minimize_navbar      = document.querySelector('.navbar>i.mini-max'            );
const navbar               = document.querySelector('.navbar'                       );
const close_tafsesr        = document.querySelector('.tafsesr_box_parent>i.fa-xmark');
const tafsesr_box_parent   = document.querySelector('.tafsesr_box_parent'           );
const play_pause           = document.querySelector('.play_pause'                   );
const play_pause_text      = document.querySelector('.play_pause_text'              );
const mute                 = document.querySelector('.fa-solid.mute'                );
const volume               = document.querySelector('.volume'                       );
const search_input         = document.querySelector('.search_input'                 );
const search_btn           = document.querySelector('.search_btn'                   );
const search_results       = document.querySelector('.search_results'               );
const close_search_results = document.querySelector('.search_results>i.fa-xmark'    );
const search_box_content   = document.querySelector('#search_box'                   );
const input_loop           = document.querySelector('.input_loop'                   );
const btn_loop             = document.querySelector('.btn_loop'                     );
const select_input         = document.querySelector('.select_input'                 );
const select_btn           = document.querySelector('.select_btn'                   );
const qaryea_image         = document.querySelector('.qaryea_image'                 );
const Select_jozz          = document.querySelector('#Select_jozz'                  );
const Select_part          = document.querySelector('#Select_part'                  );
// const loading              = document.querySelector('.loading'                      );
const next                 = document.querySelector('.next'                         );
const prev                 = document.querySelector('.prev'                         );
let link                   = document.querySelector("link[rel~='icon']"             );
const RepeateSelected      = document.querySelector('#RepeateSelected'              );

//Fetch The Data From Api Folder
let data= '';
fetch('./Api/Quran.json').then(res=>res.json()).then(res=>data =res)
let tafseer ='';
fetch('./Api/tafseer.json').then(res=>res.json()).then(res=>tafseer =res);
let Quran_Hafs = '';
fetch('./Api/Quran-hafs.json').then(res=>res.json()).then(res=>Quran_Hafs =res);
let Quran_Warsh = '';
fetch('./Api/Quran-warsh.json').then(res=>res.json()).then(res=>Quran_Warsh =res);
let Quran_Qalon = '';
fetch('./Api/Quran-Qaloun.json').then(res=>res.json()).then(res=>Quran_Qalon =res);
//Get Audio Volume From LocalStorage

if(localStorage.getItem('volume_audio')){

  audio.volume = +localStorage.getItem('volume_audio')
  audio2.volume = +localStorage.getItem('volume_audio')
  
}else{
  audio.volume=1
  audio2.volume=1

}
 //Set Counter Of Loop Aya Count
let counter = localStorage.getItem('counter_aya_loop') || 0;


//Selected Audio Qaryea Name  
let Qaryea =localStorage.getItem('Qaryea')||'alfirdwsiy2018_gmav_201807';
let info  ='';


let AjzaaName = [{0:'الأول'}, {1:'الثاني'}, {2:'الثالث'}, {3:'الرابع'}, {4:'الخامس'},{5:'السادس'}
, {6:'السابع'}, {7:'الثامن'}, {8:'التاسع'}, {9:'العاشر'}, {10:'الحادي عشر'}, {11:'الثاني عشر'}, 
{12:'الثالث عشر'}, {13:'الرابع عشر'}, {14:'الخامس عشر'},
{15:'السادس عشر'}, {16:'السابع عشر'}, {17:'الثامن عشر'}, {18:'التاسع عشر'}, {19:'العشرون'}, 
{20:'الحادي والعشرون'}, {21:'الثاني والعشرون'}, {22:'الثالث والعشرون'},
{23:'الرابع والعشرون'}, {24:'الخامس والعشرون'}, {25:'السادس والعشرون'}, {26:'السابع والعشرون'},
 {27:'الثامن والعشرون'}, {28:'التاسع والعشرون'}, {29:'الثلاثون'}
];
AjzaaName.map(ele =>{
  let option = document.createElement('option');
  option.innerHTML =` الجزء ${Object.values(ele)[0]}`
  option.value = Object.keys(ele)[0];
  Select_jozz.appendChild(option);
  
});
let ImageSrc = localStorage.getItem('QaryeaImageFavicon') ?
`./images/Qarea_images/favicon/${localStorage.getItem('QaryeaImageFavicon')}.png`:
'./images/Qarea_images/favicon/عبدالباسط - مجود.png';
// loading.style.backgroundImage = `url(${ImageSrc})`;
qaryea_image.src = ImageSrc;

if(localStorage.getItem('RepeateFunctioMethod')){
  localStorage.getItem('RepeateFunctioMethod') === 'Repeate'?Repeat():NoRepeat()
}else{
  localStorage.setItem('RepeateFunctioMethod', 'NoRepeate');
  NoRepeat()
}

//Change Method Of Repeate Aya
RepeateSelected.onchange = (e)=>{
if(e.target.value === 'Repeate'){
  localStorage.setItem('RepeateFunctioMethod', e.target.value)
  Repeat()
  window.location.reload()
}else{
  localStorage.setItem('RepeateFunctioMethod', e.target.value)
  NoRepeat()
  window.location.reload()
}
}



//MAin Functions

//##############################################################################################
//##############################################################################################
//##################                                                 #############################
//##################     Function Used When User Don't Repeate Aya    #########################################
//##################                                                 ############################
//##############################################################################################
//##############################################################################################
//##############################################################################################

function NoRepeat() {

setTimeout(()=>{
 
 
  if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.style.sizes = '32x32';
      link.type = 'image/jpg'
      link.style.borderRadius ='50%';
    };
    link.href = ImageSrc ;
    document.head.appendChild(link);
    
  
  select_input.value = Qaryea;
  
  //Get the Parts Of Jozz 
  let parts =[];
  if((select_input.options[select_input.selectedIndex].text).includes('ورش')){
    parts=[];
    Quran_Warsh.filter(e=>e.aya_text.includes('۞') && parts.push({
      jozz:e.jozz,
      sora_num:e.sura_no,
      aya_num:e.aya_no
    }));
  }else if((select_input.options[select_input.selectedIndex].text).includes('قالون')){
    parts=[];
    Quran_Qalon.filter(e=>{
      if(e.aya_text) 
    e.aya_text.includes('۞')&& 
    parts.push({
      jozz:e.jozz,
      sora_num:e.sura_no,
      aya_num:e.aya_no
    })
  });
  }else{
    parts=[];
    Quran_Hafs.filter(e=>e.aya_text.includes('۞') && parts.push({
      jozz:e.jozz,
      sora_num:e.sura_no,
      aya_num:e.aya_no
    }));
  }
  
  //Get Sajdas Sites
  let sajdas =[];
  if((select_input.options[select_input.selectedIndex].text).includes('ورش')){
 Quran_Warsh.filter(e=>e.aya_text.includes('۩') && sajdas.push({
      jozz:e.jozz,
      sora_num:e.sura_no,
      aya_num:e.aya_no
    }));
  }else if((select_input.options[select_input.selectedIndex].text).includes('قالون')){
 Quran_Qalon.filter(e=>{
  if(e.aya_text) 
   e.aya_text.includes('۩') && sajdas.push({
     jozz:e.jozz,
     sora_num:e.sura_no,
     aya_num:e.aya_no
    })
  });
  }else{
    Quran_Hafs.filter(e=>e.aya_text.includes('۩') && sajdas.push({
      jozz:e.jozz,
      sora_num:e.sura_no,
      aya_num:e.aya_no
    }));
  }
  let jozzSite = [];
  let jozz = 0
  parts.map(e=>{
    if(Object.values(e)[0] >jozz){
      jozzSite.push({[Object.values(e)[0]]:Object.values(e)[1] ,[Object.values(e)[0]+'2']:Object.values(e)[2]});
      jozz++
    }
  });
  //Define Variable Of Number Of Sora In Database
  let num =localStorage.getItem('Sora_Number') || 0;
  //Define Varibals To Get Number Of Aya In Specific Sora
  let f =localStorage.getItem('Aya_Number') || 1
  Sora_Aya.value = f;
  Sora.value = +num + 1;
  //Varibale To Use It For GEt Number Of Aya
  let z = f-1
  //Define Variable To Get Sound Of Specific Aya
  let s = f-1
  let partOne = (+num+1)>99?(+num+1):(+num+1)>9?'0'+(+num+1):'00'+(+num+1)
  let partTwo = (+s)>99?(+s):(+s)>9?'0'+(+s):'00'+(+s)
  next.addEventListener('click',()=>{
    num++;
    localStorage.setItem('Sora_Number',num)
    localStorage.setItem('Aya_Number',1)
    window.location.reload()
  })
  prev.addEventListener('click',()=>{
    num--;
    localStorage.setItem('Sora_Number',num)
    localStorage.setItem('Aya_Number',1)
    window.location.reload()
  })

  //Get Count Of Aya In This Sora
  let countOfAya = []
  for(let i in data){
    countOfAya.push(data[i].array.length)
  }
  
  //Get Id Of Aya In This Sora
  let idOfAya = 0
  for(let i = 0; i <num; i++){
    idOfAya += countOfAya[i]
  }
    //Define Sorce Audio Of Qarea
    function QaryeaAudio(){
      if(Qaryea === 'alhosary---warsh---64kb----full--ayat--6236--aya'){
        let elhosary = 'alhosary---warsh---64kb----full--ayat--6236--aya.zip'
        partTwo = (+s+1)>99?(+s+1):(+s+1)>9?'0'+(+s+1):'00'+(+s+1)
        audio.src =`https://archive.org/download/${Qaryea}/${elhosary}/${partOne+partTwo}.mp3`;
      }else if(Qaryea === '128kb_202210'){
        let elhosary = '128kb--مصطفى اسماعيل مرتل.zip'
        partTwo = (+s+1)>99?(+s+1):(+s+1)>9?'0'+(+s+1):'00'+(+s+1)
        audio.src =`https://archive.org/download/${Qaryea}/${elhosary}/${partOne+partTwo}.mp3`;
          
      }else if(Qaryea === '32kb-alhosary-qaloon-ayat-full-6236-aya'){
        partTwo = (+s+1)>99?(+s+1):(+s+1)>9?'0'+(+s+1):'00'+(+s+1)
        elhosary  = '32kb--alhosary--qaloon___ayat__full__6236__aya.zip'
        audio.src =`https://archive.org/download/${Qaryea}/${elhosary}/${partOne+partTwo}.mp3`;
        
      }
      else if(Qaryea === '64kb-alhosary-qasr-almonfasel-radio-6236-ayah'){
        let elhosary = '64kb - alhosary--qasr--almonfasel----radio  -6236--ayah.zip'
        partTwo = (+s+1)>99?(+s+1):(+s+1)>9?'0'+(+s+1):'00'+(+s+1)
        audio.src =`https://archive.org/download/${Qaryea}/${elhosary}/${partOne+partTwo}.mp3`;
          
      }
      
      else{
        partTwo = (+s+1)>99?(+s+1):(+s+1)>9?'0'+(+s+1):'00'+(+s+1)
        audio.src =`https://archive.org/download/${Qaryea}/${partOne}.zip/${partOne+partTwo}.mp3`;
        
      };
    }
    // //Define Sorce Audio2 Of Qarea
    function QaryeaAudio2(){
      if(Qaryea === 'alhosary---warsh---64kb----full--ayat--6236--aya'){
        let elhosary = 'alhosary---warsh---64kb----full--ayat--6236--aya.zip'
        partTwo = (+s+1)>99?(+s+1):(+s+1)>9?'0'+(+s+1):'00'+(+s+1)
        audio2.src =`https://archive.org/download/${Qaryea}/${elhosary}/${partOne+partTwo}.mp3`;
      }else if(Qaryea === '128kb_202210'){
        let elhosary = '128kb--مصطفى اسماعيل مرتل.zip'
        partTwo = (+s+1)>99?(+s+1):(+s+1)>9?'0'+(+s+1):'00'+(+s+1)
        audio2.src =`https://archive.org/download/${Qaryea}/${elhosary}/${partOne+partTwo}.mp3`;
          
      }else if(Qaryea === '32kb-alhosary-qaloon-ayat-full-6236-aya'){
        partTwo = (+s+1)>99?(+s+1):(+s+1)>9?'0'+(+s+1):'00'+(+s+1)
        elhosary  = '32kb--alhosary--qaloon___ayat__full__6236__aya.zip'
        audio2.src =`https://archive.org/download/${Qaryea}/${elhosary}/${partOne+partTwo}.mp3`;
        
      }
      else if(Qaryea === '64kb-alhosary-qasr-almonfasel-radio-6236-ayah'){
        let elhosary = '64kb - alhosary--qasr--almonfasel----radio  -6236--ayah.zip'
        partTwo = (+s+1)>99?(+s+1):(+s+1)>9?'0'+(+s+1):'00'+(+s+1)
        audio2.src =`https://archive.org/download/${Qaryea}/${elhosary}/${partOne+partTwo}.mp3`;
          
      }
      else{
        partTwo = (+s+1)>99?(+s+1):(+s+1)>9?'0'+(+s+1):'00'+(+s+1)
        audio2.src =`https://archive.org/download/${Qaryea}/${partOne}.zip/${partOne+partTwo}.mp3`;
        
      };
    }

  // if(!localStorage.getItem('Aya_Number')){
  //   localStorage.setItem('Aya_Number',1)
  //   localStorage.setItem('Sora_Number',0)
        
  //   QaryeaAudio()
  //   audio.play()
  //   audio2.pause()
  //     }
      

  //When Select Jozz On Dropdown
  Select_jozz.onchange =(e)=>{
    // localStorage.setItem('jozzOnDropdown',+e.target.value);
    if(e.target.value == 0){
        localStorage.setItem('Aya_Number',1)
        localStorage.setItem('Sora_Number',0)
        window.location.reload()
    }else{
    jozzSite.map(el=>{
      if(Object.keys(el)[0] == +e.target.value+1){
        localStorage.setItem('Aya_Number',Object.values(el)[1])
        localStorage.setItem('Sora_Number',+Object.values(el)[0]-1)
        window.location.reload()
      }
    })
  }
  }

  if(localStorage.getItem('counter_aya_loop')){
    input_loop.value  = localStorage.getItem('counter_aya_loop')
  }

  //Set Loop To Restart From First Sora 
  if(num > 113 ){
      localStorage.setItem('Sora_Number',0)
      window.location.reload()
  }
  //If User Set Number Of Sora Or Aya Manualy And It Was Wrong Number
  if(localStorage.getItem('Sora_Number') < 0 || localStorage.getItem('Aya_Number') < 1){
    localStorage.setItem('Sora_Number',0)
    localStorage.setItem('Aya_Number',1)
    window.location.reload()
  }
   
  //Define Varibals To Get Tafseer Of Aya In Specific Sora
  let tafSora = tafseer.filter(e=>e.number == (+num+1) );
  //Set Information Of Sora In Navbar
  Name_Sora.innerText =`سورة ${data[num].name}`;
  document.title = `سورة ${data[num].name}`;
  Number_Sora_aya.innerText =` ${data[num].array.length}`;
  Number_Sora_words.innerText =` ${data[num].words}`;
  Number_Sora_letters.innerText =` ${data[num].letters}`;
  Sora_type.innerText =` ${data[num].type}`;
  Sora_Aya.setAttribute('max',data[num].array.length) ;
  
  //Set Passmalla Text Before Every Sora But Eltawba Sora
  let passmalla = document.createElement('div')
  let passmallaText = document.createElement('span');
  passmallaText.innerText ="﷽"
  passmallaText.classList.add('passmallaText')
  let sora_name = document.createElement('span')
  sora_name.classList.add('sora_name','passmalla_title')
  sora_name.innerText = `سورة ${data[num].name}`;
  let sora_mak_mad = document.createElement('span')
  sora_mak_mad.classList.add('sora_mak_mad','passmalla_title')
  sora_mak_mad.innerText = `التنزيل ${data[num].type}`;
  let sora_ayas_num = document.createElement('span');
  sora_ayas_num.classList.add('sora_ayas_num','passmalla_title')
  sora_ayas_num.innerText = `أياتها ${data[num].array.length}`;
  passmalla.classList.add('passmalla');

  passmalla.appendChild(sora_name)
  passmalla.appendChild(sora_mak_mad)
  if(+num !== 8 && +num !== 0){
    passmalla.appendChild(passmallaText)
  }
  passmalla.appendChild(sora_ayas_num)
  ss.appendChild(passmalla)
  if(+num ===0 && !matchMedia('only screen and (max-width: 660px)').matches){
    ss.style.border = '120px solid transparent'
    ss.style.borderImage = "url(./images/round-2.avif) 180 round";
    ss.style.textAlign = 'center';
    ss.style.fontSize ='80px'
  }
  //Create Passmalla Sound 
  let passmalla_audio = document.createElement('audio');
  localStorage.getItem('volume_audio')?passmalla_audio.volume = +localStorage.getItem('volume_audio'):passmalla_audio.volume=1
  passmalla_audio.src ='./audio/basmalla.mp3';
  passmalla_audio.setAttribute('controls', 'true');
  passmalla_audio.style.display = 'none';
  passmalla.appendChild(passmalla_audio)
  //When User Change Aya Number
  Sora_Aya.onchange= (el)=>{
    if(!(el.target.value > data[num].array.length || el.target.value <= 0)){
      localStorage.setItem('Aya_Number', +el.target.value )
      window.location.reload()
    }else{
      Sora_Aya.value = f;
      
    }
  };
  //When User Change Sora Number
  Sora.onchange = (e)=>{
    if(!(e.target.value >= 115 || e.target.value <= 0)){
      localStorage.setItem('Sora_Number',+e.target.value - 1)
      localStorage.setItem('Aya_Number', 1)
      window.location.reload()
    }else{
      Sora.value = +num + 1;
    }
  }
  //When User Change Sora Name From Dropdown Selector
  Select_sora.onchange = (e)=>{
      localStorage.setItem('Sora_Number',+e.target.value - 1)
      localStorage.setItem('Aya_Number', 1)
      window.location.reload()
  }
  //Set Passmalla Sound Before Every Sora But Eltawba Sora
  if(data[num].array[s]){
    if(f == 1 && +num !== 8){
      passmalla_audio.play();
      audio.classList.remove('play');
      audio.pause()
      audio2.pause()
      //Reload Next Aya Sound When Pasmalla Sound Is Ended
      passmalla_audio.addEventListener('ended',()=>{
        QaryeaAudio()
        audio.play();
          z++
          s++
        })
      }else{
        
    //Define Sorce Audio Of Qarea
    QaryeaAudio()
            z++
            s++
        }
    }
  //Starting Play Sound When Page Load
  setTimeout(()=>{
    // audio.paused && audio.play()
      
      window.scrollTo({
          top:(ss.children[s].offsetTop)-250,
          behavior:'smooth'
      });
      // isAudioPlaying()
  },1000)
//###########################################################################################
//############## When Reload Next Aya Sound When This Audio Sound Is Ended ##################
//###########################################################################################

counter = input_loop.value
audio.addEventListener('play', ()=>{
  QaryeaAudio2()

  if(ss.children[+z]){
    Sora_Aya.value = +z-1
        ss.children[z].classList.add('active')
        Tafsesr_box.innerHTML = `<div class='parent-simbole' > &#x06DD; <span class='child-simbole'>${tafSora[Sora_Aya.value].aya} </span> </div> ${tafSora[Sora_Aya.value].text}`;
        localStorage.setItem('Aya_Number',z)
        window.scrollTo({
            top:(ss.children[z].offsetTop)-250,
            behavior:'smooth'
        })
      }
      
    audio2.classList.remove('play')
    audio2.classList.add('paused')
    audio2.pause()

})
audio.addEventListener('ended',()=>{

  ss.childNodes.forEach(el=>el.classList.remove('active'))
  if(ss.children[+z+1]){
      z++
      s++
      audio2.classList.remove('paused')
      audio2.classList.add('play')
      audio2.play();
      audio.pause()
    
  }
  else{
    
   //Go To Next Sora If Aya Number Not Found
   num++
   localStorage.setItem('Sora_Number',num) 
   localStorage.setItem('Aya_Number',1)
   window.location.reload()
}
});
audio2.addEventListener('play', ()=>{
  QaryeaAudio()
  if(ss.children[+z]){
    Sora_Aya.value = +z-1
        ss.children[z].classList.add('active')
        Tafsesr_box.innerHTML = `<div class='parent-simbole' > &#x06DD; <span class='child-simbole'>${tafSora[Sora_Aya.value].aya} </span> </div> ${tafSora[Sora_Aya.value].text}`;
        localStorage.setItem('Aya_Number',z)
        window.scrollTo({
            top:(ss.children[z].offsetTop)-250,
            behavior:'smooth'
        })
      }
      
      audio.classList.remove('play')
      audio.classList.add('paused')
    audio.pause()
})
audio2.addEventListener('ended',()=>{
      ss.childNodes.forEach(el=>el.classList.remove('active'))
      if(ss.children[+z+1]){
          z++
          s++
          audio.classList.remove('paused')
          audio.classList.add('play')
          audio.play();
          audio2.pause()
          
  }else{
      //Go To Next Sora If Aya Number Not Found
      num++
      localStorage.setItem('Sora_Number',num) 
      localStorage.setItem('Aya_Number',1)
      window.location.reload()
      
    }

})
  //Set Ayat Text Information In Child

  for(let i in data[num].array){
    
    let sub = idOfAya + +i
    const TextOfAya_Hafs =(Quran_Hafs[sub].aya_text)? (Quran_Hafs[sub].aya_text).slice(0,-2):''
    const TextOfAya_Warsh =(Quran_Warsh[sub].aya_text)? (Quran_Warsh[sub].aya_text).slice(0,-2):''
    const TextOfAya_Qalon = (Quran_Qalon[sub].aya_text)? (Quran_Qalon[sub].aya_text).slice(0,-2):''
    
    //Change Text Of Moshaf To Different Rwaya When Change Qaryea 
    let TEXT_OF_AYA =(select_input.options[select_input.selectedIndex].text).includes('ورش')?TextOfAya_Warsh:
    (select_input.options[select_input.selectedIndex].text).includes('قالون') ?TextOfAya_Qalon:TextOfAya_Hafs
    //Create Element To Set Text Of Aya Inside It
      let aya = document.createElement('p');
      // aya.innerHTML = ` ${data[num].array[i].ar}  <div class='parent-simbole' > &#x06DD; <span class='child-simbole'> ${data[num].array[i].id} </span> </div>`;
      aya.innerHTML = ` ${TEXT_OF_AYA}  ${TEXT_OF_AYA && `<div class='parent-simbole' > &#x06DD; <span class='child-simbole'> ${data[num].array[i].id} </span> </div>`}`;
      aya.style.padding = '5px';
      
      // aya.setAttribute('download','true')
      let signOfJozz = document.createElement('p');
      signOfJozz.classList.add('sign_of_jozz');
      let signOfSajda = document.createElement('p');
      signOfJozz.classList.add('sign_of_jozz');
      signOfSajda.classList.add('sign_of_sajda');

       //Change Number Formats To Arabic Format
      let map = [
        "&\#1632;","&\#1633;","&\#1634;","&\#1635;","&\#1636;",
        "&\#1637;","&\#1638;","&\#1639;","&\#1640;","&\#1641;"
        ]
    aya.innerHTML = aya.innerHTML.replace(/\d(?=[^<>]*(<|$))/g,number=> map[number]);
        let word = ['اللَّهُ','وَاللَّهُ','ٱللَّهُ','ٱللَّهَ','اللَّهَ','اللَّهِ','ٱللَّهِ','للَّهِ','وَلِلَّهِ','فَلِلَّهِ','ٱللَّهِۚ','ٱللَّهِ','اَ۬للَّهَ','ٱللَّهِۗ',
      'رَّبِّكَ','رَّبِّكَۗ','رَبِّ','رَّبِّهِمۡۖ','رَبَّكُمُ','رَّبِّهِۦ','رَبِّهِمۡ','رَّبِّهِمۡ','رَّبِّهِمۡ','رَبُّنَا','رَّبِّكُمۡ','وَرَبُّكُمۡ','رَبِّكُمۡۚ','رَبَّكَ','رَّبِّكُمۡۚ','رَبِّهِ','رَبُّهُ','رَبُّهُ','رَبَّنَا','إِنَّكَ',' لَهُ ','لَّهُ','هُوَ','وَهُوَ']
        word.map(word=>aya.innerHTML.match(word)&& (aya.innerHTML = aya.innerHTML.replace(word,`<span style="color:red">${word}</span>`)));
      
      //  ۩
   
      sajdas.map(e=>{
        if(data[num].array[i]){
        if(e.aya_num === data[num].array[i].id && e.sora_num === +num+1){
          signOfSajda.innerHTML = `سَجْدَة`
          aya.prepend(signOfSajda);
        }
      }
      })
  
      let info = [];
      let count = 0
      let hezp = 1
      if((select_input.options[select_input.selectedIndex].text).includes('ورش')||
      (select_input.options[select_input.selectedIndex].text).includes('قالون')
      ){
        parts.map((e,i)=>{
        
          if(count === 0){
            info.push({
              index: i,
              robaName:'ثمن الحزب',
              hezp: hezp
            })
            
          }else if(count ===1){
            info.push({
              index: i,
              robaName:' ربع الحزب',
              hezp: hezp
            })
          
          }else if(count ===2){
            info.push({
              index: i,
              robaName:'ثمن الحزب',
              hezp: hezp
            })
            
          }else if(count ===3){
            info.push({
              index: i,
              robaName:'نصف الحزب',
              hezp: hezp
            })
          }
          else if(count ===4){
            info.push({
              index: i,
              robaName:'ثمن الحزب',
              hezp: hezp
            })
          }
          else if(count ===5){
            info.push({
              index: i,
              robaName:'ثلاثة أرباع الحزب',
              hezp: hezp
            })
          }
          else if(count ===6){
            
            info.push({
              index: i,
              robaName:' ثمن الحزب',
              hezp: hezp
            })
          }
          else{
            hezp++
            info.push({
              index: i,
              robaName:'الحزب',
              hezp: hezp
            })
          }
          count++
          if(count > 7) {
            count = 0
          }
        
        })
      }else{

        parts.map((e,i)=>{
        
          if(count === 0){
            info.push({
              index: i,
              robaName:'ربع الحزب',
              hezp: hezp
            })
            
          }else if(count ===1){
            info.push({
              index: i,
              robaName:' نصف الحزب',
              hezp: hezp
            })
          
          }else if(count ===2){
            info.push({
              index: i,
              robaName:'ثلاثة أرباع الحزب',
              hezp: hezp
            })
            
          }else {
            hezp++
            info.push({
              index: i,
              robaName:'الحزب',
              hezp: hezp
            })
          }
          count++
          if(count > 3) {
            count = 0
          }
        
        })
      }
      parts.map((e,index)=>{
        let signName='';
        let hezpNumber='';
        let jozzName = '';
        info.map(ele =>{
          ele.index === index ? (signName = ele.robaName,hezpNumber = ele.hezp) :'';
        })
        AjzaaName.map(ele =>{
          Object.keys(ele)[0] == e.jozz-1 ? jozzName = Object.values(ele)[0] :'';
          
        })
        if(data[num].array[i]){
          if((select_input.options[select_input.selectedIndex].text).includes('ورش')){
              if(e.aya_num == data[num].array[i].id-1 && e.sora_num === +num+1){
                signOfJozz.innerHTML = `الجزء <span style='color:red'> ${jozzName}</span> <span style='color:blue'> ${signName} </span><span style="color:#1dc26a">${hezpNumber}</span>`
                aya.prepend(signOfJozz)
              }
            }
         else if((select_input.options[select_input.selectedIndex].text).includes('قالون')){
              if(e.aya_num == data[num].array[i].id && e.sora_num === +num+1){
                signOfJozz.innerHTML = `الجزء <span style='color:red'> ${jozzName}</span> <span style='color:blue'> ${signName} </span><span style="color:#1dc26a">${hezpNumber}</span>`
                aya.prepend(signOfJozz)
              }
            }
            else{
              if(e.aya_num === data[num].array[i].id && e.sora_num === +num+1){
                signOfJozz.innerHTML = `الجزء <span style='color:red'> ${jozzName}</span> <span style='color:blue'> ${signName} </span><span style="color:#1dc26a">${hezpNumber}</span>`
                aya.prepend(signOfJozz)
              }
          }
        }
      }
        )
        //Set Tafseer For This Aya 
        Tafsesr_box.innerHTML = `<div class='parent-simbole' > &#x06DD; <span class='child-simbole'>${tafSora[f-1].aya} </span> </div> ${tafSora[f-1].text}`;
//###########################################################################################
//##################### When Prees On Aya Playing Sound Of It################################
//###########################################################################################
        aya.addEventListener('click',()=>{
        
        counter = input_loop.value
        z =+i+1
        s = i;
          Sora_Aya.value = +z
          ss.childNodes.forEach(el=>el.classList.remove('active'))
            localStorage.setItem('Aya_Number',z)
      //Define Sorce Audio Of Qarea
      ss.children[z].classList.add('active')
      Tafsesr_box.innerHTML = `<div class='parent-simbole' > &#x06DD; <span class='child-simbole'>${tafSora[Sora_Aya.value].aya} </span> </div> ${tafSora[Sora_Aya.value].text}`;
      window.scrollTo({
        top:(ss.children[+z].offsetTop)-250,
        behavior:'smooth'
      })
      QaryeaAudio()
      audio.play()
      audio.classList.add('play')
        s++
      })
      
    
      ss.appendChild(aya)
  }
  
  ss.children[f].classList.add('active')
  
    for(let i in data){
      let option = document.createElement('option'); 
      data[i] && (option.innerText = data[i].name);
      data[i] && (option.value = data[i].id);
      Select_sora.appendChild(option)
      Select_sora.value = +num + 1;
    }

    //Search  Section By Word
    let result =[]
    
    search_btn.onclick = ()=>{
      if(search_input.value === '' || search_input.value.length <3 || search_input.value.length > 150 ){
        search_input.value = '';
        return false;
      }
      else{
        result=[];
        search_box_content.innerHTML='';
    for(let i in Quran_Hafs){
      Quran_Hafs[i].aya_text_emlaey.includes(search_input.value)&&
        result.push({
        aya: Quran_Hafs[i].aya_text_emlaey,
        num:Quran_Hafs[i].sura_no,
        f:Quran_Hafs[i].aya_no,
        Sora: Quran_Hafs[i].sura_name_ar
        })
      }
    }
  if(result.length){
    search_results.style.display ='block';
    result.map((res,index)=>{
      //Create Elements 
      let aya = document.createElement('p');
      aya.innerHTML = `<span style="color:#29b6f6">[<span style="color:red">${+index+1}</span>] </span> ${res.aya.split(search_input.value).join(`<span style="color:rgb(254, 6, 159);font-weight:bolder">${search_input.value}</span>`)} <div class='parent-simbole' > &#x06DD; <span class='child-simbole'> ${res.f} </span> </div> <span class="sora-name">" ${res.Sora} "</span>`;
      aya.style.padding = '2px';
      aya.style.display='block';
      
      search_box_content.appendChild(aya);
      aya.addEventListener('mouseenter',()=>{
        aya.style.color = '#29b6f6'
        aya.addEventListener('click',()=>{
          localStorage.setItem('Sora_Number',+res.num-1)
          localStorage.setItem('Aya_Number',res.f)
          window.location.reload();
        })
      })
      aya.addEventListener('mouseleave',()=>{
        aya.style.color = '#000'
      })
    })
    let span = document.createElement('span')
    span.innerHTML = `يوجد <span style="color:red">${result.length} </span>${result.length === 1 || result.length >= 10 ? 'نتيجة':'نتائج'}`;
    span.style.position = 'absolute';
    span.style.top = '10px'
    span.style.left = '10px'
    search_box_content.prepend(span);
  }
  search_input.value = '' ;
  }
 
  btn_loop.style.backgroundColor = 'gray';
  btn_loop.style.color = 'blue'

input_loop.setAttribute('disabled', 'disabled')
btn_loop.setAttribute('disabled', 'disabled')
 

},3000)

setInterval(() => {
  isAudioPlaying()
}, 1000);

  //Play And Pause Audio
  play_pause.click()
  play_pause.onclick = ()=>{
    play_pause.style.backgroundColor ='#2196f3'
    PlayAndPauseAudio()
  }
window.addEventListener('mousemove',(element)=>{
  
  //Document Event Keypress
  document.onkeydown =(e)=>{
        if(e.keyCode === 32 && search_input.value == '' &&element.target.classList.contains('search_input')===false){
          e.preventDefault();
          PlayAndPauseAudio()
          }
        
      } 
})


  //Set Active Spans
  for(let j = 0 ; j < (audio.volume*10) ; j++){
    volume_span[j].classList.add('active')
  }
  
  //Volume change 
  volume_span.forEach((e,i)=>{
    e.addEventListener('mouseenter',()=>{
        
      volume_span.forEach((e,i)=>{
        e.classList.remove('active')
      })
      e.classList.toggle('active')
      if(!audio.paused){
        audio.volume=`${(i+1)/10}`
        audio2.volume=`${(i+1)/10}`
        localStorage.setItem('volume_audio',`${(i+1)/10}`)
      }if(!audio2.paused){
        audio2.volume=`${(i+1)/10}`
        audio.volume=`${(i+1)/10}`
        localStorage.setItem('volume_audio',`${(i+1)/10}`)
        
      }

      for(let j = 0 ; j <= i ; j++){
        if(e.classList.contains('active')){
          volume_span[j].classList.add('active')
        }else{
          volume_span[j].classList.remove('active')
        }
      }
    })

  })
  // Mute Button Events
  mute.onclick = ()=>{
    if(mute.classList.contains('fa-volume-high')){
      mute.classList.remove('fa-volume-high');
      mute.classList.add('fa-volume-xmark');
      audio.muted = true;
      volume_span.forEach(e=>{
        e.classList.remove('active')
      })
    }else{
      mute.classList.remove('fa-volume-xmark');
      mute.classList.add('fa-volume-high');
      audio.muted = false;
      for(let j = 0 ; j < (audio.volume*10) ; j++){
        volume_span[j].classList.add('active')
    }
    }

  }

  //Close Search Box
  close_search_results.onclick = ()=>{
    search_results.style.display = 'none';
    
  }

  //Tafseer Section
  minimize_tafsesr.addEventListener('click',()=>{
    if(minimize_tafsesr.classList.contains('fa-arrow-down')){

      tafsesr_box_parent.style.height = '10%';
      minimize_tafsesr.classList.remove('fa-arrow-down');
      minimize_tafsesr.classList.add('fa-arrow-up');
    }else{

      tafsesr_box_parent.style.height = '25%';
      minimize_tafsesr.classList.remove('fa-arrow-up');
      minimize_tafsesr.classList.add('fa-arrow-down');
    }
  })
  
  //Close the window of Tafsesr
  
  close_tafsesr.addEventListener('click', ()=>{
    tafsesr_box_parent.style.display = 'none';
  })

  //Navbar minimize button

  minimize_navbar.addEventListener('click',()=>{
    if(minimize_navbar.classList.contains('fa-arrow-up')){
      navbar.classList.toggle('active');
      minimize_navbar.classList.remove('fa-arrow-up');
      minimize_navbar.classList.add('fa-arrow-down');
    }else{
      navbar.classList.toggle('active');
      minimize_navbar.classList.remove('fa-arrow-down');
      minimize_navbar.classList.add('fa-arrow-up');
    }
  })

//Function To Check if Audio is playing
function isAudioPlaying(){
  if(audio.paused && audio2.paused){
    play_pause.style.backgroundColor ='#2196f3'
    // audio.classList.toggle('play')
    play_pause_text.innerText = 'تشغيل'
    spans.forEach(e=>{
      e.classList.remove('active');
    })
    mute.classList.remove('fa-volume-high');
    mute.classList.add('fa-volume-xmark');
    volume_span.forEach(e=>{
      e.classList.remove('active')
    })
    
    }
    else{ 
      play_pause.style.backgroundColor ='#1dc26a'
      play_pause_text.innerText= 'توقف';
      spans.forEach(e=>{
        e.classList.add('active');
      })
      mute.classList.remove('fa-volume-xmark');
      mute.classList.add('fa-volume-high');
      audio.muted = false;
      for(let j = 0 ; j < (audio.volume*10) ; j++){
          volume_span[j].classList.add('active')
      }
    }
    
}

  //Function to Select the Qarea Audio
  select_input.addEventListener('change', (e)=>{
    select_btn.addEventListener('click',()=>{
      Qaryea = e.target.value;
      localStorage.setItem('Qaryea', Qaryea);
      localStorage.setItem('QaryeaImageFavicon', select_input.options[select_input.selectedIndex].text);
      window.location.reload();
    })
  })


//Function to Play And Paused the Qarea Audio
//For First Audio
function PlayAndPauseAudio() {
  if(!audio.paused || !audio2.paused ){
    play_pause.style.backgroundColor ='#2196f3'
    audio.pause()
    audio2.pause()
    play_pause_text.innerText = 'تشغيل'
    spans.forEach(e=>{
      e.classList.remove('active');

    })
    mute.classList.remove('fa-volume-high');
    mute.classList.add('fa-volume-xmark');
    volume_span.forEach(e=>{
      e.classList.remove('active')
    })
    
    }
    else{ 
      if(audio.classList.contains('play')){
      audio.muted = false;
      for(let j = 0 ; j < (audio.volume*10) ; j++){
        volume_span[j].classList.add('active')
      }
      // audio.classList.toggle('paused')
      audio.play()
    }
   else if(audio2.classList.contains('play')){
      audio2.muted = false;
      for(let j = 0 ; j < (audio2.volume*10) ; j++){
        volume_span[j].classList.add('active')
      }
      // audio2.classList.toggle('paused')
      audio2.play()
    }
  }
}

}

//##############################################################################################
//##############################################################################################
//##################                                                 #############################
//##################     Function Used When User Repeate Aya         #########################################
//##################                                                 ############################
//##############################################################################################
//##############################################################################################
//##############################################################################################


function Repeat() {
  btn_loop.removeAttribute('disabled')
  input_loop.removeAttribute('disabled')
  let repeateCounte = localStorage.getItem('counter_aya_loop') ?localStorage.getItem('counter_aya_loop'):1
  btn_loop.innerText = `${repeateCounte} مرات تكرار `
//MAin Functions
setTimeout(()=>{
  if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.style.sizes = '32x32';
      link.type = 'image/jpg'
      link.style.borderRadius ='50%';
    };
    link.href = ImageSrc ;
    document.head.appendChild(link);
    
  
  select_input.value = Qaryea;
  // Select_jozz.value = localStorage.getItem('jozzOnDropdown');
  
   //Get the Parts Of Jozz 
   let parts =[];
   if((select_input.options[select_input.selectedIndex].text).includes('ورش')){
     parts=[];
     Quran_Warsh.filter(e=>e.aya_text.includes('۞') && parts.push({
       jozz:e.jozz,
       sora_num:e.sura_no,
       aya_num:e.aya_no
     }));
   }else if((select_input.options[select_input.selectedIndex].text).includes('قالون')){
     parts=[];
     Quran_Qalon.filter(e=>{
       if(e.aya_text) 
     e.aya_text.includes('۞')&& 
     parts.push({
       jozz:e.jozz,
       sora_num:e.sura_no,
       aya_num:e.aya_no
     })
   });
   }else{
     parts=[];
     Quran_Hafs.filter(e=>e.aya_text.includes('۞') && parts.push({
       jozz:e.jozz,
       sora_num:e.sura_no,
       aya_num:e.aya_no
     }));
   }
   
   //Get Sajdas Sites
   let sajdas =[];
   if((select_input.options[select_input.selectedIndex].text).includes('ورش')){
  Quran_Warsh.filter(e=>e.aya_text.includes('۩') && sajdas.push({
       jozz:e.jozz,
       sora_num:e.sura_no,
       aya_num:e.aya_no
     }));
   }else if((select_input.options[select_input.selectedIndex].text).includes('قالون')){
  Quran_Qalon.filter(e=>{
   if(e.aya_text) 
    e.aya_text.includes('۩') && sajdas.push({
      jozz:e.jozz,
      sora_num:e.sura_no,
      aya_num:e.aya_no
     })
   });
   }else{
     Quran_Hafs.filter(e=>e.aya_text.includes('۩') && sajdas.push({
       jozz:e.jozz,
       sora_num:e.sura_no,
       aya_num:e.aya_no
     }));
   }
  let jozzSite = [];
  let jozz = 0
  parts.map(e=>{
    if(Object.values(e)[0] >jozz){
      jozzSite.push({[Object.values(e)[0]]:Object.values(e)[1] ,[Object.values(e)[0]+'2']:Object.values(e)[2]});
      jozz++
    }
  });
  //Define Variable Of Number Of Sora In Database
  let num =localStorage.getItem('Sora_Number') || 0;
  //Define Varibals To Get Number Of Aya In Specific Sora
  let f =localStorage.getItem('Aya_Number') || 1
  Sora_Aya.value = f;
  Sora.value = +num + 1;
  //Varibale To Use It For GEt Number Of Aya
  let z = f
  //Define Variable To Get Sound Of Specific Aya
  let s = f-1
  let partOne = (+num+1)>99?(+num+1):(+num+1)>9?'0'+(+num+1):'00'+(+num+1)
  let partTwo = (+s)>99?(+s):(+s)>9?'0'+(+s):'00'+(+s)
   //Get Count Of Aya In This Sora
   let countOfAya = []
   for(let i in data){
     countOfAya.push(data[i].array.length)
   }
   //Get Id Of Aya In This Sora
   let idOfAya = 0
   for(let i = 0; i <num; i++){
     idOfAya += countOfAya[i]
   }
  //Define Sorce Audio Of Qarea
  function QaryeaAudio(){
      if(Qaryea === 'alhosary---warsh---64kb----full--ayat--6236--aya'){
        let elhosary = 'alhosary---warsh---64kb----full--ayat--6236--aya.zip'
        partTwo = (+s+1)>99?(+s+1):(+s+1)>9?'0'+(+s+1):'00'+(+s+1)
        audio.src =`https://archive.org/download/${Qaryea}/${elhosary}/${partOne+partTwo}.mp3`;
      }else if(Qaryea === '128kb_202210'){
        let elhosary = '128kb--مصطفى اسماعيل مرتل.zip'
        partTwo = (+s+1)>99?(+s+1):(+s+1)>9?'0'+(+s+1):'00'+(+s+1)
        audio.src =`https://archive.org/download/${Qaryea}/${elhosary}/${partOne+partTwo}.mp3`;
          
      }else if(Qaryea === '32kb-alhosary-qaloon-ayat-full-6236-aya'){
        partTwo = (+s+1)>99?(+s+1):(+s+1)>9?'0'+(+s+1):'00'+(+s+1)
        elhosary  = '32kb--alhosary--qaloon___ayat__full__6236__aya.zip'
        audio.src =`https://archive.org/download/${Qaryea}/${elhosary}/${partOne+partTwo}.mp3`;
        
      }
      else if(Qaryea === '64kb-alhosary-qasr-almonfasel-radio-6236-ayah'){
        let elhosary = '64kb - alhosary--qasr--almonfasel----radio  -6236--ayah.zip'
        partTwo = (+s+1)>99?(+s+1):(+s+1)>9?'0'+(+s+1):'00'+(+s+1)
        audio.src =`https://archive.org/download/${Qaryea}/${elhosary}/${partOne+partTwo}.mp3`;
          
      }
      else{
        partTwo = (+s+1)>99?(+s+1):(+s+1)>9?'0'+(+s+1):'00'+(+s+1)
        audio.src =`https://archive.org/download/${Qaryea}/${partOne}.zip/${partOne+partTwo}.mp3`;
        
      };
    }
  if(!localStorage.getItem('Aya_Number')){
    localStorage.setItem('Aya_Number',1)
    localStorage.setItem('Sora_Number',0)
    QaryeaAudio()
      }
      

  //When Select Jozz On Dropdown
  Select_jozz.onchange =(e)=>{
    // localStorage.setItem('jozzOnDropdown',+e.target.value);
    if(e.target.value == 0){
        localStorage.setItem('Aya_Number',1)
        localStorage.setItem('Sora_Number',0)
        window.location.reload()
    }else{
    jozzSite.map(el=>{
      if(Object.keys(el)[0] == +e.target.value+1){
        localStorage.setItem('Aya_Number',Object.values(el)[1])
        localStorage.setItem('Sora_Number',+Object.values(el)[0]-1)
        window.location.reload()
      }
    })
  }
  }

  if(localStorage.getItem('counter_aya_loop')){
    input_loop.value  = localStorage.getItem('counter_aya_loop')
  }

  //Set Loop To Restart From First Sora 
  if(num > 113 ){
      localStorage.setItem('Sora_Number',0)
      window.location.reload()
  }
  //If User Set Number Of Sora Or Aya Manualy And It Was Wrong Number
  if(localStorage.getItem('Sora_Number') < 0 || localStorage.getItem('Aya_Number') < 1){
    localStorage.setItem('Sora_Number',0)
    localStorage.setItem('Aya_Number',1)
    window.location.reload()
  }
   
  //Define Varibals To Get Tafseer Of Aya In Specific Sora
  let tafSora = tafseer.filter(e=>e.number == (+num+1) );
  //Set Information Of Sora In Navbar
  Name_Sora.innerText =`سورة ${data[num].name}`;
  document.title = `سورة ${data[num].name}`;
  Number_Sora_aya.innerText =` ${data[num].array.length}`;
  Number_Sora_words.innerText =` ${data[num].words}`;
  Number_Sora_letters.innerText =` ${data[num].letters}`;
  Sora_type.innerText =` ${data[num].type}`;
  Sora_Aya.setAttribute('max',data[num].array.length) ;
  
  //Set Passmalla Text Before Every Sora But Eltawba Sora
  let passmalla = document.createElement('div')
  let passmallaText = document.createElement('span');
  passmallaText.innerText ="﷽"
  passmallaText.classList.add('passmallaText')
  let sora_name = document.createElement('span')
  sora_name.classList.add('sora_name','passmalla_title')
  sora_name.innerText = `سورة ${data[num].name}`;
  let sora_mak_mad = document.createElement('span')
  sora_mak_mad.classList.add('sora_mak_mad','passmalla_title')
  sora_mak_mad.innerText = `التنزيل ${data[num].type}`;
  let sora_ayas_num = document.createElement('span');
  sora_ayas_num.classList.add('sora_ayas_num','passmalla_title')
  sora_ayas_num.innerText = `أياتها ${data[num].array.length}`;
  passmalla.classList.add('passmalla');

  passmalla.appendChild(sora_name)
  passmalla.appendChild(sora_mak_mad)
  if(+num !== 8 && +num !== 0){
    passmalla.appendChild(passmallaText)
  }
  passmalla.appendChild(sora_ayas_num)
  ss.appendChild(passmalla)
  if(+num ===0 && !matchMedia('only screen and (max-width: 660px)').matches){
    ss.style.border = '120px solid transparent'
    ss.style.borderImage = "url(./images/round-2.avif) 180 round";
    ss.style.textAlign = 'center';
    ss.style.fontSize ='80px'
  }
  //Create Passmalla Sound 
  let passmalla_audio = document.createElement('audio');
  localStorage.getItem('volume_audio')?passmalla_audio.volume = +localStorage.getItem('volume_audio'):passmalla_audio.volume=1
  passmalla_audio.src ='./audio/basmalla.mp3';
  passmalla_audio.setAttribute('controls', 'true');
  passmalla_audio.style.display = 'none';
  passmalla.appendChild(passmalla_audio)
  //When User Change Aya Number
  Sora_Aya.onchange= (el)=>{
    if(!(el.target.value > data[num].array.length || el.target.value <= 0)){
      localStorage.setItem('Aya_Number', +el.target.value )
      window.location.reload()
    }else{
      Sora_Aya.value = f;
      
    }
  };
  //When User Change Sora Number
  Sora.onchange = (e)=>{
    if(!(e.target.value >= 115 || e.target.value <= 0)){
      localStorage.setItem('Sora_Number',+e.target.value - 1)
      localStorage.setItem('Aya_Number', 1)
      window.location.reload()
    }else{
      Sora.value = +num + 1;
    }
  }
  //When User Change Sora Name From Dropdown Selector
  Select_sora.onchange = (e)=>{
      localStorage.setItem('Sora_Number',+e.target.value - 1)
      localStorage.setItem('Aya_Number', 1)
      window.location.reload()
  }
  //Set Passmalla Sound Before Every Sora But Eltawba Sora
  if(data[num].array[s]){
    if(f == 1 && +num !== 8){
      passmalla_audio.play();
      audio.classList.remove('play');
      audio.pause()
      //Reload Next Aya Sound When Pasmalla Sound Is Ended
      passmalla_audio.addEventListener('ended',()=>{
        
    //Define Sorce Audio Of Qarea
    QaryeaAudio()
        audio.play();
        counter--;
        if(counter <= 0){
        z++
        s++
        
        }else{
          return
        }
        })
      }else{
        if(counter > 0){
          counter--;
          audio.classList.add('play')
    //Define Sorce Audio Of Qarea
        QaryeaAudio()
          audio.play();
          }else{
            audio.classList.add('play')
    //Define Sorce Audio Of Qarea
        QaryeaAudio()
            audio.play();
            z++
            s++
            
          }
        }
    }
  //Starting Play Sound When Page Load
  setTimeout(()=>{
    // audio.paused && audio.play()
      
      window.scrollTo({
          top:(ss.children[s].offsetTop)-250,
          behavior:'smooth'
      });
      // isAudioPlaying()
  },1000)
  //Reload Next Aya Sound When This Audio Sound Is Ended
  audio.addEventListener('ended',()=>{
    ss.childNodes.forEach(el=>el.classList.remove('active'))
    //Define Sorce Audio Of Qarea
    QaryeaAudio()
    if(ss.children[+z]){
      Sora_Aya.value = +z
          ss.children[z].classList.add('active')
          Tafsesr_box.innerHTML = `<div class='parent-simbole' > &#x06DD; <span class='child-simbole'>${tafSora[Sora_Aya.value-1].aya} </span> </div> ${tafSora[Sora_Aya.value-1].text}`;
          localStorage.setItem('Aya_Number',z)
          window.scrollTo({
              top:(ss.children[z].offsetTop)-250,
              behavior:'smooth'
          })
          
          if(counter > 0){
            counter--;
          }
          else{
            counter = input_loop.value
          }
        }else{
          //Go To Next Sora If Aya Number Not Found
          num++
          localStorage.setItem('Sora_Number',num) 
          localStorage.setItem('Aya_Number',1)
          window.location.reload()
        }
        
        if(counter <= 0){
        z++
        s++
        counter = input_loop.value
      }else{
        return;
      }
  
});
  
  //Set Ayat Text Information In Child
  for(let i in (data[num].array)){
    let sub = idOfAya + +i
    const TextOfAya_Hafs =(Quran_Hafs[sub].aya_text)? (Quran_Hafs[sub].aya_text).slice(0,-2):''
    const TextOfAya_Warsh =(Quran_Warsh[sub].aya_text)? (Quran_Warsh[sub].aya_text).slice(0,-2):''
    const TextOfAya_Qalon = (Quran_Qalon[sub].aya_text)? (Quran_Qalon[sub].aya_text).slice(0,-2):''
    
    //Change Text Of Moshaf To Different Rwaya When Change Qaryea 
    let TEXT_OF_AYA =(select_input.options[select_input.selectedIndex].text).includes('ورش')?TextOfAya_Warsh:
    (select_input.options[select_input.selectedIndex].text).includes('قالون') ?TextOfAya_Qalon:TextOfAya_Hafs
    //Create Element To Set Text Of Aya Inside It
      let aya = document.createElement('p');
      // aya.innerHTML = ` ${data[num].array[i].ar}  <div class='parent-simbole' > &#x06DD; <span class='child-simbole'> ${data[num].array[i].id} </span> </div>`;
      aya.innerHTML = ` ${TEXT_OF_AYA}  ${TEXT_OF_AYA && `<div class='parent-simbole' > &#x06DD; <span class='child-simbole'> ${data[num].array[i].id} </span> </div>`}`;
      aya.style.padding = '5px';
      
      let signOfJozz = document.createElement('p');
      signOfJozz.classList.add('sign_of_jozz');
      let signOfSajda = document.createElement('p');
      signOfJozz.classList.add('sign_of_jozz');
      signOfSajda.classList.add('sign_of_sajda');

       //Change Number Formats To Arabic Format
      let map = [
        "&\#1632;","&\#1633;","&\#1634;","&\#1635;","&\#1636;",
        "&\#1637;","&\#1638;","&\#1639;","&\#1640;","&\#1641;"
        ]
    aya.innerHTML = aya.innerHTML.replace(/\d(?=[^<>]*(<|$))/g,number=> map[number]);
        let word = ['اللَّهُ','وَاللَّهُ','ٱللَّهُ','ٱللَّهَ','اللَّهَ','اللَّهِ','ٱللَّهِ','للَّهِ','وَلِلَّهِ','فَلِلَّهِ','ٱللَّهِۚ','ٱللَّهِ','اَ۬للَّهَ']
       word.map(word=>aya.innerHTML.match(word)&& (aya.innerHTML = aya.innerHTML.replace(word,`<span style="color:red">${word}</span>`)));
      
            //  ۩
            sajdas.map(e=>{
              if(data[num].array[i]){
              if(e.aya_num === data[num].array[i].id && e.sora_num === +num+1){
                signOfSajda.innerHTML = `سَجْدَة`
                aya.prepend(signOfSajda);
              }
            }
            })
        
            let info = [];
            let count = 0
            let hezp = 1
            if((select_input.options[select_input.selectedIndex].text).includes('ورش')||
            (select_input.options[select_input.selectedIndex].text).includes('قالون')
            ){
              parts.map((e,i)=>{
              
                if(count === 0){
                  info.push({
                    index: i,
                    robaName:'ثمن الحزب',
                    hezp: hezp
                  })
                  
                }else if(count ===1){
                  info.push({
                    index: i,
                    robaName:' ربع الحزب',
                    hezp: hezp
                  })
                
                }else if(count ===2){
                  info.push({
                    index: i,
                    robaName:'ثمن الحزب',
                    hezp: hezp
                  })
                  
                }else if(count ===3){
                  info.push({
                    index: i,
                    robaName:'نصف الحزب',
                    hezp: hezp
                  })
                }
                else if(count ===4){
                  info.push({
                    index: i,
                    robaName:'ثمن الحزب',
                    hezp: hezp
                  })
                }
                else if(count ===5){
                  info.push({
                    index: i,
                    robaName:'ثلاثة أرباع الحزب',
                    hezp: hezp
                  })
                }
                else if(count ===6){
                  
                  info.push({
                    index: i,
                    robaName:' ثمن الحزب',
                    hezp: hezp
                  })
                }
                else{
                  hezp++
                  info.push({
                    index: i,
                    robaName:'الحزب',
                    hezp: hezp
                  })
                }
                count++
                if(count > 7) {
                  count = 0
                }
              
              })
            }else{
      
              parts.map((e,i)=>{
              
                if(count === 0){
                  info.push({
                    index: i,
                    robaName:'ربع الحزب',
                    hezp: hezp
                  })
                  
                }else if(count ===1){
                  info.push({
                    index: i,
                    robaName:' نصف الحزب',
                    hezp: hezp
                  })
                
                }else if(count ===2){
                  info.push({
                    index: i,
                    robaName:'ثلاثة أرباع الحزب',
                    hezp: hezp
                  })
                  
                }else {
                  hezp++
                  info.push({
                    index: i,
                    robaName:'الحزب',
                    hezp: hezp
                  })
                }
                count++
                if(count > 3) {
                  count = 0
                }
              
              })
            }
            parts.map((e,index)=>{
              let signName='';
              let hezpNumber='';
              let jozzName = '';
              info.map(ele =>{
                ele.index === index ? (signName = ele.robaName,hezpNumber = ele.hezp) :'';
              })
              AjzaaName.map(ele =>{
                Object.keys(ele)[0] == e.jozz-1 ? jozzName = Object.values(ele)[0] :'';
                
              })
              if(data[num].array[i]){
                if((select_input.options[select_input.selectedIndex].text).includes('ورش')){
                    if(e.aya_num == data[num].array[i].id-1 && e.sora_num === +num+1){
                      signOfJozz.innerHTML = `الجزء <span style='color:red'> ${jozzName}</span> <span style='color:blue'> ${signName} </span><span style="color:#1dc26a">${hezpNumber}</span>`
                      aya.prepend(signOfJozz)
                    }
                  }
               else if((select_input.options[select_input.selectedIndex].text).includes('قالون')){
                    if(e.aya_num == data[num].array[i].id && e.sora_num === +num+1){
                      signOfJozz.innerHTML = `الجزء <span style='color:red'> ${jozzName}</span> <span style='color:blue'> ${signName} </span><span style="color:#1dc26a">${hezpNumber}</span>`
                      aya.prepend(signOfJozz)
                    }
                  }
                  else{
                    if(e.aya_num === data[num].array[i].id && e.sora_num === +num+1){
                      signOfJozz.innerHTML = `الجزء <span style='color:red'> ${jozzName}</span> <span style='color:blue'> ${signName} </span><span style="color:#1dc26a">${hezpNumber}</span>`
                      aya.prepend(signOfJozz)
                    }
                }
              }
            }
              )
      //Set Tafseer For This Aya 
      Tafsesr_box.innerHTML = `<div class='parent-simbole' > &#x06DD; <span class='child-simbole'>${tafSora[f-1].aya} </span> </div> ${tafSora[f-1].text}`;
      //When Prees On Aya Playing Sound Of It
      aya.addEventListener('click',()=>{
        counter = input_loop.value
        z =+i+1
        s = i;
          Sora_Aya.value = +z
          ss.childNodes.forEach(el=>el.classList.remove('active'))
            localStorage.setItem('Aya_Number',z)
      //Define Sorce Audio Of Qarea
      QaryeaAudio()
                  ss.children[z].classList.add('active')
              Tafsesr_box.innerHTML = `<div class='parent-simbole' > &#x06DD; <span class='child-simbole'>${tafSora[Sora_Aya.value-1].aya} </span> </div> ${tafSora[Sora_Aya.value-1].text}`;
              window.scrollTo({
                top:(ss.children[+z].offsetTop)-250,
                behavior:'smooth'
              })
              counter--
              if(counter <= 0){
                z++
                s++
                
              }else{
                return;
              }
          
      })
      
    
      ss.appendChild(aya)
  }
  
  ss.children[f].classList.add('active')
  
    for(let i in data){
      let option = document.createElement('option'); 
      data[i] && (option.innerText = data[i].name);
      data[i] && (option.value = data[i].id);
      Select_sora.appendChild(option)
      Select_sora.value = +num + 1;
    }

    //Search  Section By Word
    let result =[]
    
    search_btn.onclick = ()=>{
      if(search_input.value === '' || search_input.value.length <3 || search_input.value.length > 150 ){
        search_input.value = '';
        return false;
      }
      else{
        result=[];
        search_box_content.innerHTML='';
    for(let i in Quran_Hafs){
      Quran_Hafs[i].aya_text_emlaey.includes(search_input.value)&&
        result.push({
        aya: Quran_Hafs[i].aya_text_emlaey,
        num:Quran_Hafs[i].sura_no,
        f:Quran_Hafs[i].aya_no,
        Sora: Quran_Hafs[i].sura_name_ar
        })
      }
    }
  if(result.length){
    search_results.style.display ='block';
    result.map((res,index)=>{
      //Create Elements 
      let aya = document.createElement('p');
      aya.innerHTML = `<span style="color:#29b6f6">[<span style="color:red">${+index+1}</span>] </span> ${res.aya.split(search_input.value).join(`<span style="color:rgb(254, 6, 159);font-weight:bolder">${search_input.value}</span>`)} <div class='parent-simbole' > &#x06DD; <span class='child-simbole'> ${res.f} </span> </div> <span class="sora-name">" ${res.Sora} "</span>`;
      aya.style.padding = '2px';
      aya.style.display='block';
      
      search_box_content.appendChild(aya);
      aya.addEventListener('mouseenter',()=>{
        aya.style.color = '#29b6f6'
        aya.addEventListener('click',()=>{
          localStorage.setItem('Sora_Number',+res.num-1)
          localStorage.setItem('Aya_Number',res.f)
          window.location.reload();
        })
      })
      aya.addEventListener('mouseleave',()=>{
        aya.style.color = '#000'
      })
    })
    let span = document.createElement('span')
    span.innerHTML = `يوجد <span style="color:red">${result.length} </span>${result.length === 1 || result.length >= 10 ? 'نتيجة':'نتائج'}`;
    span.style.position = 'absolute';
    span.style.top = '10px'
    span.style.left = '10px'
    search_box_content.prepend(span);
  }
  search_input.value = '' ;
  }

  btn_loop.style.backgroundColor = '#2196f3';
    //Set Loop Event Handler 
  input_loop.onchange =(e)=>{

    btn_loop.addEventListener('click', () =>{
        if(e.target.value >= 1){
          counter = +e.target.value
            localStorage.setItem('counter_aya_loop',e.target.value)
            btn_loop.innerText = ` تكرار ${e.target.value} مرة `;
          }else{
            e.target.value = 1
            localStorage.setItem('counter_aya_loop',1)
        }
    
  })
}


},3000)

setInterval(() => {
    isAudioPlaying()
  }, 1000);
  //Play And Pause Audio
  
  play_pause.click();
  play_pause.onclick = ()=>{
    play_pause.style.backgroundColor ='#2196f3'
    PlayAndPauseAudio()

  }
window.addEventListener('mousemove',(element)=>{
  
  //Document Event Keypress
  document.onkeydown =(e)=>{
        if(e.keyCode === 32 && search_input.value == '' &&element.target.classList.contains('search_input')===false){
          e.preventDefault();
          PlayAndPauseAudio()
          }
        
      } 
})

  //Set Active Spans
  for(let j = 0 ; j < (audio.volume*10) ; j++){
    volume_span[j].classList.add('active')
  }
  
  //Volume change 
  volume_span.forEach((e,i)=>{
    e.addEventListener('mouseenter',()=>{
        
      volume_span.forEach((e,i)=>{
        e.classList.remove('active')
      })
      e.classList.toggle('active')
      audio.volume=`${(i+1)/10}`
      localStorage.setItem('volume_audio',`${(i+1)/10}`)
      for(let j = 0 ; j <= i ; j++){
        if(e.classList.contains('active')){
          volume_span[j].classList.add('active')
        }else{
          volume_span[j].classList.remove('active')
        }
      }
    })

  })
  // Mute Button Events
  mute.onclick = ()=>{
    if(mute.classList.contains('fa-volume-high')){
      mute.classList.remove('fa-volume-high');
      mute.classList.add('fa-volume-xmark');
      audio.muted = true;
      volume_span.forEach(e=>{
        e.classList.remove('active')
      })
    }else{
      mute.classList.remove('fa-volume-xmark');
      mute.classList.add('fa-volume-high');
      audio.muted = false;
      for(let j = 0 ; j < (audio.volume*10) ; j++){
        volume_span[j].classList.add('active')
    }
    }

  }

  //Close Search Box
  close_search_results.onclick = ()=>{
    search_results.style.display = 'none';
    
  }

  //Tafseer Section
  minimize_tafsesr.addEventListener('click',()=>{
    if(minimize_tafsesr.classList.contains('fa-arrow-down')){

      tafsesr_box_parent.style.height = '10%';
      minimize_tafsesr.classList.remove('fa-arrow-down');
      minimize_tafsesr.classList.add('fa-arrow-up');
    }else{

      tafsesr_box_parent.style.height = '25%';
      minimize_tafsesr.classList.remove('fa-arrow-up');
      minimize_tafsesr.classList.add('fa-arrow-down');
    }
  })
  
  //Close the window of Tafsesr
  
  close_tafsesr.addEventListener('click', ()=>{
    tafsesr_box_parent.style.display = 'none';
  })

  //Navbar minimize button

  minimize_navbar.addEventListener('click',()=>{
    if(minimize_navbar.classList.contains('fa-arrow-up')){
      navbar.classList.toggle('active');
      minimize_navbar.classList.remove('fa-arrow-up');
      minimize_navbar.classList.add('fa-arrow-down');
    }else{
      navbar.classList.toggle('active');
      minimize_navbar.classList.remove('fa-arrow-down');
      minimize_navbar.classList.add('fa-arrow-up');
    }
  })

//Function To Check if Audio is playing
function isAudioPlaying(){
  if(audio.paused){
    play_pause.style.backgroundColor ='#2196f3'
    play_pause_text.innerText = 'تشغيل'
    spans.forEach(e=>{
      e.classList.remove('active');
    })
    mute.classList.remove('fa-volume-high');
    mute.classList.add('fa-volume-xmark');
    volume_span.forEach(e=>{
      e.classList.remove('active')
    })
    
    }
    else{ 
      // audio.classList.toggle('play')
      play_pause.style.backgroundColor ='#1dc26a'
      play_pause_text.innerText= 'توقف';
      spans.forEach(e=>{
        e.classList.add('active');
      })
      mute.classList.remove('fa-volume-xmark');
      mute.classList.add('fa-volume-high');
      audio.muted = false;
      for(let j = 0 ; j < (audio.volume*10) ; j++){
          volume_span[j].classList.add('active')
      }
    }
}

  //Function to Select the Qarea Audio
  select_input.addEventListener('change', (e)=>{
    select_btn.addEventListener('click',()=>{
      Qaryea = e.target.value;
      localStorage.setItem('Qaryea', Qaryea);
      localStorage.setItem('QaryeaImageFavicon', select_input.options[select_input.selectedIndex].text);
      window.location.reload();
    })
  })

  //Function to Play the Audio

  function PlayAndPauseAudio() {
    if(!audio.paused ){
        play_pause.style.backgroundColor ='#2196f3'
        audio.classList.toggle('play')
        audio.pause()
        play_pause_text.innerText = 'تشغيل'
        spans.forEach(e=>{
          e.classList.remove('active');
  
        })
        mute.classList.remove('fa-volume-high');
        mute.classList.add('fa-volume-xmark');
        audio.muted = true;
        volume_span.forEach(e=>{
          e.classList.remove('active')
        })
        
        }
        else{ 
          audio.classList.toggle('play')
          play_pause.style.backgroundColor ='#1dc26a'
          audio.play()
          play_pause_text.innerText= 'توقف';
          spans.forEach(e=>{
            e.classList.add('active');
    
          })
          mute.classList.remove('fa-volume-xmark');
          mute.classList.add('fa-volume-high');
          audio.muted = false;
          for(let j = 0 ; j < (audio.volume*10) ; j++){
              volume_span[j].classList.add('active')
          }
        }
  }


}