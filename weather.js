var weatherViewModel = function () {
    var self = this;

    self.CurrentweatherState = ko.observable();
    self.wether = ko.observable();
    self.Description = ko.observable();
    self.Temperature = ko.observable();
    self.Pressure = ko.observable();
    self.Humidity = ko.observable();
    self.MinTemperature = ko.observable();
    self.MaxTemperature = ko.observable();
    self.WindSpeed = ko.observable();
    self.WindDirection = ko.observable();
    self.imagePath = ko.observable();
    self.State = ko.observable();
    self.validate = function (form) {
        return $(form).validate();
    }

    //get weather data
    self.openWeatherbtn = function () {
        if (!self.State()) {
            console.log('please enter a valid state');
            //    var payload = {
            //         ValidState: self.State()
            //    }
            //    console.log('payload');
        } else if (self.State()) {
            $.ajax({
                url: `http://api.openweathermap.org/data/2.5/weather?q=${self.State()}&units=metric&appid=bb75eab11fc56640f0db4a71736d51b9`,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    getdata(data);
                    console.log(data);
                    console.log('current weather data of ', data.name);
                }
            })
        }
    }

    function getdata(data) {
        self.CurrentweatherState(data.name);
        self.wether(data.weather[0].main);
        self.Description(data.weather[0].description);
        self.Temperature(data.main.temp)
        self.Pressure(data.main.pressure)
        self.Humidity(data.main.humidity)
        self.MinTemperature(data.main.temp_min)
        self.MaxTemperature(data.main.temp_max)
        self.WindSpeed(data.wind.speed)
        self.WindDirection(data.wind.deg)
        self.imagePath("http://openweathermap.org/img/wn/" + data.weather[0].icon + '.png');
        console.log('your data value is ', data)
    }

    //    it in working condition
    self.refresh = function () {
        setTimeout(function () {

            window.location.reload(1);
        });
    }
}
var viewModel = new weatherViewModel();
ko.applyBindings(viewModel);

