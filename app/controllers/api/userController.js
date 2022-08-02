const { user } = require('../../models');
const responseFormatter = require('../../helpers/responseFormatter');

class carController{

  static store(req, res){
    try {
      const regex = RegExp(/([\d])/g)
      const input = req.body.input;

      const age = input.match(regex).join('');
      let name = [];
      let city = [];

      for (var i = 0; i < input.length; i++) {
        if(i < input.indexOf(age) - 1){
          name = [...name, input[i]];
        }

        if(i > input.indexOf(age) + 2){
          city = [...city, input[i]];
        }
      }

      name = name.join('').toLocaleUpperCase()
      city = city.join('').toLocaleUpperCase()

      const data = user.create({
        name,
        age,
        city,
        createdAt: new Date(),
        updatedAt: new Date()
      }) 

      res.status(201).json(responseFormatter.success(data, "Data berhasil disimpan!", res.statusCode));
    } catch (error) {
      console.log(error);
    }
  }
  
}

module.exports = carController;