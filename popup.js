console.log('This is a popup!');

function click() {
    let txt = document.getElementById("txt");
    if (txt) {
        if (txt.innerHTML === "change") {
            txt.innerHTML = "Original Text";
        } else {
            txt.innerHTML = "change";
        }
    } else {
        console.error('Element with id "txt" not found.');
    }
}

document.getElementById("changeTextButton").addEventListener("click", click);

document.getElementById('readButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => {
                const hPElement = document.querySelector('.hP');
                const goElement = document.querySelector('.go');
                const bod = document.querySelector('.a3s');
                const hPText = hPElement ? hPElement.textContent : 'Element with class "hP" not found';
                const goText = goElement ? goElement.textContent : 'Element with class "go" not found';
                const bodText = bod ? bod.textContent : 'Element with class "a3s" not found';
                return `${hPText}\n${goText}\n${bodText}`;
            }
        }, (results) => {
            document.getElementById('htmlContent').value = results[0].result;
        });
    });
});

document.getElementById('analyzeButton').addEventListener('click', function() {
    const url = document.getElementById('url').value;
    fetch('http://127.0.0.1:5000/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').innerText = data.result;
    })
    .catch(error => console.error('Error:', error));
});