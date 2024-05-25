document.addEventListener('DOMContentLoaded', function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        fetch(`https://api.geoapify.com/v1/timezone?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=YOUR_API_KEY`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('current-timezone-name').textContent = data.timezone.name;
                document.getElementById('current-lat').textContent = data.location.lat;
                document.getElementById('current-lon').textContent = data.location.lon;
                document.getElementById('current-offset-std').textContent = data.timezone.offset_STD;
                document.getElementById('current-offset-std-seconds').textContent = data.timezone.offset_STD_seconds;
                document.getElementById('current-offset-dst').textContent = data.timezone.offset_DST;
                document.getElementById('current-offset-dst-seconds').textContent = data.timezone.offset_DST_seconds;
                document.getElementById('current-country').textContent = data.location.country;
                document.getElementById('current-postcode').textContent = data.location.postcode;
                document.getElementById('current-city').textContent = data.location.city;
            })
            .catch(error => console.error('Error fetching the timezone:', error));
    });
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

    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=YOUR_API_KEY`)
        .then(response => response.json())
        .then(data => {
            if (data.features.length > 0) {
                const { lat, lon } = data.features[0].properties;
                return fetch(`https://api.geoapify.com/v1/timezone?lat=${lat}&lon=${lon}&apiKey=YOUR_API_KEY`);
            } else {
                throw new Error('No valid coordinates found for the address');
            }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('address-timezone-name').textContent = data.timezone.name;
            document.getElementById('address-lat').textContent = data.location.lat;
            document.getElementById('address-lon').textContent = data.location.lon;
            document.getElementById('address-offset-std').textContent = data.timezone.offset_STD;
            document.getElementById('address-offset-std-seconds').textContent = data.timezone.offset_STD_seconds;
            document.getElementById('address-offset-dst').textContent = data.timezone.offset_DST;
            document.getElementById('address-offset-dst-seconds').textContent = data.timezone.offset_DST_seconds;
            document.getElementById('address-country').textContent = data.location.country;
            document.getElementById('address-postcode').textContent = data.location.postcode;
            document.getElementById('address-city').textContent = data.location.city;
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