'use server';

export async function submitHostApplication(formData: FormData) {
  // Extract data
  const name = formData.get('name');
  const email = formData.get('email');
  const city = formData.get('city');
  const message = formData.get('message');

  // Basic validation
  if (!name || !email || !city) {
    return { error: 'Please fill out all required fields.' };
  }

  try {
    const response = await fetch('https://formspree.io/f/mojbrqbj', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        city,
        message,
      }),
    });

    if (!response.ok) {
      return { error: 'Failed to submit form. Please try again later.' };
    }
  } catch (err) {
    return { error: 'An unexpected error occurred.' };
  }

  return { success: true };
}
