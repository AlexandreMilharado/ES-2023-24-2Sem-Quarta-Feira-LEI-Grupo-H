import express from "express";
import cors from "cors";
import axios from "axios";

const app: any = express();
app.use(express.json());
app.use(cors({ origin: true }));

/**
 * EndPoint para fazer upload do Horario através do url passado no body,
 * faz download do ficheiro e envia para o cliente.
 */
app.post("/uploadHorario", async (req: any, res: any) => {
  const { url } = req.body;
  try {
    const csvData = await getFile(url);
    return res.json({ csvData });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch CSV file" });
  }
});

/**
 * Faz download do .csv e retorna-o
 * @param {string} url
 * @returns .csv File
 */
async function getFile(url: string) {
  const response: any = await axios.get(url);
  return response.data;
}

// Escuta na porta:3001
app.listen(3001);
