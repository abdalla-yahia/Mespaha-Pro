const select_jozz = document.getElementById('select_jozz');
const select_Sora = document.getElementById('select_Sora');
const page_number = document.getElementById('page_number')
const book =  document.getElementById('book')
const audio =  document.getElementById('audio')
const Mute = document.querySelector('.fa-solid')

//Get the current Page Number
let pageNum = localStorage.getItem('page_num_reader')||605;
//Get the Page Number Of Jozz
let AjzaaName = [{603:'الأول'}, {583:'الثاني'}, {563:'الثالث'}, {543:'الرابع'}, {523:'الخامس'},{503:'السادس'}
, {484:'السابع'}, {463:'الثامن'}, {443:'التاسع'}, {423:'العاشر'}, {404:'الحادي عشر'}, {383:'الثاني عشر'}, 
{363:'الثالث عشر'}, {343:'الرابع عشر'}, {323:'الخامس عشر'},
{303:'السادس عشر'}, {283:'السابع عشر'}, {263:'الثامن عشر'}, {243:'التاسع عشر'}, {223:'العشرون'}, 
{203:'الحادي والعشرون'}, {183:'الثاني والعشرون'}, {163:'الثالث والعشرون'},
{143:'الرابع والعشرون'}, {123:'الخامس والعشرون'}, {103:'السادس والعشرون'}, {83:'السابع والعشرون'},
{63:'الثامن والعشرون'}, {43:'التاسع والعشرون'}, {23:'الثلاثون'}
];
//Get Names Of Sora
let data ='';
 fetch('./Api/Soras_Name.json'     ).then(res=>res.json()).then(res=>data=res);
 setTimeout(()=>{
    for(let i in data){
        let option = document.createElement('option'); 
        data[i] && (option.innerText = data[i].sura_name_ar);
        data[i] && (option.value = data[i].page);
        select_Sora.appendChild(option)
    }
    
},3000)
//Set Name Of Jozz In Selector Of Jozz
for(let i in AjzaaName){
    select_jozz.innerHTML += `<option value=" الجزء ${Object.values(AjzaaName)[i][Object.keys(Object.values(AjzaaName)[i])[0]]}">الجزء ${Object.values(AjzaaName)[i][Object.keys(Object.values(AjzaaName)[i])[0]]}</option>`
}
//When Select Jozz From Dopdown Selector
select_jozz.onchange = (e)=>{
    let text = (select_jozz.options[e.target.selectedIndex].text)
    let Text = text.slice(text.indexOf('ء')+1,).trim();
    for(let i in AjzaaName){
        Object.values(AjzaaName)[i][Object.keys(Object.values(AjzaaName)[i])[0]] === Text && (pageNum= Object.keys(Object.values(AjzaaName)[i])[0]);
        localStorage.setItem('page_num_reader', pageNum)
    }
    pageFlip.flip( +pageNum,'top' | 'bottom')
}
//When Select Sora From Dopdown Selector
select_Sora.onchange = (e)=>{
    pageNum= e.target.value;
    pageFlip.flip( +pageNum,'top' | 'bottom')
    localStorage.setItem('page_num_reader', pageNum)
}
//When Change Input Value To Select Page Number 
page_number.onchange = (e)=>{
    pageNum =605 - +e.target.value
    pageFlip.flip( +pageNum,'top' | 'bottom')
    localStorage.setItem('page_num_reader', pageNum)
}
//Create Loop To Set Image Of Page Inside His Div
for(let i = 605; i >= 0; i--) {
    if(i === 1){
        continue
    }
    let pagenum = i>99 ?`0${i}` : i<=99&&i>9 ?`00${i}`  : `000${i}`;
    let div = document.createElement('div');
    div.classList.add('my-page');
    let img = document.createElement('img');
    img.src = `https://ia801300.us.archive.org/view_archive.php?archive=/0/items/okba_560/%D8%A7%D9%84%D9%85%D8%B5%D8%AD%D9%81%20%D8%A7%D9%84%D8%B4%D8%B1%D9%8A%D9%81_jp2.zip&file=%D8%A7%D9%84%D9%85%D8%B5%D8%AD%D9%81%20%D8%A7%D9%84%D8%B4%D8%B1%D9%8A%D9%81_jp2%2F%D8%A7%D9%84%D9%85%D8%B5%D8%AD%D9%81%20%D8%A7%D9%84%D8%B4%D8%B1%D9%8A%D9%81_${pagenum}.jp2&ext=jpg`
    div.appendChild(img);
    book.appendChild(div);
    if(i === 0){
        div.setAttribute('data-density', 'hard');
        img.src = './Images/cover.jpg'
    }
}
//Main Variable To Get instance From PageFlip Class
const pageFlip = new St.PageFlip(book,
    {
        width: 750, // base page width
        height: 650, // base page height
        size: "stretch",
        // set threshold values:
        minWidth: 315,
        maxWidth: 1000,
        minHeight: 420,
        maxHeight: 1350,

        maxShadowOpacity: 0.5, // Half shadow intensity
        showCover: true,
        mobileScrollSupport: false, // disable content scrolling on mobile devices
    

        startPage: +localStorage.getItem("Current_page") || 605,
    }
    );
//Get All Pages 
const pages =document.querySelectorAll('.my-page')
pageFlip.loadFromHTML(pages);
audio.volume=.5
//On Flip Page Set Current Page Number Into Local Storage And Play Audio
pageFlip.on('flip', (e) => {
    localStorage.setItem("Current_page", e.data);
    audio.play()
})
//Change Status Of Audio Play Or Mute
Mute.onclick = () => {
    if(Mute.classList.contains('fa-volume-high')){
        Mute.classList.remove('fa-volume-high');
        Mute.classList.add('fa-volume-mute');
        audio.volume =0;
    }else {
        Mute.classList.add('fa-volume-high');
        Mute.classList.remove('fa-volume-mute');
        audio.volume =.5;
    }
}



