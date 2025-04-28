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
    data.forEach((pet) => {
        const petInfoCard = document.createElement('div')
        // console.log(pet);
        
        petInfoCard.innerHTML = `
        <div class="card border border-gray-200 p-4 md:p-4">
            <figure class="h-[160px]"><img class="h-full w-full object-cover rounded-lg" src=${pet.image} alt="Shoes" /></figure>
            <div class="py-4 pl-1">
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
            <button class="btn px-5 hover:bg-[#0e79813b] hover:border-transparent"><img class="h-5 w-5" src="assets/icons/like.png" ></button>
            <button id=${pet.petId} onclick="addToAdopt('${pet.image}', ${pet.petId})" class="btn px-5 hover:bg-[#0e79813b] hover:border-transparent">Adopt</button>
            <button class="btn px-5 hover:bg-[#0e79813b] hover:border-transparent">Detail</button>
            </div>
            </div>
        </div>
        `
        allPetsContainer.appendChild(petInfoCard)
    })
}

// Add to Adopt section
const addToAdopt = (image, petId) => {
    console.log(image);
    const adoptedPetSection = document.getElementById('adopted-pets')
    const adoptedPet = document.createElement('img')
    adoptedPet.classList = 'w-30 inline-block rounded-lg'
    adoptedPet.src = `${image}`

    adoptedPetSection.append(adoptedPet)
    // Disable btn
    const adoptBtn = document.getElementById(petId)
    adoptBtn.disabled = true
}
const loadPetsByCategory = async(category) => {
    const url = `https://openapi.programming-hero.com/api/peddy/category/${category}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.data);
    displayPets(data.data)
}

