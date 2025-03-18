import React, { useState } from "react";
import axios from "axios";

const SHEET_ID = "1A26TaGx4YE-rSai1404tQReMiXl9yadf3qfhk84TxqQ"; // Replace with your Google Sheet ID
const API_KEY = "AIzaSyAfcV3FgBh-aTMei-JwqUbkhri9jKg-wWE";   // Replace with your API Key
const RANGE = "A1:R6000"; // Adjust range as needed

const CRUD = () => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ field1: "", field2: "" });

  const fetchRecords = async () => {
    try {
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
      );
      setRecords(response.data.values.slice(1)); // Ignore header row
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}:append?valueInputOption=RAW&key=${API_KEY}`,
        {
          values: [[newRecord.field1, newRecord.field2]],
        }
      );
      fetchRecords();
    } catch (error) {
      console.error("Error adding record", error);
    }
  };

  const handleDeleteRecord = async (index) => {
    try {
      const row = records[index];
      await axios.post(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}:clear?key=${API_KEY}`,
        {
          range: `${RANGE}!A${index + 2}:B${index + 2}`, // Delete specific row range
        }
      );
      fetchRecords();
    } catch (error) {
      console.error("Error deleting record", error);
    }
  };

  return (
    <div>
      <h2>Manage Records</h2>
      <form onSubmit={handleAddRecord}>
        <input
          type="text"
          value={newRecord.field1}
          onChange={(e) => setNewRecord({ ...newRecord, field1: e.target.value })}
          placeholder="Field 1"
        />
        <input
          type="text"
          value={newRecord.field2}
          onChange={(e) => setNewRecord({ ...newRecord, field2: e.target.value })}
          placeholder="Field 2"
        />
        <button type="submit">Add Record</button>
      </form>

      <h3>Records</h3>
      <table>
        <thead>
          <tr>
            <th>Field 1</th>
            <th>Field 2</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record[0]}</td>
              <td>{record[1]}</td>
              <td>
                <button onClick={() => handleDeleteRecord(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CRUD;
