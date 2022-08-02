const contentBody = document.querySelector('.content-body');
const btnSize = document.querySelectorAll('.btn-size');
const btnDelete = document.querySelectorAll('.btn-delete')
const deleteConfirm = document.querySelector('.delete-confirm');
const modalContainer = document.getElementById("modalDelete");
const modal = new bootstrap.Modal(modalContainer);

const funcDelete = () => {
  $(document).on('click', '.btn-delete', function(){
    const id =  this.getAttribute('data-car-id');

    deleteConfirm.addEventListener('click', async function(){
      await fetch(`http://localhost:8080/api/cars/${id}`, {
        method: 'DELETE'
      })
      .then(() => window.location.replace('/'))
    })
  })
}

funcDelete()

const beautiful_date = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("id-ID", options).format(new Date(date));
}

const html = (car) => {
    return `
      <div class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="card">
          <img src="${car.car_image}" class="card-img-top img-fluid p-4"/>
          <div class="card-body">
            <h5 class="card-title main-content-body-title">${car.car_name} / ${car.Size.size_name}</h5>
            <h4 class="card-title main-content-body-price">Rp ${car.car_price} / hari</h4>
            <p class="card-text main-content-body-time d-flex">
                <img src="/icons/fi_clock.png" class="me-2" /> Updated at ${beautiful_date(car.updatedAt)}
            </p>
            <div class="d-flex gap-2 justify-content-center">
                <button
                class="btn btn-delete d-flex align-items-center justify-content-center w-100"
                id="deleted"
                data-bs-toggle="modal"
                data-bs-target="#modalDelete"
                data-car-id="${car.id}"
                >
                <img src="/icons/fi_trash-2.png" class="me-2" /> Delete
                </button>
                <a href="/update/${car.id}" class="btn btn-update d-flex align-items-center justify-content-center w-100">
                <img src="/icons/fi_edit.png" class="me-2" /> Edit
                </a>
            </div>
          </div>
        </div>
      </div>
    `
}

const renderData = (cars) => {
    cars.forEach((car) => {
        contentBody.innerHTML += html(car);
    });
}

const renderInit = async () => {
    contentBody.innerHTML = ''
    await fetch('http://localhost:8080/api/cars')
      .then(data => data.json())
      .then(data => renderData(data.data))
}

renderInit();

const renderSize = function(){
    btnSize.forEach(btn => {
      btn.addEventListener('click', function(){
        btnSize.forEach(btn => {
            btn.classList.remove('active');
        })
        this.classList.add('active');

        const size = this.textContent 
        const url = size.toLowerCase() !== 'all' 
          ? `http://localhost:8080/api/cars/filter/${size.toLowerCase()}` 
          : 'http://localhost:8080/api/cars';

        contentBody.innerHTML = "";

        fetch(url)
          .then(data => data.json())
          .then(data => renderData(data.data))
      });
    });
}

renderSize()