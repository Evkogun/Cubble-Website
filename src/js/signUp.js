const supabaseUrl = "https://nwnszbtxvpbxkspcooyi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53bnN6YnR4dnBieGtzcGNvb3lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzODQwNDMsImV4cCI6MjA2ODk2MDA0M30.RykiTWCvNpDUe_EiPbo3_lduV5gXxO2e5b6tTPDClIE";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById('signForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const surname = document.getElementById('surname').value.trim();
  const email = document.getElementById('email').value.trim();

  // Validate email format
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) {
    alert('Please enter a valid email address.');
    return;
  }
  // Check if fields are empty
  if (!firstName || !surname || !email) {
    alert('Please fill in all fields.');
    return;
  }

  const { data, error } = await supabase
    .from('mailing_list')
    .insert([
      {
        first_name: firstName,
        surname: surname,
        email: email,
      }
    ]);

  if (error) {
    console.error('Error inserting data:', error);
    alert('Something went wrong. Please try again.');
  } else {
    alert('Thanks for subscribing!');
    document.getElementById('signForm').reset();
  }

});




