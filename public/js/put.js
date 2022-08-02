const form = document.querySelector('.form');

const funcPut = async function(e) {
        form.addEventListener('submit', async function(e){
            e.preventDefault();

            const id = this.getAttribute('data-id');
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
                await fetch(`http://localhost:8080/api/cars/${id}`, options)
                    .then(() => window.location.replace(`/update/${id}`))
                    .catch(err => console.log(err));
            }else{
                await fetch(`http://localhost:8080/api/cars/${id}`, options)
                    .then(() => window.location.replace('/'))
                    .catch(err => console.log(err))
            }


        })
}

funcPut();