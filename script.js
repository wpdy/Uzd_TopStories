const container = document.querySelector('.container')
const buttons = document.querySelector('.buttons')


const button_arr = {
    home: 'All',
    climate: 'Climate',
    health: 'Health',
    science: 'Science',
    us: 'Us',
    world: 'World',
}

const Stories = async (category, categoryName) => {
    try {
        console.log(categoryName)

        const boxes = document.querySelectorAll('.labas');

        boxes.forEach(box => {
          box.remove();
        });
        
        
        const topStories_API = await fetch(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=2PxvYqHyc0Q0SdDR6bQAbsbKxHGDupEG`)
        const topStories = await topStories_API.json()
        
        for (let i = 0; i < topStories.results.length; i++) {
            let story = topStories.results[i]

            const divas = document.createElement('div')
            container.appendChild(divas)

            divas.className = 'labas'

            if (story.multimedia != null) {
                const clickimg = document.createElement('a')
                const my_img = document.createElement('img')

                my_img.src = story.multimedia[0].url
                clickimg.href = story.multimedia[0].url
                divas.appendChild(clickimg)
                clickimg.appendChild(my_img)
                
            }

            

            const tekstas = document.createElement('h1')
            tekstas.innerText = story.title
            divas.appendChild(tekstas)


            const tekstas2 = document.createElement('p')
            tekstas2.innerText = story.abstract
            divas.appendChild(tekstas2)

            const tekstas3 = document.createElement('a')
            tekstas3.innerText = 'Read more...'
            tekstas3.href = story.url
            tekstas3.className = 'readmore'
            divas.appendChild(tekstas3)

            
            
            const kategorija = document.createElement('h4')
            kategorija.innerText = categoryName
            kategorija.className = 'category-name'
            kategorija.style.background = '#fc03db'
            divas.appendChild(kategorija)
            
        }


    } catch(error) {
        console.log(error)
        console.log('neveikia')
    }
}



for (const [key, value] of Object.entries(button_arr)) {
    const menu_button = document.createElement('button')
    menu_button.innerText = value
    buttons.appendChild(menu_button)

    menu_button.addEventListener('click', function(){
        Stories(key, value)
    }) 
}