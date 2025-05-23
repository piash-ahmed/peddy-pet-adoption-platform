// Load Categories data for Category Buttons
const loadCategories = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    const data = await res.json()

    const categoriesContainer = document.getElementById('categories-container')
    data.categories.forEach((category) => {
        const categoryBtn = document.createElement('div')
        categoryBtn.innerHTML = `
        <button onclick="loadPetsByCategory('${category.category}')" class="btn px-10 py-7 lg:px-16 lg:py-8 rounded-lg text-lg lg:text-xl font-bold border-[#cfe4e6] hover:bg-[#0e79813b]"><img class="w-10 mr-2" src=${category.category_icon}> ${category.category}</button>
        `
        categoriesContainer.append(categoryBtn)
    })
}
loadCategories()

// Load all pets and output in card
const loadAllPets = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    const data = await res.json()
    displayPets(data.pets)
}
loadAllPets()

 

// Display pets 
const displayPets = (data) => {
    const allPetsContainer = document.getElementById('pets-container')
    allPetsContainer.innerHTML = ''

    document.getElementById('sortBtn').addEventListener('click', () => {
        const sortedData = data.sort((a, b) => {
            if (a.price === undefined) return 1;
            if (b.price === undefined) return -1;
            return a.price - b.price;
        });
        displayPets(sortedData)
    })

    
    data.forEach((pet) => {
        const petInfoCard = document.createElement('div')

        petInfoCard.innerHTML = `
        <div class="card border border-gray-200 p-4 md:p-4">
            <figure class="h-[160px]"><img class="h-full w-full object-cover rounded-lg" src=${pet.image} alt="Shoes" /></figure>
            <div class="pt-4 pl-1">
            <h2 class="card-title text-lg font-extrabold mb-2">${pet.pet_name}</h2>
            
            <p class="flex items-center gap-1 text-gray-700 text-sm mb-1"><img class="w-4 h-4" src="assets/icons/breed.png" >
            Breed: ${pet.breed ? `${pet.breed}` : `Not Available`}</p>

            <p class="flex items-center gap-1 text-gray-700 text-sm mb-1"><img class="w-4 h-4" src="assets/icons/birth.png" >
            Birth: ${pet.date_of_birth ? `${pet.date_of_birth}` : `Not Available`}</p>

            <p class="flex items-center gap-1 text-gray-700 text-sm mb-1"><img class="w-4 h-4" src="assets/icons/gender.png" >
            Gender: ${pet.gender ? `${pet.gender}` : `Not Available`}</p>

            <p class="flex items-center gap-1 text-gray-700 text-sm"><img class="w-4 h-4" src="assets/icons/price.png" >
            Price: ${pet.price ? `${pet.price}$` : `Not Available`}</p>
            <div class="divider opacity-65"></div>
            <div class="flex items-center justify-center gap-2">
            <button onclick="addToAdopt('${pet.image}')" class="btn px-5 hover:bg-[#0e79813b] hover:border-transparent"><img class="h-5 w-5" src="assets/icons/like.png" ></button>
            <button onclick="adoptModal(${pet.petId})" id=${pet.petId} class="btn px-5 hover:bg-[#0e79813b] hover:border-transparent">Adopt</button>
            <button onclick="detailsModal(${pet.petId})" class="btn px-5 hover:bg-[#0e79813b] hover:border-transparent">Detail</button>
            </div>
            </div>
        </div>
        `
        allPetsContainer.appendChild(petInfoCard)
    })
}

// Add to Adopt section
const addToAdopt = (image) => {
    const adoptedPetSection = document.getElementById('adopted-pets')
    const adoptedPet = document.createElement('img')
    adoptedPet.classList = 'w-20 md:w-28 inline rounded-lg m-2'
    adoptedPet.src = `${image}`

    adoptedPetSection.append(adoptedPet)
}

// Load pets by category dynamic query
const loadPetsByCategory = async (category) => {
    const url = `https://openapi.programming-hero.com/api/peddy/category/${category}`
    const res = await fetch(url)
    const data = await res.json()

    if (data.data.length === 0) {
        const allPetsContainer = document.getElementById('pets-container')
        allPetsContainer.classList.remove('grid')
        allPetsContainer.classList.add('flex', 'flex-col', 'justify-center', 'items-center')
        allPetsContainer.innerHTML = `
            <img src="assets/images/error.webp">
            <h2 class="text-xl md:text-2xl font-bold text-black mt-4">No Information Available</h2>
            <p class="text-gray-700 w-5/6 mx-auto text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
            its layout. The point of using Lorem Ipsum is that it has a.</p>
         `
    } else {
        displayPets(data.data)
    }
}

// Show Details Modal when Detail button clicked
const detailsModal = async (petId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    const data = await res.json()
    const petDetail = data.petData

    const modalContent = document.getElementById('modal-content')
    modalContent.innerHTML = `
    <img class="w-full rounded-lg" src=${petDetail.image}/>
     <h2 class="card-title text-xl font-extrabold mb-3 mt-5">${petDetail.pet_name}</h2>
     <div class="flex gap-x-6 md:gap-x-10">
        <div>
            <p class="flex items-center gap-1 text-gray-700 text-sm mb-1"><img class="w-4 h-4" src="assets/icons/breed.png" >
            Breed: ${petDetail.breed ? `${petDetail.breed}` : `Not Available`}</p>

            <p class="flex items-center gap-1 text-gray-700 text-sm mb-1"><img class="w-4 h-4" src="assets/icons/gender.png" >
            Gender: ${petDetail.gender ? `${petDetail.gender}` : `Not Available`}</p>

            <p class="flex items-center gap-1 text-gray-700 text-sm mb-1"><img class="w-4 h-4" src="assets/icons/gender.png" >
            Vaccinated status: ${petDetail.vaccinated_status ? `${petDetail.vaccinated_status}` : `Not Available`}</p>
        </div>
        <div>
            <p class="flex items-center gap-1 text-gray-700 text-sm mb-1"><img class="w-4 h-4" src="assets/icons/price.png" >
            Price: ${petDetail.price ? `${petDetail.price}$` : `Not Available`}</p>

            <p class="flex items-center gap-1 text-gray-700 text-sm mb-1"><img class="w-4 h-4" src="assets/icons/birth.png" >
            Birth: ${petDetail.date_of_birth ? `${petDetail.date_of_birth}` : `Not Available`}</p>
        </div>
        </div>
        <div class="divider opacity-65 my-1"></div>
        <h3 class="font-extrabold mb-2 mt-4">Details Information</h3>
        <p class="text-sm text-gray-700 mb-4">${petDetail.pet_details}</p>
    `
    const customDetailsModal = document.getElementById('customDetailsModal')
    customDetailsModal.showModal()
}

// Show Adoption Modal when Adopt button clicked
const adoptModal = (petId) => {
    const customAdoptModal = document.getElementById('customAdoptModal')

    // const modalContent = document.getElementById('modal-content')
    const counter = document.getElementById('counter')

    function countDown() {
        let counterNumber = 4
        const intervalId = setInterval(() => {
            counterNumber--
            counter.innerHTML = `<p class="text-4xl font-extrabold">${counterNumber}</p>`
            if (counterNumber === 0) {
                counter.innerHTML = ``
                clearInterval(intervalId)
                document.getElementById('closeBtn').click()

                // Disable btn
                const adoptBtn = document.getElementById(petId)
                adoptBtn.innerText = 'Adopted'
                adoptBtn.disabled = true
            }
        }, 1000)
    }
    countDown()


    customAdoptModal.showModal()
}

