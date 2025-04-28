// Load Categories data for Category Buttons
const loadCategories = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    const data = await res.json()

    const categoriesContainer = document.getElementById('categories-container')
    data.categories.forEach((category) => {
        const categoryBtn = document.createElement('div')
        categoryBtn.innerHTML = `
        <button class="btn px-10 py-7 lg:px-16 lg:py-8 rounded-lg text-lg lg:text-xl font-bold border-[#cfe4e6] hover:bg-[#0e79813b]"><img class="w-10 mr-2" src=${category.category_icon}> ${category.category}</button>
        `
        categoriesContainer.append(categoryBtn)
    })
}
loadCategories()
