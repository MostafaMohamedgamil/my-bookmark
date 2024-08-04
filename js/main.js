bookMakerName = document.getElementById('name');
bookMakerURL = document.getElementById('url');
var btn = document.getElementById('submit');
var btnUpdate = document.getElementById('update');
var updatedIndex;

var allBookMaker;
if (localStorage.AllBooks != null) {
    allBookMaker = JSON.parse(localStorage.AllBooks);
    displayInTable();
}
else {
    allBookMaker = [];

}

function addBookMaker() {
    console.log(btn);
    if (btn.innerHTML == 'Update') {
        btn.innerHTML = 'Submit';
    }
    else {
        var makers = {
            name: bookMakerName.value,
            url: bookMakerURL.value,
        }

        allBookMaker.push(makers);
    }
    localStorage.setItem("AllBooks", JSON.stringify(allBookMaker))
    clearAfterSubmit();
    displayInTable();
}


function clearAfterSubmit() {
    bookMakerName.value = '';
    bookMakerURL.value = '';
}


function displayInTable() {
    var cartona = '';

    for (var i = 0; i < allBookMaker.length; i++) {
        cartona += `
        <tr>
                    <td>${i + 1}</td>
                    <td>${allBookMaker[i].name}</td>
                    <td>
                    <a href="${allBookMaker[i].url}"> 
                    <button class="btn btn-success">
                            <i class="fa-solid fa-eye"></i>
                            Visit
                    </button>
                    </a>
                    </td>
                    <td>
                        <button onclick="deleteOneBook(${i})" class="btn btn-danger">
                            <i class="fa-solid fa-trash-can"></i>
                            Delete</button>
                    </td>
                    <td>
                        <button onclick="setFormToUpdate(${i})" class="btn btn-primary">
                            Update
                        </button>
                    </td>
                </tr>
        
        `
    }

    document.getElementById('tbody').innerHTML = cartona;
}


function deleteOneBook(x) {

    allBookMaker.splice(x, 1);
    localStorage.AllBooks = JSON.stringify(allBookMaker)
    displayInTable();

}


var Getsearch = document.getElementById('search');

function searchBookMaker(x) {

    var cartona = '';

    for (var i = 0; i < allBookMaker.length; i++) {
        if (allBookMaker[i].name.toLowerCase().includes(x.toLowerCase())) {
            cartona += `
        <tr>
                    <td>${i + 1}</td>
                    <td>${allBookMaker[i].name}</td>
                    <td>
                    <a  href="${allBookMaker[i].url}"  target="_blank" > 
                    <button class="btn btn-success">
                            <i class="fa-solid fa-eye"></i>
                            Visit
                    </button>
                    </a>
                    </td>
                    <td>
                        <button onclick="deleteOneBook(${i})" class="btn btn-danger">
                            <i class="fa-solid fa-trash-can"></i>
                            Delete</button>
                    </td>
                    <td>
                        <button class="btn btn-primary">
                            Update
                        </button>
                    </td>
                </tr>
        
        `
        }
    }

    document.getElementById('tbody').innerHTML = cartona;


}



function setFormToUpdate(index) {
    updatedIndex = index;
    bookMakerName.value = allBookMaker[index].name;
    bookMakerURL.value = allBookMaker[index].url;
    btn.classList.add("d-none")
    btnUpdate.classList.remove("d-none")

}

function update() {
    var makers = {
        name: bookMakerName.value,
        url: bookMakerURL.value,
    }
    allBookMaker.splice(updatedIndex, 1, makers)
    localStorage.setItem("AllBooks", JSON.stringify(allBookMaker))

    displayInTable()
    clearAfterSubmit()
    btn.classList.remove("d-none")
    btnUpdate.classList.add("d-none")
}