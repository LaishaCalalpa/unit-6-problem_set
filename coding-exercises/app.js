window.addEventListener('load', () => {
	const city = document.querySelector('.city')
	const temperature = document.querySelector('.temperature')
	const degree = document.querySelector('.degree')
	const scale = document.querySelector('.scale')
	const summary = document.querySelector('.summary')
	const icon = document.querySelector('.icon')

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			console.log('My General Position:', position);
			const long = position.coords.longitude;
			const lat = position.coords.latitude;

			const apiKey = 'c9f9e43fde3609873063e38181a90d89'
			const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKey}/${lat},${long}`

			return fetch(url)
				.then(response => response.json())
				.then(data => {
					degree.innerText = `Temperature: ${Math.floor(data.currently.temperature)}`
					summary.innerText = `Summary: ${data.currently.summary}`
					city.innerText = `Location: ${data.timezone}`
					scale.innerText = 'F'

					setIcon(icon, data.currently.icon)
					changeScale(data.currently.temperature)

				})
				.catch(error => {
					console.error(`There was an error`);
				});

		});
	}

	function setIcon(iconID, icon) {
		const skycons = new Skycons({ "color": "white" });
		skycons.add(iconID, icon);
		skycons.play();
	};

	function changeScale(temperature) {
		scale.addEventListener('click', () => {
			if (scale.innerText === 'F') {
				scale.innerText = 'C'
				temperature = ((temperature - 32) * 5 / 9).toFixed(2)
				degree.innerText = temperature
			}
			else if (scale.innerText === 'C') {
				scale.innerText = 'F'
				temperature = (Math.floor((temperature * 9 / 5) + 32))
				degree.innerText = temperature
			}
		})
	}
});
