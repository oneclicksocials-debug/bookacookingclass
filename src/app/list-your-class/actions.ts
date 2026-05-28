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

  // Simulate network delay and database insertion
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In the future, this is where we would insert into Supabase or send an email via Resend:
  // await resend.emails.send({...})
  // await supabase.from('host_leads').insert({ name, email, city, message })

  return { success: true };
}
