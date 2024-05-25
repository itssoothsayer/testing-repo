const YOUR_API_KEY = '26ff8bc25bb64733801ee060bc3cc70c'

function fetchCurrentTimezone(latitude, longitude) {
    const timezoneUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&type=postcode&format=json&apiKey=${YOUR_API_KEY}`;
    fetch(timezoneUrl)
        .then(response => response.json()
        )
        .then(data => {
            console.log('Response JSON:', data.results[0]);
            document.getElementById('current-timezone-name').textContent = data.results[0].timezone.name;
                            document.getElementById('current-lat').textContent = data.results[0].lat;
                            document.getElementById('current-lon').textContent = data.results[0].lon;
                            document.getElementById('current-offset-std').textContent = data.results[0].timezone.offset_STD;
                            document.getElementById('current-offset-std-seconds').textContent = data.results[0].timezone.offset_STD_seconds;
                            document.getElementById('current-offset-dst').textContent = data.results[0].timezone.offset_DST;
                            document.getElementById('current-offset-dst-seconds').textContent = data.results[0].timezone.offset_DST_seconds;
                            document.getElementById('current-country').textContent = data.results[0].country;
                            document.getElementById('current-postcode').textContent = data.results[0].postcode;
                            document.getElementById('current-city').textContent = data.results[0].city || data.results[0].county;
           
        })
        .catch(error => {
            console.error('Error fetching timezone:', error);
            
        });
}
document.addEventListener('DOMContentLoaded', function() {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            console.log('current lat and lang', latitude, longitude)
          
            fetchCurrentTimezone(latitude, longitude);
        },
        error => {
            console.error('Error getting geolocation:', error);
            
        }
    );
});

function fetchTimezoneByAddress() {
    const address = document.getElementById('address-input').value;
    const errorMessage = document.getElementById('error-message');
    const addressTimezoneBox = document.getElementById('address-timezone-box');

    if (!address) {
        errorMessage.textContent = 'Please enter an address';
        errorMessage.style.display = 'block';
        addressTimezoneBox.style.display = 'none';
        return;
    }

    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${YOUR_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.features.length > 0) {
                const { lat, lon } = data.features[0].properties;
                console.log("fetched lats and lon", lat, lon)
                return fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&type=postcode&format=json&apiKey=${YOUR_API_KEY}`);
            } else {
                throw new Error('No valid coordinates found for the address');
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("searched adress", data.results[0])
            document.getElementById('address-timezone-name').textContent = data.results[0].timezone.name;
            document.getElementById('address-lat').textContent = data.results[0].lat;
            document.getElementById('address-lon').textContent = data.results[0].lon;
            document.getElementById('address-offset-std').textContent = data.results[0].timezone.offset_STD;
            document.getElementById('address-offset-std-seconds').textContent = data.results[0].timezone.offset_STD_seconds;
            document.getElementById('address-offset-dst').textContent = data.results[0].timezone.offset_DST;
            document.getElementById('address-offset-dst-seconds').textContent = data.results[0].timezone.offset_DST_seconds;
            document.getElementById('address-country').textContent = data.results[0].country;
            document.getElementById('address-postcode').textContent = data.results[0].postcode;
            document.getElementById('address-city').textContent = data.results[0].city ||  data.results[0].county;
            errorMessage.style.display = 'none';
            addressTimezoneBox.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessage.textContent = 'Failed to retrieve timezone';
            errorMessage.style.display = 'block';
            addressTimezoneBox.style.display = 'none';
        });
}