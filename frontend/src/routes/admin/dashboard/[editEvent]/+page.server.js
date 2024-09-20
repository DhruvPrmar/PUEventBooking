// @ts-nocheck
import { authenticateAdmin } from "$lib/hooks/auth";
import pool from "$lib/db";

export const load = async ({ locals, params }) => {
  const event_id = parseInt(params.editEvent);
  const session = await authenticateAdmin(locals);
  
  try {
    const [rows] = await pool.execute(`SELECT * FROM events WHERE id = ?`, [event_id]);
    if (rows.length === 0) {
      throw new Error(`Event with id ${event_id} not found`);
    }
    const data = rows[0];
    const { date, deadline } = data;
    
    const formattedDate = formatDate(date);
    const formattedDeadline = formatDateTime(deadline);
    
    data.date = formattedDate;
    data.deadline = formattedDeadline;
    
    return {
      event: data,
    };
  } catch (err) {
    console.error("DB ERROR: ", err);
    return {
      event: null,
      error: err.message,
    };
  }
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  const isoString = date.toISOString();
  return isoString.slice(0, 16);
}
