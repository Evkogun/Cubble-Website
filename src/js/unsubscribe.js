const supabaseUrl = "https://nwnszbtxvpbxkspcooyi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53bnN6YnR4dnBieGtzcGNvb3lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzODQwNDMsImV4cCI6MjA2ODk2MDA0M30.RykiTWCvNpDUe_EiPbo3_lduV5gXxO2e5b6tTPDClIE";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById('unsubscribeForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitButton = e.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Unsubscribing...';

  const email = document.getElementById("email").value.trim();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValid) {
    alert("Please enter a valid email address.");
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    return;
  }

  try {
    const { data, error } = await supabase
      .from('mailing_list')
      .delete()
      .eq('email', email);

    if (error) {
      console.error('Error deleting data:', error);
      alert('Something went wrong. Please try again.');
    } else {
      alert('Unsubscribed successfully');
      document.getElementById('unsubscribeForm').reset();
    }
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});