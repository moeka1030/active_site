async function handler({ name, email, message }) {
  if (!name || !email || !message) {
    return { error: "Name, email, and message are required" };
  }

  try {
    const result = await sql`
      INSERT INTO contact_messages (name, email, message)
      VALUES (${name}, ${email}, ${message})
      RETURNING id
    `;

    return { success: true, id: result[0].id };
  } catch (error) {
    return { error: "Failed to submit message" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}