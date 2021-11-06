

let addedParamsCount = 0;

//UTILITY FUNCTIONS
// 1 . Function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let radioJson = document.getElementById('radioJson');
let Jsontxt = document.getElementById('requestJsonBox');
let radioParams = document.getElementById('radioParams');
let paramsBox = document.getElementById('parametersBox');

// If user clicks JSON, show JSON textarea
radioJson.addEventListener('click', () => {

    Jsontxt.style.display = 'block';
    paramsBox.style.display = 'none';
})

// If user clicks Params, show params Bpx
radioParams.addEventListener('click', () => {

    paramsBox.style.display = 'block';
    Jsontxt.style.display = 'none';
})


// Add new Parameters
let addParams = document.getElementById('addParam');
addParams.addEventListener('click', () => {
    let newParams = document.getElementById('params');
    let str = `<div class="form-row my-2">
                    <div class="d-flex">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" 
                                placeholder="Enter Parameter ${addedParamsCount + 2} Key">
                        </div>
                        <div class="col-md-4 mx-3">
                            <input type="text" class="form-control" id="parameterValue${addedParamsCount + 2}"
                                placeholder="Enter Parameter ${addedParamsCount + 2} Value">
                        </div>
                        <button class="btn btn-primary dltParam">-</button>
                    </div>
                </div>`;

    //convert element to DOM node
    let paramElement = getElementFromString(str);
    newParams.appendChild(paramElement);

    //Delete parameters
    let dltParams = document.getElementsByClassName('dltParam');
    for (item of dltParams) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }

    addedParamsCount++;
})


//If user clicks on submit Button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    console.log('Clicked');

    document.getElementById('responseJsonText').innerHTML = 'Please Wait...  Fetching Response...';

    // Fetch all the values user have entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='request']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    // if user has used Parameters instead of JSON, get all the parameters in an Object
    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById(`parameterKey${i + 1}`) != undefined) {
                let key = document.getElementById(`parameterKey${i + 1}`).value;
                let value = document.getElementById(`parameterValue${i + 1}`).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
        console.log('String is: ',data);
    }
    else{
        data = document.getElementById('requestJsonText').value;
        console.log('String is: ',data);
    }


    // if request Type is GET, invoke fetch api to create a GET request
    if(requestType == 'get'){
        console.log('get');
        fetch(url, {
            method:'GET',
        })
        .then(response => response.text())
        .then((text) => {
            document.getElementById('responseJsonText').innerHTML = text;
            Prism.highlightAll();
            console.log('yes');
        })
    }else{
        fetch(url, {
            method:'POST',
            body:data,
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.text())
        .then(text => {
            document.getElementById('responseJsonText').innerHTML = text;
            Prism.highlightAll();
            console.log('yes');
        })
    }


})

