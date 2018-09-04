class TravelServiceApi {
  static getUser() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          email: 'somemockemail@email.com',
          repository: 'http://github.com/username',
        });
      }, 1000);
    });
  }

  static getDeparture(user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          userID: user.email,
          flightID: 'AR1973',
          date: '10/27/2016 16:00PM',
        });
      }, 2000);
    });
  }

  static getFlight(flightID) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          flightId: flightID,
          name: 'Boeing 251',
        });
      }, 2000);
    });
  }

  static getForecast(date) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          date,
          forecast: 'rain',
        });
      }, 1000);
    });
  }
}

export default TravelServiceApi;
