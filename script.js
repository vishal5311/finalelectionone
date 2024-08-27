document.getElementById('votingForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const regNumber = document.getElementById('regNumber').value;
    const president = document.querySelector('input[name="president"]:checked')?.value;
    const vicePresident = document.querySelector('input[name="vicePresident"]:checked')?.value;
    const secretary = document.querySelector('input[name="secretary"]:checked')?.value;
    const jointSecretary = document.querySelector('input[name="jointSecretary"]:checked')?.value;

    // Check if all required positions are selected
    if (!president || !vicePresident || !secretary || !jointSecretary) {
        document.getElementById('message').textContent = 'Please select a candidate for all positions.';
        document.getElementById('message').style.color = 'red';
        return;
    }

    const response = await fetch('https://script.google.com/macros/s/AKfycbxER5RJXddBHoMauYOaFhUlcfHq3JeH6UR1VM0nhLfjBT0HJAl0ECHxc84-rVUkOxbGnQ/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            regNumber,
            president,
            vicePresident,
            secretary,
            jointSecretary
        })
    });

    const result = await response.json();
    document.getElementById('message').textContent = result.message;
    document.getElementById('message').style.color = result.success ? 'green' : 'red';

    // Auto-refresh after 2 seconds
    setTimeout(() => {
        window.location.reload();
    }, 2000);
});
