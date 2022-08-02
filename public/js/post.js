const form = document.querySelector('.form');

const funcPost = async (e) => {
    form.addEventListener('submit', async function(e){
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {};

        formData.forEach((val, key) => {
            data[key] = val;
        });

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        if(data.car_name === '' || data.car_price === '' || data.car_image === '' || data.size_id === ''){
            await fetch('http://localhost:8080/api/cars', options)
                .then(() => window.location.replace('/create'))
                .catch(err => console.log(err));
        }else{
            await fetch('http://localhost:8080/api/cars', options)
                .then(() => window.location.replace('/'))
                .catch(err => console.log(err))
        }

    });
}

funcPost();