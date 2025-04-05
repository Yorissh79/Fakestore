if (window.location.pathname ==="/") {

    const page = document.querySelector(".cards")
    const basket_num = document.getElementById("bskt_num")

    function getDatas () {    
        let data = getDataApi();
        data.then(x => createCards(x))

        let basketNum = JSON.parse(localStorage.getItem("basket_num"))

        basket_num.textContent = basketNum

    }

    function createCards(data) {

        for (item of data) {
            // create cards
            let card = document.createElement("div")
            card.classList.add("card")
            
            // create card
            card.innerHTML = `<div class="img"><img src=${item.image} width="200px" height="209px"></div> <div class=text><p class="title" title="${item.description}">${item.title}</p> <p class="price">$${item.price}</p></div>`
            
            let button = document.createElement("button")
            button.classList.add("b_btn")
            button.textContent = "Add"
            button.addEventListener("click", function () {
                if (button.className !== "b_btn added") {

                    let basketNum = JSON.parse(localStorage.getItem("basket_num")) || 0
                    
                    basketNum = Number(basketNum) + 1

                    localStorage.setItem("basket_num", JSON.stringify(basketNum))

                    basket_num.textContent = basketNum
                    button.classList.add("added")
                }
            })

            card.childNodes[2].appendChild(button)

            page.append(card)

            const btns = document.querySelectorAll(".b_btn")

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