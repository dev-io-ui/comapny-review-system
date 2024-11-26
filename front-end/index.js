
function handleFormSubmit(e)
{
    const companyName = document.getElementById('company-name').value;
    const pros = document.getElementById('pros').value;
    const cons = document.getElementById('cons').value;
    const rating = document.querySelector('.star-rating input:checked')?.value;

    console.log("starts" + rating);
    console.log(companyName + 'pros'+ pros + " cons "+ cons);


    const companyobj ={
        companyName,
        pros,
        cons,
        rating
    };

    axios.post('http://localhost:2000/add-company',companyobj)
    .then(()=>{
        console.log("form submitted");
       // display();
    })
    .catch((err)=>{
        console.log(err);
    })

}



 function handleGetData(event){
    event.preventDefault();  // Prevent the form from refreshing the page
    
    const companyName = document.getElementById('companyName').value;
    console.log('Searching for company:', companyName);

    // Send a GET request to search for the company
    axios.get('http://localhost:2000/search', {
        params: {
            companyName: companyName,
        }
    })
    .then((response) => {
        const companyData = response.data;
        displayCompanyDetails(companyData);  // Display the company and its reviews
    })
    .catch((error) => {
        console.error("Error fetching company data:", error);
        document.getElementById('companyDetails').innerHTML = '<p>Company not found or an error occurred.</p>';
    });
};

function displayCompanyDetails(companyData) {
    const companyDetailsDiv = document.getElementById('companyDetails');

    // Clear previous results
    companyDetailsDiv.innerHTML = '';

    // Check if the company data exists
    if (!companyData || !companyData.reviews) {
        companyDetailsDiv.innerHTML = '<p>No reviews found for this company.</p>';
        return;
    }

    // Display company name and average rating
    const { company, averageRating, reviews } = companyData;

    const companyInfoHTML = `
        <h2>Company: ${company}</h2>
        <p>Average Rating: ${averageRating}</p>
        <h3>Reviews:</h3>
    `;

    companyDetailsDiv.innerHTML += companyInfoHTML;

    // Display the reviews
    if (reviews.length > 0) {
        const reviewsList = document.createElement('ul');
        
        reviews.forEach((review) => {
            const reviewItem = document.createElement('li');
            reviewItem.innerHTML = `
                <strong>Rating: ${review.rating}</strong>
                <p>Pros: ${review.pros}</p>
                <p>Cons: ${review.cons}</p>
            `;
            reviewsList.appendChild(reviewItem);
        });

        companyDetailsDiv.appendChild(reviewsList);
    } else {
        companyDetailsDiv.innerHTML += '<p>No reviews available for this company.</p>';
    }
}















    // Optional: JavaScript to handle custom star rating behavior
    // const stars = document.querySelectorAll('.star-rating input');
    // stars.forEach(star => {
    //   star.addEventListener('change', () => {
    //     console.log(`Selected rating: ${star.value}`);
    //   });
    // });