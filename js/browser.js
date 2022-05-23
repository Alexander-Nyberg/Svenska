let content, morearea;
let urlparams;

let files = [
    {
        mov:   'mov/javad.mp3',
        img:   'img/javad.png',
        title: 'Javad Vännen',
        text: `
        Hej vännen, Javad heter jag och idag ska jag visa lite vad vi gör i vårt Makerspace.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi non aliquid quas nostrum, accusamus maiores numquam nam dignissimos tenetur quam excepturi voluptate voluptates, est placeat ab reprehenderit suscipit incidunt ullam.
        `,
    },
    {
        mov:   'mov/javadrapping.mp3',
        img:   'img/daniel.jpg',
        title: 'Daniel är smart',
        text: `
        vi bygger vi designar.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, enim quod dolore vero explicabo exercitationem commodi labore fuga excepturi pariatur ipsa reprehenderit ut voluptatum quisquam quibusdam corrupti voluptas, asperiores laboriosam?
        `,
    },
    {
        mov:    'https://drive.google.com/file/d/1WlAgNFZmgiPkD7f-JNPTOciD-O9819xT/view?usp=sharing',
        img:    'img/mathias.png',
        title:  'PfSense',
        text: `
        Det är bra att ha en brandvägg vännen, nu ska jag spela quake 3 arena.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem sit minima quia accusamus voluptatibus, delectus, dolorum architecto recusandae sequi porro nisi magnam consequatur quaerat placeat atque dolor deleniti dignissimos natus!
        `,
    },
];

window.onload = () => {
    content  = document.getElementById('contentarea');
    morearea = document.getElementById('morearea');
    
    urlparams = new URLSearchParams((new URL(window.location.href)).search);
    
    if (urlparams.get('i') == null || urlparams.get('i') >= files.length) {
        window.history.pushState(
            {},
            '',
            window.location.href.split('?')[0] + '?i=0'
        );
        
        urlparams.set('i', '0');
    }
    
    loadPage(urlparams.get('i'));
};

function newelem(kind, id, source, attrib)
{
    let e = document.createElement(kind);
    e.id = id;
    e.src = source;
    if (attrib) e.setAttribute(attrib, '');
    return e;
}

function loadPage(idx)
{
    if (files[idx].mov.endsWith('.mp4')) {
        content.appendChild(
            newelem('video', 'moviejavad', files[idx].mov, 'controls')
        );
    } else {
        let image = newelem('img', 'imagejavad', files[idx].img);
        let audio = newelem('audio', 'soundjavad', files[idx].mov, 'controls');
        
        image.onclick = () => {
            if (audio.paused)
                audio.play();
            else
                audio.pause();
        };
        
        content.appendChild(image);
        content.appendChild(audio);
    }
    
    let title = document.getElementById('titlebar');
    let text  = document.getElementById('description');
    
    title.innerHTML = files[idx].title;
    text.innerHTML  = files[idx].text;
    
    for (let i = 0; i < files.length; i++) {
        if (i == idx)
            continue;
        
        let div = document.createElement('div');
        div.className = 'more';
        
        div.onclick = () => {
            window.location.href = window.location.href.split('?')[0] + '?i=' + i;
        };
        
        let img = document.createElement('img');
        img.className = 'moreicon';
        img.src       = files[i].img;
        
        let p = document.createElement('p');
        p.className = 'morename';
        p.innerHTML = files[i].title;
        
        div.appendChild(img);
        div.appendChild(p);
        
        morearea.appendChild(div);
    }
}
