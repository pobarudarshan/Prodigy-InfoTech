const scriptURL = 'https://script.google.com/macros/s/AKfycbwkGS7QfX3QtC6_GL_j5Yzw1vY2gRZC_KbRsxm_Q5TH4YbGJ99PV1lNjnQ-1sobzps/exec'
const form = document.forms['submit-to-google-sheet']


form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            setTimeout(() => {
                alert("Your msg send successfully")
            }, 10);
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
})