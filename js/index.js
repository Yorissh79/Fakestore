if (window.location.pathname ==="/") {

    const page = document.querySelector(".cards")
    const basket_num = document.getElementById("bskt_num")

    function getDatas () {    
        let data = getDataApi();

        page.innerHTML = ""

        data.then(x => createCards(x))

        let number = JSON.parse(localStorage.getItem("number"))

        if (number != null) {
            basket_num.textContent = number
        } else {
            basket_num.textContent = "0"
        }

    }   

    function createCards(data) {

        for (item of data) {
            
            let bool = false
            let check_card = JSON.parse(localStorage.getItem("baskets_items")) || []

            try {

                for (ch_card of check_card) {

                    if (ch_card.id == item.id) {

                        bool = true;

                    }
                    else {
                    }

                }

            }

            catch(error) {

            }


            // create cards
            let card = document.createElement("div")
            card.classList.add("card")
            card.classList.add(`id:${item.id}`)
            // create card
            card.innerHTML = `<div class="img"><img src=${item.image} width="200px" height="209px"></div> <div class=text><p class="title" title="${item.description}">${item.title}</p> <p class="price">$${item.price}</p></div>`
            
            let button = document.createElement("button")
            if (!bool) {    
                button.classList.add("b_btn")
            } else {
                button.classList.add("b_btn")
                button.classList.add("added")
            }

            button.textContent = "Add"
            button.addEventListener("click", function () {
                if (button.className !== "b_btn added") {

                    let basketNum = JSON.parse(localStorage.getItem("baskets_items")) || []
                    let number = JSON.parse(localStorage.getItem("number")) || 0

                    let location = (button.parentElement.parentElement.className).split(" ")[1].split(":")[1]

                    for (ite of data) {
                        if (ite.id == location){
                            basketNum.push(ite)
                        }
                    }

                    number = Number(number) + 1

                    localStorage.setItem("baskets_items", JSON.stringify(basketNum))
                    localStorage.setItem("number", JSON.stringify(number))

                    button.classList.add("added")

                    getDatas()
                }
            })

            card.childNodes[2].appendChild(button)
            page.append(card)


        }

    }

    async function getDataApi () {

        try {

            const response = await fetch("https://fakestoreapi.com/products")
            
            if (!response.ok) {
                throw new Error("Olmadi")
            }

            const data = await response.json()

            return data 

        }

        catch (error) {
            console.log(error)
        }

    }



    window.onload = getDatas()
}

if (window.location.pathname === "/basket.html") {

    function call() {
        getBasket()
    }

    function getBasket() {

        const page = document.querySelector(".cards")
        const basket_num = document.getElementById("bskt_num")
        let number = JSON.parse(localStorage.getItem("number"))
        let check_card = JSON.parse(localStorage.getItem("baskets_items"))
        page.innerHTML = ""

        if (number != null && number != 0) {
            basket_num.textContent = number
            console.log(typeof number)
        } else {
            basket_num.textContent = "0"

            let h = document.createElement("h1")
            h.style.fontSize = "24px"
            h.innerText = "You don't have any item in basket"
            let link = document.createElement("a")
            link.style.fontSize = "24px"
            link.style.textDecoration = "none"
            link.style.color = "green"
            link.href = "/"
            link.textContent = "Go buy"
            page.append(h)
            page.append(link)

        }

        for (item of check_card) {
            let card = document.createElement("div")
            card.classList.add("card")
            card.classList.add(`id:${item.id}`)
            // create card
            card.innerHTML = `<div class="img"><img src=${item.image} width="200px" height="209px"></div> <div class=text><p class="title" title="${item.description}">${item.title}</p> <p class="price">$${item.price}</p></div>`
            
            let button = document.createElement("button")
            button.classList.add("b_btn")
            button.textContent = "Delete"
            button.addEventListener("click", function () {

                let rmId = card.className.split(":")[1]

                for (let i = 0; (check_card.length - 1) >= i; i++) {
                    if (check_card[i].id == rmId) {
                        let number = JSON.parse(localStorage.getItem("number"))
                        let check_card = JSON.parse(localStorage.getItem("baskets_items"))
                        number = Number(number) - 1
                        check_card.splice(i, 1)
                        localStorage.setItem("baskets_items", JSON.stringify(check_card))
                        localStorage.setItem("number", JSON.stringify(number))
                    }
                }
                
                // page.removeChild(card)

                getBasket()

            })

            card.childNodes[2].appendChild(button)
            page.append(card)
        }



    }

    window.onload = call()

}

if (location.pathname === "/categories.html") {
    const inpTitle = document.getElementById("inp_title")
    const inpDes = document.getElementById("inp_des")
    const sendBtn = document.querySelector(".send_btn")
    const reve = document.querySelector(".receive")

    sendBtn.addEventListener("click", function () {

        sendData(lastCall)
        reve.innerHTML = `` 
    })


    async function sendData (callback) {

        try {

            if (inpTitle.value != "" && inpDes.value != "") {
                await fetch("https://northwind.vercel.app/api/categories", {
                    method : "POST",
                    headers : {
                        "Content-type" : "application/json"
                    },
                    body : JSON.stringify({
                        title : `${inpTitle.value}`,
                        description : `${inpDes.value}`
                    })
            })}

        }

        catch (error) {
            console.log(error)
        }

        callback()
    }

    async function getDataN () {

        const response = await fetch("https://northwind.vercel.app/api/categories")

        const data = await response.json()

        return data


    }

    function createCardApi (items) {
        for (ite of items) {
            const card = document.createElement("div")
            card.innerHTML = `<p>ID:${ite.id}</p> <p>Title:${ite.title}</p> <p style="max-width: 300px; overflow : hidden ; text-overflow: ellipsis; height: 60px">Description:${ite.description}</p>`
            const delBtn = document.createElement("button")
            delBtn.textContent = "Delete"
            card.classList.add(`${ite.id}`)
            delBtn.addEventListener("click", function () {
                deleteApi(delBtn.parentElement.className)
                reve.removeChild(card)    
            })
            card.append(delBtn)
            reve.append(card)
        }
    }

    async function deleteApi (id) {

        await fetch(`https://northwind.vercel.app/api/categories/${id}`, {
            method : "DELETE"
        })
        
    }

    function lastCall () {

        let data = getDataN()

        data.then(x => createCardApi(x))

    }

    window.onload = lastCall()
}